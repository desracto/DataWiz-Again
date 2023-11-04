from sqlparse import parse
from sqlparse.sql import Identifier, Function
from .tree.tree import Node
from .tree.select_parser import select_stmt, Optional
from pyparsing.exceptions import ParseException

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
            if hasattr(stmt_dict['DISTINCT'][0], 'tokens'):
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

def identify_keyword_process(stmt_dict: dict) -> list:
    """
        Identifies all tokens that have a grouped value
    """
    grouped_keywords = []
    for key, values in stmt_dict.items():
        if len(values) > 0:
            if hasattr(values[0], 'tokens'):
                print(key)

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
        # If the value inside is only a function, skip it
        if type(stmt_dict[keyword][0]) is Function:
            return None
        
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

    as_dict = {}
    # Process subqueries
    for key, values in sub_queries.items():

        # Loop through all keyword's values
        for i in range(len(values)):

            # Find subquery statment 
            if 'SELECT' in values[i].value.upper():
                
                # Renamed queries need to be handled a bit differently
                if ' AS ' in values[i].value.upper():
                    as_value = values[i].tokens[-1]  
                    sub_query_tokens_ = [x for x in values[i].tokens[0].tokens if not x.value in ['(', ')', ' ']]
                    sub_query = ""
                    for token in sub_query_tokens_:
                        sub_query += token.value + " "
                    
                    sub_query_dict = translate_query(sub_query, False)
                    sub_query_dict['AS'] = [as_value]

                    stmt_dict[key][i] = sub_query_dict         
                else:
                    # Non-renamed queries
                    # remove the paranthesis at the beginning and end
                    sub_query_tokens = [x for x in values[i].tokens if not x.value in ['(', ')', ' ']]
                    sub_query = ""
                    for token in sub_query_tokens:
                        sub_query += token.value + " "

                    sub_query_dict = translate_query(sub_query, False)

                    # Since sub_queries is a filtered stmt_dict,
                    # the keys will return the same values
                    # Using this, we change the original directly as by this step, 
                    # we have created a dictionary for the sub query
                    stmt_dict[key][i] = sub_query_dict

def process(stmt_tokens, DEBUG = True) -> dict:

    # splits into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)
    if DEBUG:
        print("PROCESS STEP: KEYWORD-VALUE SPLIT")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
        print("\n")

    # identify which functions need to run
    bool_processes = identify_processes(stmt_dict)
    if DEBUG:
        print("PROCESS STEP: PROCESS-IDENTIFICATION")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(bool_processes)
        print("\n")

    # capatilize all keywords
    stmt_dict = {key.upper(): value for key, value in stmt_dict.items()}

    # SELECT/DISTINCT
    if bool_processes['DISTINCT']:
        process_keyword(stmt_dict, 'DISTINCT')
        stmt_dict['SELECT'] = stmt_dict['DISTINCT']
        stmt_dict['DISTINCT'] = []

        if DEBUG:
            print("PROCESS STEP: DISTINCT PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")

    elif bool_processes['SELECT']:
        process_keyword(stmt_dict, 'SELECT')

        if DEBUG:
            print("PROCESS STEP: SELECT PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")
    
    # WHERE
    if bool_processes['WHERE']:
        process_keyword(stmt_dict, 'WHERE')

        if DEBUG:
            print("PROCESS STEP: WHERE PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")
    
    # JOIN
    if bool_processes['JOIN']:
        process_join(stmt_dict)

        if DEBUG:
            print("PROCESS STEP: JOIN PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")

    # SUB QUERY
    if bool_processes['SUB_QUERY']:
        process_subqueries(stmt_dict)

        if DEBUG:
            print("PROCESS STEP: SUB QUERY PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")


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

def check_syntax(s):
    (select_stmt + Optional(';')).parseString(s, parseAll=True)


# --------------- MAIN ---------------
def translate_query(query: str, DEBUG=True, CLEAN=False):
    """
        Accepts the inital array of tokens after 
        the sql query has been parsed
        by the sqlparse library 

        All keywords and their associated values are kept seperate
        EXCEPT for the WHERE clause which is treated as one single token.

        1. Split the WHERE by 1 depth to seperate keyword and values
    """

    if DEBUG:
        print("QUERY TO BE PROCESSED:", query, "\n")

    # Validate query
    # check_syntax(query)
    stmt_tokens = parse(query)[0].tokens

    # pre-process
    # fixes the query and unifies it
    pre_process(stmt_tokens)

    # process
    # convert query to dictionary
    stmt_dict = process(stmt_tokens, DEBUG)

    # post process
    # cleans up final dictionary
    cleaned_dict = post_process(stmt_dict)

    if DEBUG:
        print("\n")
        print("RAW DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
        
        print("\n")
        print("CLEANED DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(cleaned_dict)

    if CLEAN:
        return cleaned_dict

    return stmt_dict

def main():
    # sql = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme INNER JOIN scores ON programme.id = score.id  WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id HAVING something"
    # # sql = "SEEEE"
    # dict_tree = None
    # try:
    #     dict_tree = translate_query(query = sql, 
    #                                 DEBUG = False, 
    #                                 CLEAN = True)
    # except ParseException as pe:
    #     print(pe)

    # if dict_tree:
    #     rat = Node().insert_dictionary(Node.organize_dictionary(dict_tree))
    #     rat.PrintTree()
    
    # # pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(
    # #     Node.organize_dictionary(dict_tree)
    # # )



    sql = " SELECT program.name, scores.inspiration, \
                    (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price \
            FROM programme \
            INNER JOIN scores \
                ON programme.id = score.id \
            WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id"

    dict_tree = translate_query(query = sql,
                                DEBUG=True,
                                CLEAN=True)
    
    if dict_tree:
        relation = Node.organize_dictionary(dict_tree)
        print(relation)

        rat = Node.create_relations(dict_tree, relation)
        rat.PrintTree()
    

    # sql = "SELECT * FROM employees"
    # translate_query(sql, False)

    # sql = "SELECT * FROM employees, products WHERE emp.id = prod.emp_id"
    # translate_query(sql, False)

    # sql = "SELECT * FROM employees INNER JOIN products ON emp.id = prod.emp_id"
    # translate_query(sql, False) 

    # sql = "SELECT * FROM employees WHERE gender = 'M' AND salary > 50 OR salary < 50"
    # translate_query(sql, False)

    # sql = "SELECT * FROM employees WHERE gender = 'M' AND (salary > 50 OR salary < 50)"
    # translate_query(sql, True)

    # sql = "SELECT * FROM Employees WHERE Salary > 54900 AND Age > 30"
    # translate_query(sql, True)

    # sql = "SELECT DISTINCT department, position FROM employees"
    # translate_query(sql, True)

    sql = "SELECT employees.employee_id, \
            FROM employees \
            RIGHT JOIN departments \
                ON employees.department_id = departments.department_id \
            where employees.employee_id = 100"

    sql = "SELECT first_name, last_name \
            FROM employees \
            WHERE department = 'Sales' \
            GROUP BY department \
            HAVING COUNT(*) > 5 \
            ORDER BY last_name \
            ASC LIMIT 10"
    # dict_tree = translate_query(sql, True, True)
    


if __name__ == "__main__":
    main()