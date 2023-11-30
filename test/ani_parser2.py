# # keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', "LIMIT", 'ORDER BY']
# from sqlra import *

# def find_subqueries(d):
#     subqueries = []
#     if isinstance(d, dict):
#         # print(f"outer if dictionary: {d}")
#         if 'SELECT' in d:
#             # print(f"select dictionary: {d}")
#             subqueries.append(d)
        
#         for value in d.values():
#             # print(f"values dictionary: {d.values}")
#             subqueries.extend(find_subqueries(value))

#     elif isinstance(d, (list, tuple)):
#         for item in d:
#             # print(f"else dict: {d}")
#             subqueries.extend(find_subqueries(item))

#     return subqueries

# def converter(sql_dict):

#     def convert_dict_values(d):
#         # Recursively convert nested dictionary values to strings
#         for key, value in d.items():
#             if isinstance(value, dict):
#                 d[key] = convert_dict_values(value)
#             elif isinstance(value, (list, tuple)):
#                 d[key] = ' '.join(map(str, value))
#         return d

#     # Convert the values in the original dictionary to strings
#     sql_dict_new = {}
#     for key, value in sql_dict.items():
#         if key == 'SELECT':
#             sql_dict_new[key] = value
#         elif isinstance(value, dict):
#             sql_dict_new[key] = convert_dict_values(value)
#         elif isinstance(value, (list, tuple)):
#             sql_dict_new[key] = ' '.join(map(str, value))
#         else:
#             sql_dict_new[key] = value

#     return sql_dict_new

# join_types = ['INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'JOIN', 'NATURAL JOIN', 'SELF JOIN']

# def checker(query):
#     query_list = []
#     # print(f"Query: {query}")

#     join_check = any(key in query for key in join_types)
#     subq_check = find_subqueries(query)

#     if len(subq_check) >1:
#         # print("present sub-query")
#         # print("trim it be removing the first one")
#         print()
#     if join_check:
#         # print("found join")
#         # query_list.append('select * .....')
#         for jtype in join_types:
#             if jtype in query.keys():
#                 join_type = jtype
 
#                 break
#         query_list.append("select * FROM "+ query['FROM'])
#         query_list.append("select * FROM "+ query[join_type]['RIGHT TABLE'])
#         query_list.append("select * FROM "+ query['FROM'] + " " + join_type+ " " + query[join_type]['RIGHT TABLE'] + " ON " + query[join_type]['ON'])
        
#     if 'FROM' in query.keys() and not join_check:
#         query_list.append("select * FROM "+ query['FROM'])
#         # print(f'FROM from the query: {query['WHERE']}')
#         # print(f'Type of FROM from the query: {type(query['WHERE'])}')
#     if 'WHERE' in query.keys():
#         lenl = len(query_list)
#         query_list.append(query_list[lenl-1] + " WHERE "+ query['WHERE'])
#     if 'GROUP BY' in query.keys():
#         lenl = len(query_list)
#         query_list.append(query_list[lenl-1] + " GROUP BY "+ query['GROUP BY'])
#     if 'HAVING' in query.keys():
#         lenl = len(query_list)
#         query_list.append(query_list[lenl-1] + " HAVING "+ query['HAVING'])
#     if 'ORDER BY' in query.keys():
#         lenl = len(query_list)
#         query_list.append(query_list[lenl-1] + " ORDER BY "+ query['ORDER BY'])
#     if 'LIMIT' in query.keys():
#         lenl = len(query_list)
#         query_list.append(query_list[lenl-1] + " LIMIT "+ query['LIMIT'])

#     # print(', '.join(query['SELECT']))
#     # lenl = len(query_list)
#     # squery = query_list[lenl-1]#.replace('*', ', '.join(query['SELECT']))
#     # print(f'Select stuff: {query['SELECT']}')
#     # query_list.append(squery)

#     return query_list

# def select_star_fixer(ql_list, q_dict,):
#     # print(f'q_dict: {q_dict}')
#     # print(f'ql_list: {ql_list}')

#     select_value = ' '.join(q_dict['SELECT'])
#     # print(f"select value : {select_value}")
#     qq = ql_list[-1]
#     qq = qq.replace('*', select_value)
#     return qq

# def subq_formatter():
#     return None

