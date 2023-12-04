from sqlparse import parse
from sqlparse.sql import Identifier, Function, Comparison
import pprint

# ---------------------- SUPPORTING FUNCTIONS ----------------------
def __print_dictionary(stmt_dict: dict, msg: str = ""):
    print(msg)
    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
    print("\n")

def pretty_print(item):
    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(item)

def retrieve_token(keyword):
    keyword = parse(keyword)[0].tokens
    return keyword

# ---------------------- PRE-PROCESS ----------------------
def pre_process(query: str):
    # remove ; at the end if present
    if query[-1] == ";":
        query = query[:-1]
    
    return query

# ---------------------- PROCESS ----------------------
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

def split_keywords(stmt_tokens) -> dict:
    """
        Assigns the values to each keyword
    """
    keyword = [
        'SELECT',
        'FROM',
        'WHERE', 'AND',
        'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN',
        'HAVING',
        'GROUP BY', 'ORDER BY',
        'ASC', 'DESC',
        'EXISTS', 'NOT EXISTS',
        'AVG', 'MIN', 'MAX', 'SUM', 'COUNT'
    ]

    stmt_dict = {}
    current_keyword = ""
    for token in stmt_tokens:
        if token.is_whitespace:
            continue

        # for all keyword tokens
        if token.is_keyword and token.value in keyword:            
            if not stmt_dict.get(token.value):
                stmt_dict[token.value] = []
                current_keyword = token.value
            else:
                current_keyword = token.value
        # value tokens
        else:
            stmt_dict[current_keyword].append(token)


    # EDGE CASES
    # WHERE EXISTS
    if stmt_dict.get('EXISTS', None):
        print('true')


    return stmt_dict

