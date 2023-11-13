# keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', "LIMIT", 'ORDER BY']

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
        elif isinstance(value, (list, tuple)):
            sql_dict_new[key] = ' '.join(map(str, value))
        else:
            sql_dict_new[key] = value

    return sql_dict_new

join_types = ['INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'JOIN', 'NATURAL JOIN', 'SELF JOIN']


def checker(query):
    query_list = []
    print(f"Query: {query}")

    join_check = any(key in query for key in join_types)
    subq_check = find_subqueries(query)

    if len(subq_check) >1:
        print("present sub-query")
        print("trim it be removing the first one")
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
    if 'WHERE' in query.keys():
        lenl = len(query_list)
        query_list.append(query_list[lenl-1] + " WHERE "+ query['WHERE'])
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
    # lenl = len(query_list)
    # squery = query_list[lenl-1].replace('*', ', '.join(query['SELECT']))
    # query_list.append(squery)

    return query_list

def main():
    sql = {'SELECT': [   'program.name',
                  'scores.inspiration',
                  {   'SELECT': ['MAX(price)'],
                      'FROM': ['product_prices'],
                      'WHERE': ['product_id', '=', 'products.product_id']}],
    'FROM': ['programme'],
    'INNER JOIN': {   'RIGHT TABLE': 'scores',
                      'ON': ['programme.id', '=', 'score.id']},
    'WHERE': [   's.inspiration',
                 '>',
                 {'SELECT': ['AVG(INSPIRATION)'], 'FROM': ['SCORES']}],
    'GROUP BY': ['id']}
    a = converter(sql)
    print(a)
    b = checker(a)
    for i in b:
        print(i)


if __name__ == "__main__":
    main()