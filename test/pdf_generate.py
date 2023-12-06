from sqlalchemy import create_engine, text
from fpdf import FPDF, XPos, YPos
from grader import *
import time

# engine = create_engine("mysql+pymysql://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")
# connection = engine.connect()


start_time = time.time()

c_queries = [
    "SELECT * FROM employees;",
    "SELECT name, age, salary FROM employees WHERE department_id = 10;",
    "SELECT DISTINCT department_id FROM employees;",
    "SELECT name, MAX(salary) AS max_salary FROM employees GROUP BY department_id;",
    "SELECT name FROM employees WHERE age > 30;",
    "SELECT * FROM employees ORDER BY salary DESC;",
    "SELECT name, SUM(salary) AS total_salary FROM employees GROUP BY department_id;",
    "SELECT * FROM employees WHERE name LIKE 'A%';",
    "SELECT * FROM employees WHERE department_id IN (1, 3, 5);",
    "SELECT AVG(salary) AS avg_salary FROM employees WHERE department_id = 10;",
    "SELECT COUNT(*) AS total_employees FROM employees;",
    "SELECT * FROM employees WHERE age BETWEEN 25 AND 35;",
    "SELECT department_id, COUNT(*) AS num_employees FROM employees GROUP BY department_id HAVING num_employees > 5;",
    "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
    "SELECT name, RANK() OVER (ORDER BY salary DESC) AS rank FROM employees;",
    "SELECT * FROM employees LEFT JOIN departments ON employees.department_id = departments.id;",
    "SELECT name, COALESCE(salary, 0) AS salary FROM employees;",
    "SELECT name, CASE WHEN age < 30 THEN 'Young' ELSE 'Old' END AS age_group FROM employees;",
    "SELECT department_id, PERCENT_RANK() OVER (ORDER BY salary) AS salary_percent_rank FROM employees;",
    "SELECT name, LEAD(salary) OVER (ORDER BY salary) AS next_salary FROM employees;"
    "SELECT name, COUNT(*) AS num_employees FROM employees GROUP BY name HAVING num_employees > 1;",
    "SELECT * FROM employees WHERE salary NOT BETWEEN 30000 AND 60000;",
    "SELECT AVG(salary) AS avg_salary FROM employees WHERE department_id = 5;",
    "SELECT department_id, MAX(salary) AS max_salary FROM employees GROUP BY department_id HAVING MAX(salary) > 80000;",
    "SELECT * FROM employees WHERE name LIKE '%son%';",
    "SELECT name, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank FROM employees;",
    "SELECT name, COALESCE(salary, 0) AS salary FROM employees;",
    "SELECT department_id, SUM(CASE WHEN salary > 50000 THEN 1 ELSE 0 END) AS high_salary_employees FROM employees GROUP BY department_id;",
    # "SELECT * FROM employees WHERE age IN (SELECT MIN(age) FROM employees);",
    "SELECT name, NTILE(4) OVER (ORDER BY salary) AS quartile FROM employees;"
]

# Modified SQL queries list with intentional mistakes or variations
stu_queries = [
    "SELECT * FORM employees;",  # Missing keyword 'FROM'
    "SELECT name, age salary FROM employees WHERE department_id = 10;",  # Missing comma between 'age' and 'salary'
    "SELECT DISTINCT department_id FROM employees WHERE name IS NOT NULL;",  # Added condition 'WHERE name IS NOT NULL'
    "SELECT name, MAX(salary) AS highest_salary FROM employees GROUP BY department_id;",  # Changed alias to 'highest_salary'
    "SELECT names FROM employees WHERE age > 30;",  # Changed column name to 'names'
    "SELECT * FROM employees ORDER salary DESC;",  # Missing keyword 'BY' in ORDER BY
    "SELECT name, SUM(salary) AS total_salary FROM employees WHERE department_id = 2;",  # Changed department_id value
    "SELECT * FROM employees WHERE name LIKE '%A%';",  # Changed LIKE pattern
    "SELECT * FROM employees WHERE department_id IN 1, 3, 5;",  # Missing parentheses in IN statement
    "SELECT AVG(salary) avg_salary FROM employees WHERE department_id = 10;",  # Changed alias position
    "SELECT COUNT(*) total_employees FROM employees WHERE age BETWEEN 25 OR 35;",  # Incorrect BETWEEN syntax
    "SELECT department_id, COUNT(*) AS num_employees FROM employees GROUP BY department_id HAVING num_employees > 8;",  # Changed HAVING condition
    "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) AND age < 30;",  # Added an additional condition
    "SELECT name, RANK() FROM employees ORDER BY salary DESC;",  # Removed OVER clause in window function
    "SELECT * FROM employees RIGHT JOIN departments ON employees.department_id = departments.id;",  # Changed LEFT JOIN to RIGHT JOIN
    "SELECT name, COALESCE(salary) AS salary FROM employees;",  # Removed the default value in COALESCE
    "SELECT name, CASE WHEN age < 30 THEN 'Young' END AS age_group FROM employees;",  # Changed CASE statement
    "SELECT department_id, PERCENT_RANK() AS salary_percent_rank FROM employees ORDER BY salary;",  # Removed OVER clause
    "SELECT name, LEAD(salary) FROM employees ORDER BY salary;",  # Removed OVER clause in window function
    "SELECT name, COUNT(*) AS num_employees FROM employees GROUP BY name HAVING num_employees > 3;",  # Changed HAVING condition
    "SELECT * FORM employees WHERE salary BETWEEN 30000 AND 60000;",  # Missing keyword 'FROM'
    "SELECT AVG(salary) AS avg_sal FROM employees WHERE department_id 5;",  # Missing operator in WHERE clause
    "SELECT department_id, MAX(salary) AS max_salary FROM employees WHERE salary > 70000 GROUP BY department_id;",  # Added condition to WHERE clause
    "SELECT * FROM employees WHERE name LIKE '%on%';",  # Changed LIKE pattern
    "SELECT name, DENSE_RANK() OVER (ORDER BY salary) AS dense_rank FROM employees WHERE age > 25;",  # Changed WHERE condition
    "SELECT name, COALESCE(salary, 0) AS salary FROM employees WHERE age > 30;",  # Changed WHERE condition
    "SELECT department_id, SUM(CASE WHEN salary > 50000 THEN 1 END) AS high_salary_employees FROM employees GROUP BY department_id;",  # Removed ELSE in CASE statement
    # "SELECT * FROM employees WHERE age IN (SELECT MAX(age) FROM employees);",  # Changed subquery to MAX(age)
    "SELECT name, NTILE(4) AS quartile FROM employees ORDER BY salary DESC;"  # Removed OVER clause
]

