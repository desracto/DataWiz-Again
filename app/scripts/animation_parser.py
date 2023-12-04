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

    print(', '.join(query['SELECT']))
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

def json_comp_converter(db_results, rm_keys):
    colu_names = []
    for key in rm_keys:
        t = []
        for k in key:
            t.append(k)
        colu_names.append(t)

    # for i in range(0, len(db_results)):
    #     print(colu_names[i][0])
    #     for j in db_results[i]:
    #         print(j)
    #     print("")

    results = {}
    for idx, cols in enumerate(colu_names):
        # key_name = cols[0] + "s"  # Assuming plural naming convention
        results[idx] = []

        for row in db_results[idx]:
            row_dict = {}
            for i, col_name in enumerate(cols):
                row_dict[col_name] = row[i]
            results[idx].append(row_dict)

    return {"results": results}

def retrieve_query_results(q: str):
    sql = translate_query(query = q,
                            DEBUG=False,
                            CLEAN=True)

    # print(f'\nSQL: {sql}\n')

    a = converter(sql)
    b = query_generator(a)
    # print(f"Length B {len(b)}")

    # print(f"B starts - query generator")
    # for i in b:
    #     print(i)
    # print(f"B ends - query generator")

    db_results, rm_keys = fetch_query_results(b)
    ans = json_comp_converter(db_results, rm_keys)

    return ans, b