# def main():
#     q = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id HAVING something"
#     # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees, products, inventory, stock WHERE employees.id = products.emp_id AND products.id = inventory.prod_id AND inventory.stockID = stock.id AND inventory.items > 500"
#     # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees INNER JOIN products ON employees.id = products.emp_id INNER JOIN inventory ON products.id = inventory.prod_id WHERE inventory.stock > 50"
#     # q = "SELECT name FROM employees, product"
#     # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees INNER JOIN products ON employees.id = products.emp_id WHERE inventory.stock > 50 AND employees.age > 20 AND department = 'sales'"
#     # q = "SELECT employees.name FROM employees WHERE employees.id > 100 OR employees.id = 500"

#     sql = translate_query(query = q,
#                                 DEBUG=True,
#                                 CLEAN=True)
#     print(f'\nSQL: {sql}\n')



#     # subqueries = find_subqueries(sql)
#     # subqueries.pop(0)
#     # # print(f'subqr: {subqueries}')

#     # if len(subqueries) > 0:
#     #     sq_list = []
#     #     for i in subqueries:
#     #         # print(f'I : {i}')
#     #         x = converter(i)
#     #         y = checker(x)
#     #         # print(f'y: {y}')
#     #         z = select_star_fixer(y, i)
#     #         # print(f"\nz : {z}")
#     #         y.append(z)
#     #         print(f' new subquery tree: {y}\n')
#     #         sq_list.append(y)

#     # a = converter(sql)
#     # print(f"converter: {a}")
#     # b = checker(a)
#     # b.append(q)

#     b = checker(sql)
#     print(f"checker: {b}")

#     # # final_formatter()

#     # for i in b:
#     #     print(i)


# if __name__ == "__main__":
#     main()


from sqlra import *
from db_tester2 import *

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
    # squery = query_list[lenl-1]#.replace('*', ', '.join(query['SELECT']))
    # print(f'Select stuff: {query['SELECT']}')
    # query_list.append(squery)

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

def main():
    # q = "SELECT albums.AlbumName, songs.SongTitle, (SELECT MAX(ReleaseYear) FROM albums WHERE ArtistID = artists.ArtistID) AS max_release_year FROM albums INNER JOIN songs ON albums.AlbumID = songs.AlbumID WHERE songs.SongTitle > (SELECT AVG(ReleaseYear) FROM albums) GROUP BY albums.AlbumID"
    q = "SELECT Album.album_name, Song.song_title FROM Album INNER JOIN Song ON Album.album_id = Song.album_id GROUP BY Album.album_id"

    # q = "SELECT program.name, scores.inspiration, (SELECT MAX(price) FROM product_prices WHERE product_id = products.product_id) AS max_price FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > (SELECT AVG(INSPIRATION) FROM SCORES) GROUP BY id HAVING something"
    # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees, products, inventory, stock WHERE employees.id = products.emp_id AND products.id = inventory.prod_id AND inventory.stockID = stock.id AND inventory.items > 500"
    # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees INNER JOIN products ON employees.id = products.emp_id INNER JOIN inventory ON products.id = inventory.prod_id WHERE inventory.stock > 50"
    # q = "SELECT name FROM employees, product"
    # q = "SELECT employees.name, employees.id, products.stock AS stock FROM employees INNER JOIN products ON employees.id = products.emp_id WHERE inventory.stock > 50 AND employees.age > 20 AND department = 'sales'"
    # q = "SELECT employees.name FROM employees WHERE employees.id > 100 OR employees.id = 500"

    sql = translate_query(query = q,
                                DEBUG=True,
                                CLEAN=True)
    print(f'\nSQL: {sql}\n')

    # subqueries = find_subqueries(sql)
    # subqueries.pop(0)

    # if len(subqueries) > 0:
    #     sq_list = []
    #     for i in subqueries:
    #         x = converter(i)
    #         y = query_generator(x)
    #         z = select_star_fixer(y, i)
    #         y.append(z)
    #         sq_list.append(y)

    a = converter(sql)
    b = query_generator(a)
    print(f"Length B {len(b)}")

    for i in b:
        print(i)

    c = run(b)
    print(f"Length B {len(c)}")
    for i in c:
        for j in i:
            print(j)
            # print(type(j))
        print("")


if __name__ == "__main__":
    main()