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
                # print("Mismatch of value count as per original query")
            else: 
                for item1, item2 in zip(dict1[key], dict2[key]):
                    # print(f'item1:  {item1} and item2 key: {item2}')
                    if item1 != item2:
                        error_list.append({key: [item1, item2]})
        else: 
            if set(dict1[key]) != set(dict2[key]):
                error_list.append({key: (dict1[key], dict2[key])})
                # print("Mismatch of value count as per original query")
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
    # print("\n\n")
    # print("Major mistakes: ")
    # print(keyword_list)
    # print("\nMinor mistakes: ")
    # print(error_list)
    # print(f'\nFinal score: {score}')

    print(keyword_list)

    major_string = ""
    if len(keyword_list) > 0:
        for i in keyword_list:
            major_string += str(i) + "\n"
    else:
        major_string = "None"

    minor_string = ""
    if len(error_list) > 0:
        for i in error_list:
            minor_string += str(i) + "\n"
    else:
        minor_string = "None"
    
    explanation = f"\nMissing Keywords: \n{major_string}\nMinor mistakes: \n{minor_string}\nScore: {score}\n"
    print(explanation)

    return score, explanation



def spellchecker(teacher_sql, student_sql):

    mistake_count = 0
    keyword_list = []
    error_list = []
    keyword_count = 0
    for key in teacher_sql:
        if key in student_sql:
            teacher_values = teacher_sql[key]
            student_values = student_sql[key]
            # print(f"Comparison for '{key}':")
            for t_value in teacher_values:
                for s_value in student_values:
                    distance = textdistance.levenshtein.normalized_distance(t_value, s_value)
                    keyword_count =+ 1
                    if distance >= 0.35 and distance <= 0.8:
                        mistake_count =+ 1
                        keyword_list.append(key)
                        error_list.append((t_value, s_value))
                        # print(f"Distance between '{t_value}' and '{s_value}': {distance}")

    mistake_text = "\nSpelling errors:"
    mistake_string = ""
    for i in range(0, len(keyword_list)):
        mistake_string += "\nKeyword: "+ str(keyword_list[i]) + "\n" + str(error_list[i])

    mistake_text += mistake_string

    score = 1 - (mistake_count/keyword_count)

    return score, mistake_text


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
    teacher_keys = set(teacher_sql.keys())
    student_keys = set(student_sql.keys())

    # Check for extra keys in the student's query
    extra_keys = student_keys.difference(teacher_keys)

    unnecessary_additions = 0

    if extra_keys:
        print(f"Extra keys found in student's query: {', '.join(extra_keys)}")
        unnecessary_additions += len(extra_keys)  # Counting extra keys as unnecessary additions

    for key in teacher_keys.intersection(student_keys):
        teacher_values = set(teacher_sql[key])
        student_values = set(student_sql[key])

        # Check for extra elements in the values of matching keys
        extra_values = student_values.difference(teacher_values)
        if extra_values:
            print(f"Extra values found for key '{key}' in student's query: {', '.join(extra_values)}")
            unnecessary_additions += len(extra_values)  # Counting extra values as unnecessary additions

    return unnecessary_additions


def auto_grader(correct_ans, stu_ans):
    
    sql_c = translate_query(query = correct_ans,
                                DEBUG=True,
                                CLEAN=True)
    sql_s = translate_query(query = stu_ans,
                                DEBUG=True,
                                CLEAN=True)
    
    print(f'SQL from teacher: {sql_c}')
    print(f'SQL from student: {sql_s}\n')

    filters = {
        # "major_and_minorf": True,
        "spell_typo_checkerf": True,
        "join_checkerf" : True,
        "additional_checkerf" : True
    }

    score_counter = 1
    temp_score = 0

    score1, result = major_minor(sql_c, sql_s)
    temp_score += score1

    if filters.get("spell_typo_checkerf"):
        score_counter =+ 1
        score2, temp_result2 = spellchecker(sql_c, sql_s)
        temp_score += score2
        result += temp_result2

    # join_types = ['INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'JOIN', 'NATURAL JOIN', 'SELF JOIN']
    # join_check = any(key in sql_c for key in join_types)

    # if join_check and filters.get("join_checkerf"):
    #     join_type_difference = compare_join_types(sql_c, sql_s)
    #     if join_type_difference is not None:
    #         score_countr =+ 1
    #         print(f"Deduction: {join_type_difference}")

    # if filters.get("additional_checkerf"):
        # score_countr =+ 1
        # score3, temp_result3 = check_unnecessary_additions(sql_c, sql_s)
        # temp_score += score3
        # result += temp_result3

    score = temp_score/score_counter

    return score, result
    # return None

def main():
    
    # correct_ans = "SELECT student.name FROM students WHERE grade >= 90"
    # stu_ans = "SELECT student.name FROM students WHERE grade > 80"
    
    # correct_ans = "SELECT course_name, professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, instructor FROM classes WHERE field = 'CS'"
    
    # correct_ans = "SELECT name, inspiration FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    # stu_ans = "SELECT name FROM programme INNER JOIN scores ON programme.id = score.id WHERE s.inspiration > 18 GROUP BY id HAVING something"
    
    # correct_ans = "SELECT employees, employee_id FROM employees INNER JOIN departments ON employees.department_id = departments.department_id where employees.employee_id = 100"
    # stu_ans = "SELECT employees, employee_id FROM emp JOIN departments ON employees.department_id = departments.department_id where employees.employee_id > 100"

    correct_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department HAVING COUNT(*) > 5 ORDER BY last_name ASC LIMIT 10"
    stu_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department LIMIT 10"
   
    # correct_ans = "SELECT firstname, lastname FROM employees WHERE dept = 'Sales' GROUP BY dept HAVING COUNT(*) > 5 ORDER BY lastname ASC LIMIT 10"
    # stu_ans = "SELECT first_name, last_name FROM employees WHERE department = 'Sales' GROUP BY department LIMIT 10"

    # correct_ans = "SELECT professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, professor_name FROM classes WHERE field = 'CS' and department = 'Computer Science'"

    # correct_ans = "SELECT professor_name FROM courses WHERE department = 'Computer Science'"
    # stu_ans = "SELECT subject, professor_name FROM classes WHERE field = 'CS' and department = 'Computer Science'"

    # correct_ans = "SELECT employees.employee_id, employees.employee_name, departments.department_name FROM employees, departments WHERE employees.department_id = departments.department_id"
    # stu_ans = "SELECT employees.employee_id, employees.employee_name, departments.department_name FROM employees JOIN departments ON employees.department_id = departments.department_id"

    # correct_ans = "SELECT name, CASE WHEN age < 30 THEN 'Young' ELSE 'Old' END AS age_group FROM employees"
    # stu_ans = "SELECT name, CASE WHEN age < 30 THEN 'Young' ELSE 'Old' END AS age_group"

    # correct_ans = "SELECT sum(salary) AS sum FROM employees WHERE name LIKE '%son%';"
    # stu_ans = "SELECT count(salary) AS count FROM employees WHERE name LIKE '%son%';"

    # correct_ans = "SELECT album_id, album_name FROM employees WHERE name LIKE '%son%';"
    # stu_ans = "SELECT album.album_id FROM employees WHERE name LIKE '%son%';"

    # correct_ans = "SELECT * FROM employees WHERE age IN (SELECT MAX(age) FROM employees)"
    # stu_ans = "SELECT * FROM employees WHERE age IN (SELECT age FROM employees)"
    auto_grader(correct_ans, stu_ans)

    return None


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