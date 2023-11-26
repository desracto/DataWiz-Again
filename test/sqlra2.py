from sqlparse import parse
from sqlparse.sql import Identifier, Function
import pprint


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
    
    # WHERE block
    if 'WHERE' in keys:
        bool_processes['WHERE'] = True
    
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

    # retrieves the left table from the FROM clause
    left_table = 'none'
    if stmt_dict.get('FROM'):
        left_table = stmt_dict['FROM'][0]

    # retrieves the right table from the JOIN clause
    right_table = stmt_dict[join_type][0]

    # retrieve ON condition
    on_values = stmt_dict['ON'][0].tokens
    on_values = [x for x in on_values if not x.is_whitespace]

    join = {
        "LEFT": left_table,
        "RIGHT": right_table,
        "ON": on_values
    }

    stmt_dict[join_type] = join
    del stmt_dict['ON']
    del stmt_dict['FROM']

def from_clause(stmt_dict: dict):
    # retrieve all tables
    # and where conditions, empty arrays if they dont exist
    tables = stmt_dict['FROM']
    conditions = stmt_dict.get('WHERE', []) + stmt_dict.get('AND', [])

    join_nodes = []
    completed_conditions = []

    # tables and conditions found
    # creates matching pairs
    # {
    #   "LEFT": left-table,
    #   "RIGHT": right-table,
    #   "ON": On-condition
    # }
    for left_table in tables:
        for condition in conditions:
            for right_table in tables:

                if left_table.value == right_table.value:
                    continue     

                # check if condition has equality operator
                if '=' in condition.value:
                    equality_operator = condition.value.find('=')
                    if  left_table.value in condition.value and \
                        right_table.value in condition.value and \
                        condition.value not in completed_conditions:

                        join_nodes.append({
                            'LEFT': left_table.value,
                            'RIGHT': right_table.value,
                            'ON': condition.value
                        })
                        
                        completed_conditions.append(condition.value)

    pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(join_nodes)

    # Create one overall node
    join = {
        "LEFT": None,
        "RIGHT": None,
        "ON": None
    }

    for match in join_nodes:
        # outter node has not been established yet
        if not join['LEFT']:
            join['LEFT'] = match['LEFT']
            join['RIGHT'] = match['RIGHT']
            join['ON'] = match['ON']
        elif join['RIGHT']:
            temp = {
                'LEFT': join['LEFT'],
                'RIGHT': join['RIGHT'],
                'ON': join['ON']
            }

            join['LEFT'] = match['RIGHT']
            join['RIGHT'] = temp
            join['ON'] = match['ON']

    # remove matched conditions from selection array
    # naive way
    cleaned_conditions = []
    for condition in conditions:
        if condition.value in completed_conditions:
            continue
        else:
            cleaned_conditions.append(condition)

    # multiple conditions
    if len(cleaned_conditions) > 1:
        stmt_dict['WHERE'] = cleaned_conditions[0]
        stmt_dict['AND'] = cleaned_conditions[1:]

    stmt_dict['WHERE'] = cleaned_conditions
    
    # Delete old nodes
    del stmt_dict['FROM']
    del stmt_dict['AND']

    stmt_dict['INNER JOIN'] = join

def join_processing(stmt_dict: dict, type: str):
    if type == 'JOIN':
        join_clause(stmt_dict)
    elif type == 'FROM':
        from_clause(stmt_dict)

def process(stmt_tokens, DEBUG = True) -> dict:
    # isolate the where keyword first
    # if it exists
    isolate_where(stmt_tokens)
    if DEBUG:
        print("PROCESS STEP: KEYWORD-VALUE SPLIT")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint([token for token in stmt_tokens if not token.is_whitespace])
        print("\n")

    # split keywords into keyword-value pairs
    stmt_dict = split_keywords(stmt_tokens)
    if DEBUG:
        print("PROCESS STEP: KEYWORD-VALUE SPLIT")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
        print("\n")
        
    # capatilize all keywords
    stmt_dict = {key.upper(): value for key, value in stmt_dict.items()}

    # identify required processing functions
    bool_processes = identify_processes(stmt_dict)
    if DEBUG:
        print("PROCESS STEP: PROCESS-IDENTIFICATION")
        pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(bool_processes)
        print("\n")

    # JOINs
    if bool_processes['FROM']:
        process_keyword(stmt_dict, 'FROM')
        join_processing(stmt_dict, 'FROM')

        if DEBUG:
            print("PROCESS STEP: JOIN PROCESSING")
            pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
            print("\n")
    elif bool_processes['JOIN']:
        join_processing(stmt_dict, 'JOIN')

        # if DEBUG:
        #     print("PROCESS STEP: JOIN PROCESSING")
        #     pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
        #     print("\n")




    # # SELECT/DISTINCT
    # if bool_processes['DISTINCT']:
    #     process_keyword(stmt_dict, 'DISTINCT')
    #     stmt_dict['SELECT'] = stmt_dict['DISTINCT']
    #     stmt_dict['DISTINCT'] = []

    #     if DEBUG:
    #         print("PROCESS STEP: DISTINCT PARSE")
    #         pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
    #         print("\n")
    # elif bool_processes['SELECT']:
    #     process_keyword(stmt_dict, 'SELECT')

    #     if DEBUG:
    #         print("PROCESS STEP: SELECT PARSE")
    #         pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
    #         print("\n")

    # # WHERE
    # if bool_processes['WHERE']:
    #     process_keyword(stmt_dict, 'WHERE')

    #     if DEBUG:
    #         print("PROCESS STEP: WHERE PARSE")
    #         pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
    #         print("\n")




    return stmt_dict


# ---------------------- MAIN ----------------------
def translate_query(query: str, DEBUG=True, CLEAN=False):
    # pre-process
    query = pre_process(query)
    stmt_tokens = parse(query)[0].tokens

    # process
    stmt_dict = process(stmt_tokens)
    
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
    
    translate_query(sql)



# Cant handle multiple inner joins