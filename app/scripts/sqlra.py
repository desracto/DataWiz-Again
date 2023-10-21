from sqlparse import parse
from sqlparse.sql import Identifier

# For debug purposes
import pprint

# --------------- PRE-PROCESS ---------------
def isolate_where(stmt_tokens):
    """
        Isolates the WHERE keyword from it's values
    """
    for i in range(0, len(stmt_tokens)):
        # Skip WS characters
        if stmt_tokens[i].is_whitespace:
            continue

        # Find the where clause
        if stmt_tokens[i].value.upper()[:5] == 'WHERE':
            where_values = stmt_tokens[i].tokens

            # Replace old where token with new tokens
            stmt_tokens[i:i+1] = where_values

def pre_process(stmt_tokens):
    isolate_where(stmt_tokens)

# --------------- PROCESS FUNCTIONS ---------------
def identify_processes(stmt_dict: dict) -> dict:
    """
        This is to only understand what functions must be called in the 
        PROCESS section. 
    """
    bool_processes = {
        "SELECT": False,
        "DISTINCT": False,
        "WHERE": False,
        'JOIN': False,
        "SUB_QUERY": False
    }

    keys = stmt_dict.keys()

    # SELECT/DISTINCT block
    if 'DISTINCT' in keys:
        # Check if there are multiple values in the DISTINCT values array
        if len(stmt_dict['DISTINCT']) > 0:
            # Check if the token is grouped
            if hasattr(stmt_dict['SELECT'][0], 'tokens'):
                bool_processes['DISTINCT'] = True
    elif 'SELECT' in keys:
        # Check if there are values in the SELECT values array
        if len(stmt_dict['SELECT']) > 0:
            # Check if the token is grouped
            if hasattr(stmt_dict['SELECT'][0], 'tokens'):
                bool_processes['SELECT'] = True
    
    # WHERE block
    if 'WHERE' in keys:
        bool_processes['WHERE'] = True
    
    # JOIN block
    if any('JOIN' in sub for sub in keys):
        bool_processes['JOIN'] = True

    # SUB-QUERY block
    values = stmt_dict.values()
    # Loop through each sub_array containing a keyword and it's values
    for sub_array in values:
        for token in sub_array:
            if 'SELECT' in token.value.upper():
                bool_processes['SUB_QUERY'] = True
    
    return bool_processes

def split_keywords(stmt_tokens):
    """
        Assigns the values to each keyword
    """
    stmt_dict = {}
    current_keyword = ""
    for token in stmt_tokens:
        if token.is_whitespace:
            continue

        # for all keyword tokens
        if token.is_keyword:
            if not stmt_dict.get(token.value):
                stmt_dict[token.value] = []
                current_keyword = token.value
        # value tokens
        else:
            stmt_dict[current_keyword].append(token)
    
    return stmt_dict

def process_keyword(stmt_dict:dict, keyword=None):
    """
        Given a specified keyword, retrieves the values
        and breaks it up from one large token
        into indivudal tokens, skipping all WS and punctuation characters
    """
    if not keyword:
        raise Exception("Keyword not defined")
    
    if hasattr(stmt_dict[keyword][0], 'tokens'):
        keyword_values = stmt_dict[keyword][0].tokens
    else:
        raise Exception("PROCESS_KEYWORD", keyword)

    new_keyword_values = []
    for token in keyword_values:
        # clean ws and punctuation characters
        if token.is_whitespace or token.value == ',':
            continue
        
        new_keyword_values.append(token)
    
    stmt_dict[keyword] = new_keyword_values

def process_join(stmt_dict: dict):
    join_types = [
        'INNER JOIN',
        'LEFT JOIN',
        'LEFT OUTTER JOIN',
        'RIGHT JOIN',
        'RIGHT OUTTER JOIN',
        'FULL JOIN',
        'FULL OUTTER JOIN'
    ]

    keys = stmt_dict.keys()
    join_type = ""

    # Find if any join exists in the keys
    for key in keys:
        if key in join_types:
            join_type = key
            found = True
    
    if not found:
        raise Exception("No Join Found")

    # Join found, process into one node
    join_values = stmt_dict[join_type]
    on_values = stmt_dict['ON'][0].tokens
    on_values = [x for x in on_values if not x.is_whitespace]

    # Create new node
    join_dict = {
        'RIGHT TABLE': join_values[0],
        'ON': on_values
    }
    
    # Replace old node with new, delete redundant ON node
    stmt_dict[join_type] = join_dict
    del stmt_dict['ON']

    return join_type
    
