from sqlalchemy import create_engine, text
from fpdf import FPDF, XPos, YPos
from grader import *
import time

# engine = create_engine("mysql+pymysql://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")
# connection = engine.connect()


start_time = time.time()

questions = [ 
    "List all the students with their email addresses.",
  "Find the total number of students enrolled in each course.",
  "Provide the names of instructors along with the courses they teach.",
#   "Get all the assignments due in the next 30 days.",
#   "Identify the students who are not enrolled in any courses.",
#   "Display the courses along with the names of students enrolled and their enrollment dates.",
   "Retrieve all blogger names and their email addresses.",
  "List all blog posts along with their corresponding blogger names.",
#   "Find the number of comments made on each blog post.",
#   "Get the most recent comments for each blog post.",
#   "Display all comments made by a specific blogger.",
#   "Show the titles of blog posts that do not have any comments."
  ]

c_queries = [
  "SELECT FirstName, LastName, Email FROM Student;",
  "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment GROUP BY CourseID;",
  "SELECT i.InstructorName, c.CourseName FROM Instructor i JOIN Course c ON i.InstructorID = c.InstructorID GROUP BY CourseID ORDER BY CourseID;",
#   "SELECT AssignmentName, DueDate FROM Assignment WHERE DueDate BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30' DAY;",
#   "SELECT * FROM Student WHERE StudentID NOT IN (SELECT StudentID FROM Enrollment);",
#   "SELECT c.CourseName, s.FirstName, s.LastName, e.EnrollmentDat FROM Course c JOIN Enrollment e ON c.CourseID = e.CourseID;",
  "SELECT BloggerName, Email FROM Blogger;",
  "SELECT b.BloggerName, bp.Title, bp.Conte FROM Blogger b JOIN BlogPost bp ON b.BloggerID = bp.Blogg;",
#   "SELECT bp.BlogP, bp.Title, COUNT(c.CommentID) AS NumberOfComments FROM BlogPost bp LEFT JOIN Comment c ON bp.BlogP = c.BlogPostID GROUP BY bp.BlogP;",
#   "SELECT bp.BlogP, bp.Title, c.CommentConte, c.CommentDate FROM BlogPost bp JOIN Comment c ON bp.BlogP = c.BlogPostID WHERE c.CommentDate IN (SELECT MAX(CommentDate) FROM Comment GROUP BY BlogPostID);",
#   "SELECT c.comment_cntnts, c.CommentDate FROM Comment c WHERE c.BloggerID = 30;", 
#   "SELECT Title FROM BlogPost WHERE BlogP NOT IN (SELECT BlogPostID FROM Comment);"
]

stu_queries = [
  "SELECT first_name, last_name, Email_addr FROM Students;",
  "SELECT CourseID, COUNT(StudentID) AS NumberOfStudents FROM Enrollment ORDER BY CourseID;",
  "SELECT i.InstructorName, c.CourseName FROM Instructors i LEFT JOIN Courses c ON i.InstructorID = c.InstructorID",
#   "SELECT AssignmentName, DueDate FROM Assignment WHERE DueDate BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30' DAY;",
#   "SELECT * FROM Student WHERE StudentID NOT IN (SELECT StudentID FROM Enrollment);",
#   "SELECT c.CourseName, s.FirstName, s.LastName, e.EnrollmentDat FROM Course c INNER JOIN Enrollment e ON c.CourseID = e.CourseID;",
  "SELECT BloggerName, Email FROM Blogger;",
  "SELECT b.BloggerName, bp.Title FROM Blogger b JOIN BlogPost bp ON b.BloggerID = bp.Blogg;",
#   "SELECT bp.BlogP, bp.Title, COUNT(c.CommentID) AS NumberOfComments FROM BlogPost bp RIGHT JOIN Comment c ON bp.BlogP = c.BlogPostID ORDER BY bp.BlogP;",
#   "SELECT bp.BlogP, bp.Title, c.CommentConte, c.CommentDate FROM BlogPost bp JOIN Comment c ON bp.BlogP = c.BlogPostID WHERE c.CommentDate IN (SELECT MAX(CommentDate) FROM Comment GROUP BY BlogPostID);",
#   "SELECT c.CommentConte, c.CommentDate FROM Comment c WHERE c.BloggerID = 10;", 
#   "SELECT Title FROM BlogPost WHERE BlogP NOT IN (SELECT BlogPostID FROM Comment);"
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
        self.set_text_color(0, 0, 0)

        title_w = self.get_string_width(title) + 6
        doc_w = self.w
        self.set_x((doc_w - title_w)/2)

        self.set_line_width(1)

        self.cell(title_w, 10, title, align='C')
        self.ln(30)


    def footer(self):
        self.set_y(-15)
        self.set_font('Gilroy-MediumItalic', '', 10)
        self.set_text_color(169, 169, 169)
        self.cell(0, 10, f'Page {self.page_no()}', align='C')

    def question(self, num, qs):
        self.set_font('Gilroy-SemiBold', '', 14)
        self.set_fill_color(220, 207, 216)

        length = len(str(num)) + 70
        question = f'Question {num}'
        self.cell(length, 8, question, new_x="LMARGIN", new_y="NEXT", fill=1)
        
        self.set_font('Gilroy-Regular', '', 12)
        self.set_fill_color(255, 244, 214)#(200, 220, 255)
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

    def autograding_results(self, result, score):
        autograder_text = f"Autograding Results: "
        self.set_font('Gilroy-Light', '', 11)
        self.cell(0, 7, autograder_text, new_x="LMARGIN", new_y="NEXT")
        
        self.set_font('Gilroy-Regular', '', 12)
        self.set_fill_color(224, 224, 225)#(221, 221, 221)
        self.multi_cell(0, 6, result, new_x="LMARGIN", new_y="NEXT", fill=1)
        self.ln()

        self.set_font('Gilroy-Medium', '', 13)
        self.set_fill_color(224, 224, 225)#(221, 221, 221)
        scorer = f"Score: {score}"
        self.cell(0, 6, scorer, new_x="LMARGIN", new_y="NEXT", fill=1)
        self.ln()
        
    
    def print_qs_set(self, ques_num, ques, ques_ans, stu_ans, result, score):
        self.question(ques_num, ques)
        self.ln()
        self.teacher_ans(ques_ans)
        self.student_ans(stu_ans)
        self.ln()
        self.autograding_results(result, score)
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

for i in range(0, len(questions)):
    print(f"FISH: {c_queries[i]}")
    score, result = auto_grader(c_queries[i], stu_queries[i])
    pdf.print_qs_set(i+1, questions[i], c_queries[i], stu_queries[i], result, score)



pdf.output('quiz_2.pdf')