from sqlalchemy import create_engine, text
from .sqlra import translate_query

def fetch_query_results(query_list):
    """
        Fetches all the query results for a given set of queries
    """
    engine = create_engine("mysql+pymysql://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

    # Test the connection
    connection = engine.connect()

    final_result = []
    col_names = []
    for i in range(0, len(query_list)):
        q = text(query_list[i])
        result = connection.execute(q)
        column_names = result.keys()
        final_result.append(result)
        col_names.append(column_names)
    
    return final_result, col_names

def find_subqueries(d):
    subqueries = []
    if isinstance(d, dict):
        # print(f"outer if dictionary: {d}")
        if 'SELECT' in d:
            # print(f"select dictionary: {d}")
            subqueries.append(d)
        
        for value in d.values():
            # print(f"values dictionary: {d.values}")
            subqueries.extend(find_subqueries(value))

    elif isinstance(d, (list, tuple)):
        for item in d:
            # print(f"else dict: {d}")
            subqueries.extend(find_subqueries(item))

    return subqueries

def converter(sql_dict):

    def convert_dict_values(d):
        # Recursively convert nested dictionary values to strings
        for key, value in d.items():
            if isinstance(value, dict):
                d[key] = convert_dict_values(value)
            elif isinstance(value, (list, tuple)):
                d[key] = ' '.join(map(str, value))
        return d

    # Convert the values in the original dictionary to strings
    sql_dict_new = {}
    for key, value in sql_dict.items():
        if key == 'SELECT':
            sql_dict_new[key] = value
        elif isinstance(value, dict):
            sql_dict_new[key] = convert_dict_values(value)
            print(sql_dict_new[key])
            print("Used VDict this")
        elif isinstance(value, (list, tuple)):
            sql_dict_new[key] = ' '.join(map(str, value))
            print(sql_dict_new[key])
            print("Used LTuple this")
        else:
            sql_dict_new[key] = value

    return sql_dict_new

join_types = ['INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'JOIN', 'NATURAL JOIN', 'SELF JOIN']

def query_generator(query):
    query_list = []
    # print(f"Query: {query}")

    join_check = any(key in query for key in join_types)
    subq_check = find_subqueries(query)

    if len(subq_check) >1:
        # print("present sub-query")
        # print("trim it be removing the first one")
        print()
    if join_check:
        # print("found join")
        # query_list.append('select * .....')
        for jtype in join_types:
            if jtype in query.keys():
                join_type = jtype
 
                break
        query_list.append("select * FROM "+ query['FROM'])
        query_list.append("select * FROM "+ query[join_type]['RIGHT TABLE'])
        query_list.append("select * FROM "+ query['FROM'] + " " + join_type+ " " + query[join_type]['RIGHT TABLE'] + " ON " + query[join_type]['ON'])
        
    if 'FROM' in query.keys() and not join_check:
        query_list.append("select * FROM "+ query['FROM'])
        # print(f'FROM from the query: {query['WHERE']}')
        # print(f'Type of FROM from the query: {type(query['WHERE'])}')
    if 'WHERE' in query.keys():
        lenl = len(query_list)
        print("TEST TYPE")
        print(type(query_list[lenl-1]))
        query_list.append(query_list[lenl-1] + " WHERE "+ query['WHERE'])
    if 'AND' in query.keys():
        lenl = len(query_list)
        print("AND TYPE")
        print(type(query_list[lenl-1]))
        query_list.append(query_list[lenl-1] + " AND "+ query['AND'])
    if 'OR' in query.keys():
        lenl = len(query_list)
        print("AND TYPE")
        print(type(query_list[lenl-1]))
        query_list.append(query_list[lenl-1] + " OR "+ query['OR'])
    if 'GROUP BY' in query.keys():
        lenl = len(query_list)
        query_list.append(query_list[lenl-1] + " GROUP BY "+ query['GROUP BY'])
    if 'HAVING' in query.keys():
        lenl = len(query_list)
        query_list.append(query_list[lenl-1] + " HAVING "+ query['HAVING'])
    if 'ORDER BY' in query.keys():
        lenl = len(query_list)
        query_list.append(query_list[lenl-1] + " ORDER BY "+ query['ORDER BY'])
    if 'LIMIT' in query.keys():
        lenl = len(query_list)
        query_list.append(query_list[lenl-1] + " LIMIT "+ query['LIMIT'])

    # print(', '.join(query['SELECT']))
    lenl = len(query_list)
    squery = query_list[lenl-1].replace('*', ', '.join(query['SELECT']))
    print(f'Select stuff: {query["SELECT"]}')
    print(f'Select query {squery}')
    query_list.append(squery)
 
    return query_list

def select_star_fixer(ql_list, q_dict,):
    # print(f'q_dict: {q_dict}')
    # print(f'ql_list: {ql_list}')

    select_value = ' '.join(q_dict['SELECT'])
    # print(f"select value : {select_value}")
    qq = ql_list[-1]
    qq = qq.replace('*', select_value)
    return qq

def subq_formatter():
    return None

def json_converter(db_results, rm_keys, table_names):
    colu_names = []
    for key in rm_keys:
        t = []
        for k in key:
            t.append(k)
        colu_names.append(t)
    
    x = {
        'table_name': '',
        'data': ''
    }
    results = {}
    for idx, cols in enumerate(colu_names):
        idx = str(idx)
        results[idx] = x.copy()
        results[idx]['table_name'] = table_names[int(idx)]
        results[idx]['data'] = []

        for row in db_results[int(idx)]:
            row_dict = {}
            for i, col_name in enumerate(cols):
                row_dict[col_name] = row[i]
            results[idx]['data'].append(row_dict)
            # print(f'ROW DICT: {row_dict}')
    
    return results


def animation_table_names(b):
    
    table_names = []
    for i in range(0, len(b)):
        query = b[i].split(' ')
        # print(query)

        joiners = ['INNER', 'LEFT', 'RIGHT', 'FULL', 'NATURAL', 'SELF']
        filters = ['AND', 'WHERE', 'OR', "LIMIT", 'GROUP', 'ORDER', 'HAVING']
        filters_check = list(set(filters).intersection(set(query)))
        # print(f"Filter check {filters_check}")
        
        if i < len(b)-1 :  
            if 'JOIN' in query:
                query_table_names = ''
                # join_check = list(set(joiners).intersection(set(query)))
                # print(join_check)
                from_index = query.index('FROM')
                query_table_names += query[from_index+1]
                join_index = query.index('JOIN')
                if len(filters_check) > 0:
                    query_table_names += ' and ' + query[join_index+1] + " with applied filter"
                else: 
                    query_table_names += ' and ' + query[join_index+1]
                table_names.append(query_table_names)
            else:
                from_index = query.index('FROM')
                if len(filters_check) > 0:
                    query_table_names = ''
                    query_table_names += query[from_index+1] + " with applied filter"
                    table_names.append(query_table_names)
                else: 
                    table_names.append(query[from_index+1])
        else: 
            table_names.append("Final Result")

    return table_names


def pdf_animation(q: str):
    
    q = "select count(artist_id), country, Genre.genre_id FROM Artist JOIN Genre ON Artist.genre_id = Genre.genre_id GROUP BY country ORDER BY Genre.genre_id asc"
    
    sql = translate_query(query = q,
                                DEBUG=True,
                                CLEAN=True)
    print(f'\nSQL: {sql}\n')

    a = converter(sql)
    b = query_generator(a)
    print(f"Length B {len(b)}")

    print(f"B starts - query generator")
    for i in b:
        print(i)
    print(f"B ends - query generator")

    table_names = animation_table_names(b)
    db_results, rm_keys = fetch_query_results(b)
    
    return db_results, rm_keys



def retrieve_query_results(q: str):
    sql = translate_query(query=q,
                          DEBUG=False,
                          CLEAN=True)

    # print(f'\nSQL: {sql}\n')

    a = converter(sql)
    b = query_generator(a)

    table_names = animation_table_names(b)
    db_results, rm_keys = fetch_query_results(b)
    ans = json_converter(db_results, rm_keys, table_names)

    # print(b)

    query_results = {}
    query_results['results'] = ans
    query_results['steps'] = b
    print(query_results)

    return query_results