def identify_processes(stmt_dict: dict) -> dict:
    """
        This is to only understand what functions must be called in the 
        PROCESS section. 

        :param ``SELECT/DISTINCT``: False
        ``True`` condition: multiple columns exist in the ``SELECT`` keyword.
        If ``DISTINCT`` keyword exists, it swaps the values to ``SELECT``

        :param ``WHERE``: False
        ``True`` condition: If the ``WHERE`` clause exists in the query

        :param ``FROM``: False
        ``True`` condition: If the multiple tables exist in the ``FROM`` clause

        :param ``JOIN``: False
        ``True`` condition: If any of the JOINs exist in the query

        :param ``SUB-QUERY``: False
        ``True`` condition: If a sub-query exists in any of the values
    """
    bool_processes = {
        "SELECT": False,
        "DISTINCT": False,
        "WHERE": False,
        'FROM': False,
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
    
    # # WHERE block
    # if 'WHERE' in keys:
    #     bool_processes['WHERE'] = True
    
    # FROM block
    if 'FROM' in keys:
        # check if FROM has multiple tables
        if len(stmt_dict['FROM'][0].tokens) > 1:
            bool_processes['FROM'] = True

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

# JOIN processing functions
def __order_condition_list(left_table, condition_pairs):
    # find inital condition
    inital_cond = None
    ordered_conditions = []
    for pair in condition_pairs:
        if left_table.value in pair["ON"].value:
            inital_cond = {
                "LEFT": left_table,
                "RIGHT": pair["RIGHT"],
                "ON": pair["ON"]
            }
            ordered_conditions.append(pair)

    # loop again to order all conditions
    while (ordered_conditions.__len__() != condition_pairs.__len__()):
        for pair in condition_pairs:
            # skip past inital
            if pair["RIGHT"] == inital_cond["RIGHT"]:
                continue

            if ordered_conditions[-1]["RIGHT"].value in pair["ON"].value:
                ordered_conditions.append(pair)

    return ordered_conditions

def join_clause(stmt_dict: dict):
    # find the join type
    join_types = [
        'INNER JOIN',
        'LEFT JOIN',
        'LEFT OUTTER JOIN',
        'RIGHT JOIN',
        'RIGHT OUTTER JOIN',
        'FULL JOIN',
        'FULL OUTTER JOIN'
    ]
    join_type = ""

    for key in stmt_dict.keys():
        if key in join_types:
            join_type = key

    # RIGHT table(s)
    right_tables = stmt_dict.get("INNER JOIN", [])

    # left table
    left_table = stmt_dict.get("FROM", [])[0]

    # ON condition(s)
    on_values = stmt_dict.get("ON", [])

    # convert each right table and its condition into pairs
    pairs = []
    for i in range(len(on_values)):
        pairs.append({
            "RIGHT": right_tables[i],
            "ON": on_values[i]
        })

    # order all conditions
    paired_conditions = __order_condition_list(left_table, pairs)

    # loop through all conditions and make master node
    join = {
        "LEFT": None,
        "RIGHT": None,
        "ON": None
    }

    for condition in paired_conditions:
        if not join["LEFT"]:
            join["LEFT"] = left_table
            join["RIGHT"] = condition["RIGHT"]
            join["ON"] = condition["ON"]
        else:
            # store join in seperate temp node
            temp = {
                "LEFT": join["LEFT"],
                "RIGHT": join["RIGHT"],
                "ON": join["ON"]
            }

            join["LEFT"] = temp
            join["RIGHT"] = condition["RIGHT"]
            join["ON"] = condition["ON"]

    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(join)

    del stmt_dict["FROM"]
    del stmt_dict[join_type]
    del stmt_dict["ON"]
    
    stmt_dict[join_type] = join

def __create_matching_pairs(tables: list, conditions: list):
    join_nodes = []
    completed_conditions = []

    for left_table in tables:
        for condition in conditions:
            for right_table in tables:

                if left_table.value == right_table.value:
                    continue     

                # check if condition has equality operator
                if '=' in condition.value:
                    equality_operator = condition.value.find('=')
                    # Split the condition into three parts
                    # check if table is present in both parts

                    if  left_table.value in condition.value and \
                        right_table.value in condition.value and \
                        condition.value not in completed_conditions:

                        join_nodes.append({
                            'LEFT': left_table.value,
                            'RIGHT': right_table.value,
                            'ON': condition.value
                        })
                        
                        completed_conditions.append(condition.value)

    return completed_conditions, join_nodes                     

def __create_master_node(join_pairs):
    outter_node = {
        "LEFT": None,
        "RIGHT": None,
        "ON": None
    }

    for pair in join_pairs:
        # check if outter_node has been initalized
        if not outter_node['LEFT']:
            outter_node['LEFT'] = pair['LEFT']
            outter_node['RIGHT'] = pair['RIGHT']
            outter_node['ON'] = pair['ON']
        
        elif outter_node['RIGHT'] == pair['LEFT']:
            temp = {
                "LEFT": outter_node["LEFT"],
                "RIGHT": outter_node["RIGHT"],
                "ON": outter_node["ON"]
            }

            # swap the outter node
            outter_node["LEFT"] = temp
            outter_node["RIGHT"] = pair['RIGHT']
            outter_node["ON"] = pair['ON']

    return outter_node

def __clean_conditions(conditions, completed_conditions):   
    cleaned_conditions = []
    for condition in conditions:
        if condition.value in completed_conditions:
            continue
        elif condition.is_keyword:
            continue
        else:
            cleaned_conditions.append(condition)

    return cleaned_conditions

def from_clause(stmt_dict: dict):
    # retrieve all tables
    # and selection nodes, empty arrays if they dont exist
    tables = stmt_dict['FROM']
    conditions = stmt_dict.get('WHERE', []) + stmt_dict.get('AND', [])
    
    # match all tables to their conditions
    completed_conditions, join_pairs = __create_matching_pairs(tables, conditions)

    # Create one overall node
    master_join_node = __create_master_node(join_pairs)

    # remove all matched conditions
    cleaned_conditions = __clean_conditions(conditions, completed_conditions)
    
    # Delete old nodes
    del stmt_dict['FROM']
    del stmt_dict['WHERE']
    del stmt_dict['AND']

    # multiple conditions
    if len(cleaned_conditions) > 1:
        stmt_dict['WHERE'] = cleaned_conditions[0]
        stmt_dict['AND'] = cleaned_conditions[1:]
    else:
        stmt_dict['WHERE'] = cleaned_conditions

    stmt_dict['INNER JOIN'] = master_join_node

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

def normalizing(stmt_dict: dict):
    # ex. 1: IN
    # identify 2 parts:
        # before the IN
        # after the IN

    # find the IN keyword within the selection (where, and) clauses
    # normalize them

    # retrieve selection nodes
    selection_nodes = stmt_dict.get('WHERE', []) + stmt_dict.get('AND', [])


    if selection_nodes.__len__() == 0:
        return None
    
    # find the IN
    for i in range(len(selection_nodes)):
        # checks if it is a token and if it is IN
        if hasattr(selection_nodes[i], 'value'):
            if selection_nodes[i].value == 'IN':
                left_node = selection_nodes[i-1]
                in_node = selection_nodes[i]
                right_node = selection_nodes[i+1]

                # check if the right node is a sub-query
                if type(right_node) is dict:
                    # retrieve the column in SELECT
                    column = right_node['SELECT']

                    if column.__len__() > 1:
                        return Exception("Too many values in SELECT clause with IN outer clause")
                    
                    # add AND token to right-node subquery
                    right_node['AND'] = [left_node.value, '=', selection_nodes[i-1].value]

                    # change outer node to WHERE EXISTS


    pretty_print(selection_nodes)



        


    pass



def process(stmt_tokens, DEBUG = True) -> dict:
    # isolate the where keyword first
    # if it exists
    isolate_where(stmt_tokens)
    if DEBUG:
        print("PROCESS STEP: WHERE PARSE")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint([token for token in stmt_tokens if not token.is_whitespace])
        print("\n")

    # split keywords into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)
    if DEBUG: 
        __print_dictionary(stmt_dict, msg="PROCESS STEP: KEYWORD-VALUE SPLIT")

    # capatilize all keywords
    stmt_dict = {key.upper(): value for key, value in stmt_dict.items()}

    # identify required processing functions
    bool_processes = identify_processes(stmt_dict)
    if DEBUG: 
        __print_dictionary(bool_processes, msg="PROCESS STEP: PROCESS-IDENTIFICATION")

    # SELECT/DISTINCT
    if bool_processes['DISTINCT']:
        process_keyword(stmt_dict, 'DISTINCT')
        stmt_dict['SELECT'] = stmt_dict['DISTINCT']
        stmt_dict['DISTINCT'] = []

        if DEBUG:
            __print_dictionary(stmt_dict, "PROCESS STEP: DISTINCT PARSE")
    elif bool_processes['SELECT']:
        process_keyword(stmt_dict, 'SELECT')

        if DEBUG:
            __print_dictionary(stmt_dict, "PROCESS STEP: SELECT PARSE")

    # WHERE
    if bool_processes['WHERE']:
        process_keyword(stmt_dict, 'WHERE')

        if DEBUG:
            print("PROCESS STEP: WHERE PARSE")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")

    # JOINs
    if bool_processes['FROM']:
        process_keyword(stmt_dict, 'FROM')
        from_clause(stmt_dict)

        if DEBUG:
            __print_dictionary(stmt_dict, "PROCESS STEP: JOIN PROCESSING")
    elif bool_processes['JOIN']:
        join_clause(stmt_dict)

        if DEBUG:
            __print_dictionary(stmt_dict, "PROCESS STEP: JOIN PROCESSING")

    # SUB QUERY
    if bool_processes['SUB_QUERY']:
        print("SHIFTING TO SUB-QUERY")
        process_subqueries(stmt_dict)

        if DEBUG:
            __print_dictionary(stmt_dict, "PROCESS STEP: SUB QUERY PARSE")


    # NORMALIZING
    normalizing(stmt_dict)


    return stmt_dict



# ---------------------- MAIN ----------------------
def translate_query(query: str, DEBUG=True, CLEAN=False):
    # pre-process
    query = pre_process(query)
    stmt_tokens = parse(query)[0].tokens

    # process
    stmt_dict = process(stmt_tokens, DEBUG)

    return stmt_dict
        

if __name__ == "__main__":

    # retrieves the name and id of employees
    # who have 500 of their product's stock left
    sql = "SELECT employees.name, employees.id, products.stock AS stock" \
            " FROM employees, products, inventory, stock" \
            " WHERE employees.id = products.emp_id" \
                " AND products.id = inventory.prod_id" \
                " AND inventory.stockID = stock.id" \
                " AND inventory.items > 500;"
    
    # # retrieves all employee names
    # sql =   "SELECT name " \
    #         "FROM employees, products"

    # sql =   "SELECT employees.name, employees.id, products.stock AS stock " \
    #         "FROM employees " \
    #         "INNER JOIN products " \
    #             "ON employees.id = products.emp_id " \
    #         "WHERE inventory.stock > 50 " \
    #         "AND employees.age > 20 " \
    #         "AND department = 'sales'"
    
    # sql =   "SELECT employees.name, employees.id, products.stock AS stock " \
    #         "FROM employees " \
    #         "INNER JOIN products " \
    #             "ON employees.id = products.emp_id " \
    #         "INNER JOIN inventory " \
    #             "ON products.id = inventory.prod_id " \
    #         "WHERE inventory.stock > 50"
    
    # sql =   "SELECT employees.name, employees.id, products.stock AS stock " \
    #         "FROM employees " \
    #         "INNER JOIN inventory " \
    #             "ON products.id = inventory.prod_id " \
    #         "INNER JOIN products " \
    #             "ON employees.id = products.emp_id " \
    #         "WHERE inventory.stock > 50"

    # sql = " SELECT movieTitle \
    #         FROM StarsIn \
    #         WHERE starsName IN ( \
    #             SELECT name \
    #             FROM MovieStar \
    #             WHERE birthDate = 1960) \
    #         AND date IN ( \
    #             SELECT date \
    #             FROM releaseDates \
    #             where release > 2000)\
    #         AND movieTitle LIKE 'L%'"
    
    # sql = " SELECT movieTitle \
    #         FROM StarsIn \
    #         WHERE EXISTS ( \
    #             SELECT name \
    #             FROM MovieStar \
    #             WHERE birthdate = 190 and name=starName)"

    stmt_dict = translate_query(sql)




# Cant handle multiple inner joins