from sqlparse import parse
import pprint

# Pre-process functions
def isolate_where(stmt_tokens):
    """
        Isolates the WHERE keyword from it's values
    """
    found = False # for debug purposes

    for i in range(0, len(stmt_tokens)):
        # Skip WS characters
        if stmt_tokens[i].is_whitespace:
            continue

        # Find the where clause
        if stmt_tokens[i].value.upper()[:5] == 'WHERE':
            found = True
            where_values = stmt_tokens[i].tokens

            # Replace old where token with new tokens
            stmt_tokens[i:i+1] = where_values

def pre_process(stmt_tokens):
    isolate_where(stmt_tokens)


# Process functions
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
        raise Exception("Only one projection statement")

    new_keyword_values = []
    # clean ws and punctuation characters
    for token in keyword_values:
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
    
def process_subqueries(stmt_dict: dict, join_type=None):
    """
        Seperates subqueries
    """
    sub_queries = {}

    # filter origianl dictionary
    # to include only keywords and values which contain subqueries
    for key, values in stmt_dict.items():
        if key == join_type:
            continue
        
        for token in values:
            # Extract key and values
            if 'SELECT' in token.value.upper():
                sub_queries[key] = values

    print('SUBQUERY FILTERED DICTIONARY: ')
    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(sub_queries)

    # Process subqueries
    for key, values in sub_queries.items():
        # Loop through all keyword's values
        for i in range(len(values)):
            # Find subquery statment 
            if 'SELECT' in values[i].value.upper():

                # Renamed queries need to be handled a bit differently
                if 'AS' in values[i].value.upper():
                    continue

                # Non-renamed queries
                # remove the paranthesis at the beginning and end
                # print(values[i].tokens)
                sub_query_tokens = [x for x in values[i].tokens if not x.value in ['(', ')']]
                # print(sub_query_tokens)
                sub_query_dict = split_keywords(sub_query_tokens)

                # Since sub_queries is a filtered stmt_dict,
                # the keys will return the same values
                # Using this, we change the original directly as by this step, 
                # we have created a dictionary for the sub query
                stmt_dict[key][i] = sub_query_dict

def process(stmt_tokens) -> dict:

    # splits into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)

    # Fix SELECT values
    try:
        process_keyword(stmt_dict, 'SELECT')
        None
    except Exception as e:
        None
        # print(e)

    # Fix WHERE values
    try:
        process_keyword(stmt_dict, 'WHERE')
        None
    except Exception as e:
        None
        # print(e)

    # fix join keyword
    try:
        join_type = process_join(stmt_dict)
    except Exception as e:
        None
        # print(e)

    # Fix subqueries
    try:
        process_subqueries(stmt_dict, join_type)
    except Exception as e:
        None
        # print(e)

    return stmt_dict

# # post process functions
# def post_process(stmt_dict: dict) -> dict:
#     # clean dictionary
#     clean_dict = {}
#     for key, values in stmt_dict.items():


def translate_query(stmt_tokens):
    """
        Accepts the inital array of tokens after 
        the sql query has been parsed
        by the sqlparse library 

        All keywords and their associated values are kept seperate
        EXCEPT for the WHERE clause which is treated as one single token.

        1. Split the WHERE by 1 depth to seperate keyword and values
    """


    # pre-process
    pre_process(stmt_tokens)

    # process
    stmt_dict = process(stmt_tokens)


    print("\n")
    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)



def main():
    sql = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme INNER JOIN scores ON programme.id = score.id  WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id"
    stmt_tokens = parse(sql)[0].tokens
    translate_query(stmt_tokens)
    
    # print("\n")

    sql = "SELECT * FROM employees"
    stmt_tokens = parse(sql)[0].tokens
    translate_query(stmt_tokens)

if __name__ == "__main__":
    main()