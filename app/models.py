from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

from .extensions import db
from .blueprints.animation import _prefixed_models

def get_uuid():
    return uuid4().hex

class Users(db.Model):
    # Table name
    __tablename__ = 'Users'

    # Fields
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    fullname = db.Column(db.String(40))
    username = db.Column(db.String(40), unique=True)
    email = db.Column(db.String(345), unique=True)
    password_hash = db.Column(db.Text, nullable=False)
    account_type = db.Column(db.String(10))
    gender = db.Column(db.String(6))

    # Relationships
    quizzes = db.relationship('Quiz', back_populates='user')

    # Functions
    def __repr__(self):
        return "<User ID: {}>".format(self.id)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password=password)
    
    def to_dict(self):
        data = {
            "id": self.id,
            "username": self.username,
            "email": self.email  
        }

        return data
    
    def from_dict(self, data, new_user=False):
        for field in ['fullname', 'username', 'email', 'password', 'account_type', 'gender']:
            if field in data:
                setattr(self, field, data[field])

        if new_user and 'password' in data:
            self.set_password(data['password'])

        return self
    
    def retrieve_quizes(self):
        return self.quizzes
        
class Quiz(db.Model):
    # Table name
    __tablename__ = 'Quiz'

    # Fields
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    name = db.Column(db.String(120))
    start_time = db.Column(db.DateTime)
    userid = db.Column(db.String(40), db.ForeignKey('Users.id')) # FK
    img_id = db.Column(db.String(32), db.ForeignKey('Quiz_Image.img_id'))

    # Relationships
    user = db.relationship('Users', back_populates='quizzes')
    questions = db.relationship('Quiz_QPA', back_populates='quiz')
    img = db.relationship('Quiz_Image', back_populates='quiz')

    # Functions
    def __repr__(self):
        return "<Quiz ID: {}>".format(self.id)        

    def get_time(self):
        """
            Doesn't matter how the datetime is inserted into the database, 
            it will always send it out in the following format:
                %d/%m/%Y, %H:%M:%S -> d/m/YYYY HH:MM:SS
        """
        return datetime.datetime.strftime(self.start_time, "%d/%m/%Y, %H:%M:%S")

    def add_time(self, year, month, day, hour, minute, second):
        self.start_time = datetime.datetime(year, month, day, hour, minute, second)
    
    def add_time(self, time:str):
        self.start_time = datetime.datetime.strptime(time, "%m/%d/%Y - %H:%M:%S")

    def to_dict(self):

        questions = list(self.questions)
        for i in range(len(questions)):
            questions[i] = questions[i].to_dict()

        data = {
            "id": self.id,
            "quiz_name": self.name,
            "start_time": self.get_time(),
            "userid": self.user.id,
            "questions": questions
        }

        return data

class Quiz_Image(db.Model):
    # table name
    __tablename__ = 'Quiz_Image'

    # Fields
    img_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    quiz_id = db.Column(db.String(32), db.ForeignKey('Quiz.id')) # Fk
    img_data = db.Column(db.LargeBinary)

    # Relationship
    quiz = db.relationship('Quiz', back_populates='img')

    # Function
    def __repr__(self) -> str:
        return "<Quiz_Img ID: {}>".format(self.img_id) 

class Quiz_QPA(db.Model):
    # Table name
    __tablename__ = 'Quiz_QPA'

    # Fields
    qaid = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    quiz_id = db.Column(db.String(32), db.ForeignKey('Quiz.id')) # Fk

    question_number = db.Column(db.Integer)
    problem = db.Column(db.String(400))
    answer = db.Column(db.String(1000))


    # Relationships
    # retrieves the associated quiz's details
    quiz = db.relationship('Quiz', back_populates='questions')

    # Functions
    def __repr__(self):
        return "<Quiz_QPA | ID: {}, \
                 Quiz ID: {}, \
                 Question Number: {}>".format(self.qaid, self.quiz_id, self.question_number)
    
    def to_dict(self):
        data = {
            "qaid": self.qaid,
            "question_number": self.question_number,
            "problem": self.problem,
            "answer": self.answer,
            "quiz_id": self.quiz_id
        }

        return data

