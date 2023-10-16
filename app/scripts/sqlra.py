from sqlparse import parse
from sqlparse.sql import Identifier

# For debug purposes
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
    
# def process_subqueries(stmt_dict: dict, join_type=None):
#     """
#         Seperates subqueries
#     """
#     sub_queries = {}

#     # filter origianl dictionary
#     # to include only keywords and values which contain subqueries
#     for key, values in stmt_dict.items():
#         if key == join_type:
#             continue
        
#         for token in values:
#             # Extract key and values
#             if 'SELECT' in token.value.upper():
#                 sub_queries[key] = values

#     # print('SUBQUERY FILTERED DICTIONARY: ')
#     # pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(sub_queries)

#     # Process subqueries
#     for key, values in sub_queries.items():
#         # Loop through all keyword's values
#         for i in range(len(values)):
#             # Find subquery statment 
#             if 'SELECT' in values[i].value.upper():

#                 # Renamed queries need to be handled a bit differently
#                 if 'AS' in values[i].value.upper():
#                     continue

#                 # Non-renamed queries
#                 # remove the paranthesis at the beginning and end
#                 # print(values[i].tokens)
#                 sub_query_tokens = [x for x in values[i].tokens if not x.value in ['(', ')']]
#                 # print(sub_query_tokens)
#                 sub_query_dict = split_keywords(sub_query_tokens)

#                 # Since sub_queries is a filtered stmt_dict,
#                 # the keys will return the same values
#                 # Using this, we change the original directly as by this step, 
#                 # we have created a dictionary for the sub query
#                 stmt_dict[key][i] = sub_query_dict

# def process(stmt_tokens) -> dict:

#     # splits into keyword-value pairs
#     stmt_dict = split_keywords(stmt_tokens)

#     # Fix SELECT values
#     try:
#         process_keyword(stmt_dict, 'SELECT')
#         None
#     except Exception as e:
#         None
#         # print(e)

#     # Fix WHERE values
#     try:
#         process_keyword(stmt_dict, 'WHERE')
#         None
#     except Exception as e:
#         None
#         # print(e)
    
#     # Fix WHERE values
#     try:
#         process_keyword(stmt_dict, 'FROM')
#         None
#     except Exception as e:
#         None
#         # print(e)

#     # fix join keyword
#     try:
#         join_type = process_join(stmt_dict)
#     except Exception as e:
#         None
#         # print(e)

#     # Fix subqueries
#     try:
#         process_subqueries(stmt_dict, join_type)
#     except Exception as e:
#         None
#         # print(e)

#     return stmt_dict

def process_subqueries(stmt_dict: dict):
    """
        Seperates subqueries
    """
    # print("ENtered process subqueries")
    sub_queries = {}

    # filter origianl dictionary
    # to include only keywords and values which contain subqueries
    for key, values in stmt_dict.items():
        # print(f'key, values: {key, values}')
        if 'JOIN' in key:
            continue 

        for token in values:
            # Extract key and values
            if 'SELECT' in token.value.upper():
                sub_queries[key] = values

    # print("ENtered process subqueries - 1st for loop done")

    print('SUBQUERY FILTERED DICTIONARY: ')
    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(sub_queries)


    as_dict = {}
    # Process subqueries
    for key, values in sub_queries.items():
        # print(f'values {values}')

        # Loop through all keyword's values
        for i in range(len(values)):
            # print(values[i].value + "\n")

            # Find subquery statment 
            if 'SELECT' in values[i].value.upper():
                # print(f'values select: {values[i]}')
                # print(f'key, values: {key, values}')
                # print(f'stmt_dict for the keys here: {stmt_dict[key][i]}\n')
                
                # Renamed queries need to be handled a bit differently
                if ' AS ' in values[i].value.upper():   #does this check as for string or AS in keyword?
                    # # print(f'values as: {values[i].tokens[0].tokens}')
                    # # print(f'values as: {values[i].tokens[0].value}')
                    # print(values[i])
                    print("\n ENtered the as if ")
                    parts = values[i].value.split(" AS ")
                    if len(parts) == 2:
                        as_key = parts[0].strip() 
                        as_value = parts[1]
                        as_dict[as_value] = as_key
                        # print(f'as_dict: {as_dict}')
                    
                    sub_query_tokens_ = [x for x in values[i].tokens[0].tokens if not x.value in ['(', ')', ' ']]

                    if 'WHERE' in values[i].value.upper():

                        # print(f'before subquery token: {sub_query_tokens_}')
                        pre_process(sub_query_tokens_) # since pre-process only consists of having where function till now
                        # print(f'after subquery token: {sub_query_tokens_}')

                        sub_query_dict_ = split_keywords(sub_query_tokens_)
                        process_keyword(sub_query_dict_, 'WHERE')

                    print(f'subquery dict: {sub_query_dict_}')
                    stmt_dict[key][i] = sub_query_dict_
                    
                    stmt_dict['rename'] = as_dict
                    # # print(f'\nstmt_dict for select: {stmt_dict[key]}')

                    # print(f'stmt_dict: {stmt_dict[key][i]}')
                    # stmt_dict['SELECT'][i] = sub_query_dict_
                    
                    # continue
                 
                else:
                    print("\nentered the as else \n")
                    
                    # Non-renamed queries
                    # remove the paranthesis at the beginning and end
                    # print(values[i].tokens)
                    # print(values[i])

                    sub_query_tokens = [x for x in values[i].tokens if not x.value in ['(', ')', ' ']]
                    print(sub_query_tokens)
                    # print("reached till tokenization but not dict")
                    # print(sub_query_tokens)

                    # Since sub_queries is a filtered stmt_dict,
                    # the keys will return the same values
                    # Using this, we change the original directly as by this step, 
                    # we have created a dictionary for the sub query
                    print("reached till almost end\n")
                    sub_query_dict = split_keywords(sub_query_tokens)
                    stmt_dict[key][i] = sub_query_dict

def process(stmt_tokens) -> dict:

    # splits into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)
    stmt_dict = {key.upper(): value for key, value in stmt_dict.items()}

    try: 
        if 'SELECT' in stmt_dict.keys():
            process_keyword(stmt_dict, 'SELECT')

        if 'WHERE' in stmt_dict.keys():
            process_keyword(stmt_dict, 'WHERE')
        
        do_join = False
        for key in stmt_dict.keys():
            if 'JOIN' in key:
                do_join = True

        if do_join:
            process_join(stmt_dict)

        process_subqueries(stmt_dict)
    except Exception as e:
        print(e)

    return stmt_dict


# post process functions
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
        print("QUERY:", query)
        print("CLEANED DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(cleaned_dict)

        print("\n")
        print("RAW DICTIONARY")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)

    return stmt_dict



def main():
    sql = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme, table INNER JOIN scores ON programme.id = score.id  WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id"
    # stmt_tokens = parse(sql)[0].tokens
    translate_query(sql, True)
    
    # print("\n")

    sql = "SELECT * FROM employees"
    # stmt_tokens = parse(sql)[0].tokens
    translate_query(sql, True)

if __name__ == "__main__":
    main()