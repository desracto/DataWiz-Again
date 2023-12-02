# dict1 - teacher's answer
# dict2 - student's answer

from sqlra import *
import textdistance

def major_minor(dict1, dict2):

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



def spellchecker(teacher_sql, student_sql):

    for key in teacher_sql:
        if key in student_sql:
            teacher_values = teacher_sql[key]
            student_values = student_sql[key]
            print(f"Comparison for '{key}':")
            for t_value in teacher_values:
                for s_value in student_values:
                    distance = textdistance.levenshtein.normalized_distance(t_value, s_value)
                    print(f"Distance between '{t_value}' and '{s_value}': {distance}")

    return None


# def get_join_types(sql_dict):
#     join_types = [key.upper() for key in sql_dict if key.upper().endswith('JOIN')]
#     return join_types

# def compare_join_types(teacher_sql, student_sql):
#     teacher_joins = get_join_types(teacher_sql)
#     student_joins = get_join_types(student_sql)
#     print(f"teacher: {teacher_joins}")
#     print(f"student: {student_joins}")

#     if teacher_joins and student_joins:
#         common_joins = set(teacher_joins).intersection(student_joins)
#         different_joins = set(teacher_joins).symmetric_difference(student_joins)

#         if common_joins:
#             print(f"Common join types: {', '.join(common_joins)}")
        
#         if different_joins:
#             print(f"Different join types: {', '.join(different_joins)}")
#             return len(different_joins)  # Deduct points for each different join type
#         else:
#             return 0  # Join types are the same, no deduction
#     else:
#         print("Join type not found in both queries")
#         return None  # Join type not found in one or both queries


def get_join_type(sql_dict):
    for key in sql_dict:
        if key.upper().endswith('JOIN'):
            return key.upper()  # Extract the join type
    return None  # No join type found


def compare_join_types(teacher_sql, student_sql):
    teacher_join = get_join_type(teacher_sql)
    student_join = get_join_type(student_sql)

    if teacher_join == student_join:
        print(f"Join types match: {teacher_join}")
        return 0  # Join types are the same, no deduction
    else:
        print(f"Join types don't match. Teacher's join: {teacher_join}, Student's join: {student_join}")
        return 1  # Join types are different, deduct 1 point


def check_unnecessary_additions(teacher_sql, student_sql):
    teacher_conditions = set(teacher_sql.get('WHERE', []))
    student_conditions = set(student_sql.get('WHERE', []))

    unnecessary_additions = student_conditions.difference(teacher_conditions)

    if unnecessary_additions:
        print(f"Unnecessary additions found: {', '.join(unnecessary_additions)}")
        return len(unnecessary_additions)  # Deduct points for each unnecessary addition
    else:
        print("No unnecessary additions found")
        return 0  # No deductions if no unnecessary additions are present



def main():
    
    # correct_ans = "SELECT student.name FROM students WHERE grade >= 90"
    # stu_ans = "SELECT student.name FROM students WHERE grade > 80"
    
    # correct_ans = "SELECT course_name, professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, instructor FROM classes WHERE field = 'CS'"
    
    # correct_ans = "SELECT name, inspiration FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    # stu_ans = "SELECT name FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    
    # correct_ans = "SELECT employees, employee_id FROM employees RIGHT JOIN departments ON employees.department_id = departments.department_id where employees.employee_id = 100"
    # stu_ans = "SELECT employees, employee_id FROM emp LEFT JOIN departments ON employees.department_id = departments.department_id where employees.employee_id > 100"

    # correct_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department HAVING COUNT(*) > 5 ORDER BY last_name ASC LIMIT 10"
    # stu_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department LIMIT 10"
   
    # correct_ans = "SELECT firstname, lastname FROM employees WHERE dept = 'Sales' GROUP BY dept HAVING COUNT(*) > 5 ORDER BY lastname ASC LIMIT 10"
    # stu_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department LIMIT 10"

    # correct_ans = "SELECT professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, professor_name FROM classes WHERE field = 'CS' and department = 'Computer Science'"

    # correct_ans = "SELECT professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, professor_name FROM classes WHERE field = 'CS' and department = 'Computer Science'"

    correct_ans = "SELECT employees.employee_id, employees.employee_name, departments.department_name FROM employees, departments WHERE employees.department_id = departments.department_id"
    stu_ans = "SELECT employees.employee_id, employees.employee_name, departments.department_name FROM employees JOIN departments ON employees.department_id = departments.department_id"

    sql_c = translate_query(query = correct_ans,
                                DEBUG=True,
                                CLEAN=True)
    sql_s = translate_query(query = stu_ans,
                                DEBUG=True,
                                CLEAN=True)
    
    print(f'SQL from teacher: {sql_c}')
    print(f'SQL from student: {sql_s}')

    # major_minor(sql_c, sql_s)

    # spellchecker(sql_c, sql_s)

    # join_types = ['INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'JOIN', 'NATURAL JOIN', 'SELF JOIN']
    # join_check = any(key in sql_c for key in join_types)

    # if join_check:
    #     join_type_difference = compare_join_types(sql_c, sql_s)
    #     if join_type_difference is not None:
    #         print(f"Deduction: {join_type_difference}")

    # check_unnecessary_additions(sql_c, sql_s)

if __name__ == "__main__":
    main()





# ----------------------------------------------------------------------------------
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