end_time = time.time()

print(f"Total time taken for grader: {end_time - start_time}")

title = "Quiz Results"

class PDF(FPDF):

    def set_page_margin(self):
        self.set_margin(20)
    

    def header(self):
        self.image(r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\images\DataWiz-Logo.png', 10, 8, 16)
        self.set_font('Gilroy-Bold', '', 20)

        title_w = self.get_string_width(title) + 6
        doc_w = self.w
        self.set_x((doc_w - title_w)/2)

        self.set_line_width(1)
        self.set_text_color(220, 50, 50)

        self.cell(title_w, 10, title, align='C')
        self.ln(30)


    def footer(self):
        self.set_y(-15)
        self.set_font('Gilroy-MediumItalic', '', 10)
        self.set_text_color(169, 169, 169)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def question(self, num, qs):
        self.set_font('Gilroy-SemiBold', '', 14)
        self.set_fill_color(255, 244, 214)

        length = len(str(num)) + 70
        question = f'Question {num}'
        self.cell(length, 8, question, new_x="LMARGIN", new_y="NEXT", fill=1)
        
        self.set_font('Gilroy-Regular', '', 12)
        self.set_fill_color(200, 220, 255)
        question = f'{qs}'
        self.multi_cell(0, 5, question, new_x="LMARGIN", new_y="NEXT", fill=1)
        self.ln()

    def teacher_ans(self, question_answer):
        student_ans = f"Correct Answer: "
        self.set_font('Gilroy-Light', '', 11)
        self.cell(0, 7, student_ans, new_x="LMARGIN", new_y="NEXT")

        self.set_font('Gilroy-Regular', '', 13)
        self.multi_cell(0, 6, question_answer, new_x="LMARGIN", new_y="NEXT")
        self.ln()
    
    def student_ans(self, question_answer):
        student_ans = f"Student Answer: "
        self.set_font('Gilroy-Light', '', 11)
        self.cell(0, 7, student_ans, new_x="LMARGIN", new_y="NEXT")
        
        self.set_font('Gilroy-Regular', '', 13)
        # self.set_fill_color(169, 169, 169)
        self.multi_cell(0, 6, question_answer, new_x="LMARGIN", new_y="NEXT", fill=0)
        self.ln()

    def autograding_results(self, result):
        autograder_text = f"Autograding Results: "
        self.set_font('Gilroy-Light', '', 11)
        self.cell(0, 7, autograder_text, new_x="LMARGIN", new_y="NEXT")
        
        self.set_font('Gilroy-Regular', '', 12)
        self.set_fill_color(221, 221, 221)
        self.multi_cell(0, 6, result, new_x="LMARGIN", new_y="NEXT", fill=1)
        self.ln()

    def print_qs_set(self, ques_num, ques, ques_ans, stu_ans, result):
        self.question(ques_num, ques)
        self.ln()
        self.teacher_ans(ques_ans)
        self.student_ans(stu_ans)
        self.ln()
        self.autograding_results(result)
        self.ln()

        


pdf = PDF('P', 'mm', 'A4')

pdf.add_font('Gilroy-Black', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Black.ttf')
pdf.add_font('Gilroy-Bold', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Bold.ttf')
pdf.add_font('Gilroy-ExtraBold', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-ExtraBold.ttf')
pdf.add_font('Gilroy-Heavy', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Heavy.ttf')
pdf.add_font('Gilroy-Light', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Light.ttf')
pdf.add_font('Gilroy-Medium', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Medium.ttf')
pdf.add_font('Gilroy-MediumItalic', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-MediumItalic.ttf')
pdf.add_font('Gilroy-Regular', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Regular.ttf')
pdf.add_font('Gilroy-SemiBold', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-SemiBold.ttf')
pdf.add_font('Gilroy-Thin', '', r'C:\Users\ASIF\DataWiz\general\frontend\src\assets\fonts\Gilroy-Thin.ttf')

pdf.add_page()
pdf.set_page_margin()
pdf.set_auto_page_break(auto = True, margin = 15)

for i in range(15, len(stu_queries)):
    score, result = auto_grader(c_queries[i], stu_queries[i])
    print(result)
    pdf.print_qs_set(i, i, c_queries[i], stu_queries[i], result)
    if i == 25:
        break



pdf.output('quiz_try.pdf')