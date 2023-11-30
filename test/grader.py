# dict1 - teacher's answer
# dict2 - student's answer

from sqlra import *

def check(dict1, dict2):

    keyword_list = []
    keyword_unsimilar = False
    error_list = []
    # keywords
    if set(dict1.keys()) != set(dict2.keys()):
        non_matching_keys = set(dict1.keys()).symmetric_difference(set(dict2.keys()))
        keyword_list = list(non_matching_keys)
        keyword_unsimilar = True

    for key in set(dict1.keys()).intersection(set(dict2.keys())):
        if keyword_unsimilar == True:
            if set(dict1[key]) != set(dict2[key]):
                error_list.append({key: (dict1[key], dict2[key])})
                print("Mismatch of value count as per original query")
            else: 
                for item1, item2 in zip(dict1[key], dict2[key]):
                    # print(f'item1:  {item1} and item2 key: {item2}')
                    if item1 != item2:
                        error_list.append({key: [item1, item2]})
        else: 
            if set(dict1[key]) != set(dict2[key]):
                error_list.append({key: (dict1[key], dict2[key])})
                print("Mismatch of value count as per original query")
            else: 
                for item1, item2 in zip(dict1[key], dict2[key]):
                    # print(f'item1:  {item1} and item2 key: {item2}')
                    if item1 != item2:
                        error_list.append({key: [item1, item2]})


    major_mistakes = (len(keyword_list)/len(dict1.keys()))
    minor_mistakes = (len(error_list)/len(dict1.values()))/2
    # print(keyword_list)
    # print(error_list)
    # print(dict1.keys())
    # print(dict1.values())
    # print(major_mistakes)
    # print(minor_mistakes)

    score = 1 - (major_mistakes + minor_mistakes)
    print("\n\n")
    print("Major mistakes: ")
    print(keyword_list)
    print("\nMajor mistakes: ")
    print(error_list)
    print(f'\nFinal score: {score}')

    return score


# dq1 = {'SELECT': ['name'], 'FROM': ['students'], 'WHERE': ['age', '>', '18'], 'GROUP BY': None}
# dq2 = {'SELECT': ['name'], 'FROM': ['students'], 'WHERE': ['age', '=', '18', '20']}
# dq3 = {'SELECT': ['name'], 'FROM': ['classes']}
# dq4 = {'SELECT': ['name'], 'FROM': ['students']}
# dq5 = {'SELECT': ['name'], 'WHERE': ['age', '>', '18'], 'FROM': ['students']}
# dq6 = {'SELECT': ['name'], 'FROM': ['students'], 'WHERE': ['age', '18', '=']}
# dq7 = {'SELECT': ['name'], 'FROM': ['students']}

# dq8 = {   'SELECT': ['first_name', 'last_name'],
#     'FROM': ['employees'],
#     'WHERE': ['department', '=', "'Sales'"],
#     'GROUP BY': ['department'],
#     'HAVING': ['COUNT(*) > 5'],
#     'ORDER BY': ['last_name ASC'],
#     'LIMIT': ['10']}
# dq9 = {   'SELECT': ['first_name', 'last_name'],
#     'FROM': ['employees'],
#     'WHERE': ['department', '=', " "],
#     # 'GROUP BY': ['department'],
#     # 'HAVING': ['COUNT(*) > 5'],
#     # 'ORDER BY': ['last_name ASC'],
#     'LIMIT': ['10']}


# dq10 = {'SELECT': [   'program.name',
#                   'scores.inspiration',
#                   {   'SELECT': ['MAX(price)'],
#                       'FROM': ['product_prices'],
#                       'WHERE': ['product_id', '=', 'products.product_id']}],
#     'FROM': ['programme'],
#     'INNER JOIN': {   'RIGHT TABLE': 'scores',
#                       'ON': ['programme.id', '=', 'score.id']},
#     'WHERE': [   's.inspiration',
#                  '>',
#                  {'SELECT': ['AVG(INSPIRATION)'], 'FROM': ['SCORES']}],
#     'GROUP BY': ['id']}

# dq11 = {'SELECT': [   'program.name',
#                   'scores.inspiration',
#                 #   {   'SELECT': ['MAX(price)'],
#                 #       'FROM': ['product_prices'],
#                 #       'WHERE': ['product_id', '=', 'products.product_id']}
#                 ],
#     'FROM': ['programme'],
#     'INNER JOIN': {   'RIGHT TABLE': 'scores',
#                       'ON': ['programme.id', '=', 'score.id']},
#     'WHERE': [   's.inspiration',
#                  '>',
#                  {'SELECT': ['AVG(INSPIRATION)'], 'FROM': ['SCORES']}],
#     'GROUP BY': ['id']}


def main():
    
    correct_ans = "SELECT student.name FROM students WHERE grade >= 90"
    stu_ans = "SELECT student.name FROM students WHERE grade > 80"
    
    # correct_ans = "SELECT course_name, professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, instructor FROM classes WHERE field = 'CS"
    
    # correct_ans = "SELECT name, inspiration FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    # stu_ans = "SELECT name FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    
    # correct_ans = "SELECT employees, employee_id FROM employees RIGHT JOIN departments ON employees.department_id = departments.department_id where employees.employee_id = 100"
    # stu_ans = "SELECT employees, employee_id FROM emp RIGHT JOIN departments ON employees.department_id = departments.department_id where employees.employee_id > 100"

    correct_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department HAVING COUNT(*) > 5 ORDER BY last_name ASC LIMIT 10"
    stu_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department LIMIT 10"
   
    sql_c = translate_query(query = correct_ans,
                                DEBUG=True,
                                CLEAN=True)
    sql_s = translate_query(query = stu_ans,
                                DEBUG=True,
                                CLEAN=True)
    print(f'SQL from teacher: {sql_c}')
    print(f'SQL from student: {sql_s}')

    check(sql_c, sql_s)


if __name__ == "__main__":
    main()