def process_subqueries(stmt_dict: dict):
    """
        Seperates subqueries
    """
    sub_queries = {}

    # filter origianl dictionary
    # to include only keywords and values which contain subqueries
    for key, values in stmt_dict.items():
        if 'JOIN' in key:
            continue 

        for token in values:
            # Extract key and values
            if 'SELECT' in token.value.upper():
                sub_queries[key] = values


    # print('SUBQUERY FILTERED DICTIONARY: ')
    # pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(sub_queries)

    as_dict = {}
    # Process subqueries
    for key, values in sub_queries.items():

        # Loop through all keyword's values
        for i in range(len(values)):

            # Find subquery statment 
            if 'SELECT' in values[i].value.upper():
                
                # Renamed queries need to be handled a bit differently
                if ' AS ' in values[i].value.upper():   #does this check as for string or AS in keyword?
                    parts = values[i].value.split(" AS ")
                    if len(parts) == 2:
                        as_key = parts[0].strip() 
                        as_value = parts[1]
                        as_dict[as_value] = as_key
                    
                    sub_query_tokens_ = [x for x in values[i].tokens[0].tokens if not x.value in ['(', ')', ' ']]

                    if 'WHERE' in values[i].value.upper():

                        # since pre-process only consists of having where function till now
                        pre_process(sub_query_tokens_) 

                        sub_query_dict_ = split_keywords(sub_query_tokens_)
                        process_keyword(sub_query_dict_, 'WHERE')

                    stmt_dict[key][i] = sub_query_dict_
                    
                    stmt_dict['rename'] = as_dict                 
                else:
                    # Non-renamed queries
                    # remove the paranthesis at the beginning and end
                    sub_query_tokens = [x for x in values[i].tokens if not x.value in ['(', ')', ' ']]

                    # Since sub_queries is a filtered stmt_dict,
                    # the keys will return the same values
                    # Using this, we change the original directly as by this step, 
                    # we have created a dictionary for the sub query
                    sub_query_dict = split_keywords(sub_query_tokens)
                    stmt_dict[key][i] = sub_query_dict

def process(stmt_tokens) -> dict:

    # splits into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)

    # identify which functions need to run
    bool_processes = identify_processes(stmt_dict)

    # capatilize all keywords
    stmt_dict = {key.upper(): value for key, value in stmt_dict.items()}

    # SELECT/DISTINCT
    if bool_processes['DISTINCT']:
        process_keyword(stmt_dict, 'DISTINCT')
    elif bool_processes['SELECT']:
        process_keyword(stmt_dict, 'SELECT')
    
    # WHERE
    if bool_processes['WHERE']:
        process_keyword(stmt_dict, 'WHERE')
    
    # JOIN
    if bool_processes['JOIN']:
        process_join(stmt_dict)

    # SUB QUERY
    if bool_processes['SUB_QUERY']:
        process_subqueries(stmt_dict)

    return stmt_dict

# --------------- POST-PROCESS ---------------
def post_process(stmt_dict: dict) -> dict:
    clean_dict = {}
    for key, values in stmt_dict.items():
        # Create entry into clean dictionary
        if type(values) == list:
            clean_dict[key] = []
        elif type(values) == dict:
            clean_dict[key] = {}
        elif type(values) == Identifier:
            clean_dict[key] = None

        # Check values
        for value in values:
            if type(values) == list:
                if type(value) == dict:
                    clean_dict[key].append(post_process(value))
                else:
                    clean_dict[key].append(value.value)
            elif type(values) == dict:
                clean_dict[key] = post_process(values)
            elif type(values) == Identifier:
                clean_dict[key] = (values.value)

    return clean_dict


# --------------- MAIN ---------------
def translate_query(query: str, DEBUG=True):
    """
        Accepts the inital array of tokens after 
        the sql query has been parsed
        by the sqlparse library 

        All keywords and their associated values are kept seperate
        EXCEPT for the WHERE clause which is treated as one single token.

        1. Split the WHERE by 1 depth to seperate keyword and values
    """

    # Validate query
    stmt_tokens = parse(query)[0].tokens

    # pre-process
    # fixes the query and unifies it
    pre_process(stmt_tokens)

    # process
    # convert query to dictionary
    stmt_dict = process(stmt_tokens)

    # post process
    # cleans up final dictionary
    cleaned_dict = post_process(stmt_dict)

    if DEBUG:
        print("\n")
        print("CLEANED DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(cleaned_dict)

        print("\n")
        print("RAW DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)

    return stmt_dict

def main():
    sql = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme, table INNER JOIN scores ON programme.id = score.id  WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id HAVING something"
    translate_query(sql, False)


    sql = "SELECT * FROM employees"
    translate_query(sql, False)

    sql = "SELECT * FROM employees, products WHERE emp.id = prod.emp_id"
    translate_query(sql, False)

    sql = "SELECT * FROM employees INNER JOIN products ON emp.id = prod.emp_id"
    translate_query(sql, False)

    sql = "SELECT * FROM employees WHERE gender = 'M' AND salary > 50 OR salary < 50"
    translate_query(sql, False)

    sql = "SELECT * FROM employees WHERE gender = 'M' AND (salary > 50 OR salary < 50)"
    translate_query(sql, True)

    sql = "SELECT DISTINCT name, id, age FROM employees WHERE age > 20"
    


if __name__ == "__main__":
    main()