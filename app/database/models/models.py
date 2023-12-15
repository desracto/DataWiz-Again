from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash
from ...blueprints.main.errors import bad_request, error_response
import datetime
from sqlalchemy import types
import io, base64
from PIL import Image
from flask import url_for


from ...extensions import db

def get_uuid():
    return uuid4().hex

class Users(db.Model):
    # Table name
    __tablename__ = 'Users'

    # Fields
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    fullname = db.Column(db.String(40))
    username = db.Column(db.String(40))
    email = db.Column(db.String(345), unique=True)
    password_hash = db.Column(db.Text, nullable=False)
    account_type = db.Column(db.String(10)) # Learner | Instructor
    gender = db.Column(db.String(6)) # Male | Female

    # Relationships
    quizzes = db.relationship('Quiz', back_populates='user')
    animations = db.relationship('Animation', back_populates='user')

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
            "email": self.email,
            "account_type": self.account_type,
            "gender": self.gender,
            "fullname": self.fullname
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
        json_quizzes = []
        for quiz in self.quizzes:
            json_quizzes.append(quiz.to_dict())
        
        return json_quizzes
    
    def retrieve_animations(self):
        json_animations = []
        for animation in self.animations:
            json_animations.append(animation.to_dict())
            
        return json_animations
        

class Quiz(db.Model):
    # Table name
    __tablename__ = 'Quiz'

    # Fields
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    userid = db.Column(db.String(40), db.ForeignKey('Users.id')) # FK

    name = db.Column(db.String(120))
    description = db.Column(db.String(2000)) 
    start_time = db.Column(db.DateTime)

    link_generated = db.Column(db.Boolean, default=False)

    # Relationships
    user = db.relationship('Users', back_populates='quizzes')

    question_sets = db.relationship('Quiz_QuestionSet', back_populates='quiz')

    questions = db.relationship('Quiz_QPA', back_populates='quiz') # try not to use this
    filters = db.relationship('Filters', back_populates='quiz')

    # Functions
    def __repr__(self):
        return "<Quiz ID: {}>".format(self.id)        

    def get_time(self):
        """
            Doesn't matter how the datetime is inserted into the database, 
            it will always send it out in the following format:
                %d/%m/%Y, %H:%M:%S -> d/m/YYYY HH:MM:SS
        """
        return datetime.datetime.strftime(self.start_time, "%d/%m/%Y - %H:%M:%S")

    def add_time(self, year, month, day, hour, minute, second):
        self.start_time = datetime.datetime(year, month, day, hour, minute, second)
    
    def add_time(self, time:str):
        self.start_time = datetime.datetime.strptime(time, "%m/%d/%Y - %H:%M:%S")

    def retrieves_all_userid_responses(self):
        """
            Retrieves all the userids of everyone who attempted the quiz
        """
        userid_attempts = []
        userids = []
        for question in self.questions:
            for attempt in question.attempts:
                if attempt.user_id not in userids:
                    userid_attempts.append({
                        "user_id": attempt.user_id,
                        "username": Users.query.get_or_404(attempt.user_id).username
                    })
                    userids.append(attempt.user_id)

        return userid_attempts
    
    def retrieve_user_responses(self, user_id):
        """
            quiz_response: 
            {
                "filters": 
                        {
                            filter1: true,
                            filter2: true,
                            filter3: true
                        },
                "responses": [
                                {
                                    "question_number": question_number,
                                    "problem": problem,
                                    "answer": answer,
                                    "user_answer": answer
                                },
                                {
                                    "question_number": question_number,
                                    "problem": problem,
                                    "answer": answer,
                                    "user_answer": answer
                                },
                                {
                                    "question_number": question_number,
                                    "problem": problem,
                                    "answer": answer,
                                    "user_answer": answer
                                }
                            ]
            }
        """
        quiz_response = {
            "filters": [],
            "responses": []
        }

        # Get all the question and answers
        for question in self.questions: # -> QPA Objects
            for attempt in question.attempts: # -> Quiz_Attempt Objects
                quiz_response['responses'].append(
                    {
                        "question_number": question.question_number,
                        "problem": question.problem,
                        "answer": question.answer,
                        "user_answer": attempt.answer
                    }
                )
        
        quiz_response['filters'] = self.filters[0].to_dict()
        return quiz_response
    
    def from_dict(self, data: dict):
        fields = ['quiz_name', 'description']

        # changing quiz name and description
        for field in fields:
            if field in data:
                setattr(self, field, data[field])
        
        # changing start time
        if 'start_time' in data:
            print("Changing time....")
            self.add_time(data['start_time'])

        # changing question lists
        if 'questionList' in data:
            print("Changing Question Lists....")
            self.edit_questionSet(data['questionList'])

        return self

    # Dictionary converter Methods
    def to_dict(self):

        question_sets = list(self.question_sets)
        questionLists = []
        
        for i in range(len(question_sets)):
            questionLists.append(question_sets[i].to_dict())            
            
        data = {
            "id": self.id,
            "quiz_name": self.name,
            "start_time": self.get_time(),
            "userid": self.user.id,
            "questionLists": questionLists,
            "description": self.description,
            "link_generated": self.link_generated
        }
        
        return data
    
    def filter_quiz(self):
        questions = list(self.questions)
        for i in range(len(questions)):
            questions[i] = {
                'qaid': questions[i].qaid,
                'problem': questions[i].problem, 
                'question_number': questions[i].question_number
            }

        if len(questions) > 0:
            questions = Quiz.sort_questions(questions)

        data = {
            'id': self.id,
            'quiz_name': self.name,
            'start_time': self.get_time(),
            'questions': questions
        }

        return data

    # Question Methods
    def add_questions(self, questionList: list):
        """
            JSON Format:
            questionList: [
                    questionSet: {
                            schema: [File],
                            questions: [
                                {
                                    problem: problem,
                                    answer: answer,
                                    question_number: question_number
                                },
                                {
                                    problem: problem,
                                    answer: answer,
                                    question_number: question_number
                                }
                            ]
                        }
            ]
        """
        print("Adding questions... ")
        # Create empty qSet header. This points to the sceham
        # and the array of questions
        for qSetinList in questionList:
            print("Creating QuestionSet Header...")
            qSet:Quiz_QuestionSet = Quiz_QuestionSet(quizID = self.id)
            
            try:
                db.session.add(qSet)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise
                
            # schema
            if 'schema' in qSetinList:
                print("Adding Schema to QuestionSet....")
                b64data = qSetinList['schema'][0]['b64data']
                img_type = b64data[b64data.find('/') + 1:b64data.find(';')]

                img = Image.open(io.BytesIO(base64.b64decode(bytes(b64data[b64data.find(',') + 1:], 'utf-8'))))
                img.save("app\\schema_files\\{}_{}.{}".format(self.id, qSet.id, img_type))
                
                qSet.schema = "{}_{}.{}".format(self.id, qSet.id, img_type)
                
                try:
                    db.session.add(qSet)
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    raise
            
            # questions
            if 'questions' in qSetinList:
                print("Adding questions to QuestionSet....")
                for question in qSetinList['questions']:
                    questionObject:Quiz_QPA = Quiz_QPA(quiz_id = self.id,
                                                    questionSetID = qSet.id,
                                                    
                                                    question_number = question['question_number'],
                                                    problem = question['problem'],
                                                    answer = question['answer']
                                                    )
                    
                    db.session.add(questionObject)
                    
                try:
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    return Exception(e)
        
        return self.to_dict()
    
    def edit_questionSet(self, questionSets: list):
        for qSet in questionSets:
            print("Chaninging question Set...")
            
            existing = False
            questionSet = None
            # if existing question, retrieve ID
            if 'questionSet_ID' in qSet:
                questionSet:Quiz_QuestionSet = Quiz_QuestionSet.query.get(qSet['questionSet_ID'])
                print('Existing Set Detected: {}'.format(questionSet.id))
            else:
                questionSet:Quiz_QuestionSet = Quiz_QuestionSet(quizID = self.id)
                db.session.add(questionSet)
                db.session.commit()

            if not questionSet:
                raise Exception("QUESTION SET OBJECT NOT DEFINED")

            # changing schema
            if 'b64data' in qSet['schema'][0]:
                print("New Schemas Detected. Changing....")
                
                # New schema present
                b64data = qSet['schema'][0]['b64data']
                img_type = b64data[b64data.find('/') + 1:b64data.find(';')]

                img = Image.open(io.BytesIO(base64.b64decode(bytes(b64data[b64data.find(',') + 1:], 'utf-8'))))
                
                # save image using <quiz.id>_<questionSet.id>.<img_type>
                img.save("app\\schema_files\\{}_{}.{}".format(self.id, questionSet.id, img_type))
                
                questionSet.schema = "{}_{}.{}".format(self.id, questionSet.id, img_type)
                
            # changing questions
            for question in qSet['questions']:
                print("Changing question...")
                
                existing = False
                question_obj:Quiz_QPA = Quiz_QPA()
                # if existing question
                if 'qaid' in question:
                    question_obj:Quiz_QPA = Quiz_QPA.query.get(question['qaid'])
                    print("Existing question detected: {}".format(question_obj.qaid))
                    existing = True

                # Change all fields according to keys
                if 'question_number' in question:
                    question_obj.question_number = question['question_number']
                if 'problem' in question:
                    question_obj.problem = question['problem']
                if 'answer' in question:
                    question_obj.answer = question['answer']
                
                if not existing:
                    # set the quiz id, qaid is automatically generated
                    question_obj.quiz_id = self.id
                    question_obj.questionSetID = questionSet.id
                
                # add question changes to session
                try:
                    print("Added changes to question to db session...")
                    db.session.add(question_obj)
                except:
                    db.session.rollback()
                    raise
                
            # if the qSet doesn't exist, set the quizID
            if not existing:
                questionSet.quizID = self.id
        
            # add qSet changes at the end of loop
            try:
                print("Added changes to question Set to db session...")
                db.session.add(questionSet)
            except:
                db.session.rollback()
                raise
        
        try:
            print('Pushing Changes....')
            db.session.commit()
        except:
            db.session.rollback()
            raise
    
        print("Sucessfully Changed Question Sets for {}".format(self.id))

    # unused
    def edit_question(self, edited_questions: list):
        """
            edited_question = [
                {
                    'qaid': qaid, -> FIXED, CANNOT BE CHANGED
                    [OPTIONAL] 'question_number': question_number
                    [OPTIONAL] 'problem': problem,
                    [OPTIONAL] 'answer': answer
                },
                {
                    'qaid': qaid, -> FIXED, CANNOT BE CHANGED
                    [OPTIONAL] 'question_number': question_number
                    [OPTIONAL] 'problem': problem,
                    [OPTIONAL] 'answer': answer
                },
                {
                    'qaid': qaid, -> FIXED, CANNOT BE CHANGED
                    [OPTIONAL] 'question_number': question_number
                    [OPTIONAL] 'problem': problem,
                    [OPTIONAL] 'answer': answer
                }
            ]
        """
        for question in edited_questions:
            print("Changing question: {}".format(question['qaid']))
            # retrieve query object for each question changed
            question_object:Quiz_QPA = Quiz_QPA.query.filter_by(qaid=question['qaid']).first_or_404()
            
            # Change all fields according to keys
            if 'question_number' in question:
                question_object.question_number = question['question_number']
            if 'problem' in question:
                question_object.problem = question['problem']
            if 'answer' in question:
                question_object.answer = question['answer']

            db.session.add(question_object)
        db.session.commit()
        
        return self.to_dict()

    def delete_question(self, deleted_questions:list):
        """
            deleted_questions = [qaid, qaid, qaid]
        """
        for qaid in deleted_questions:
            question_object = Quiz_QPA.query.filter_by(qaid=qaid).first_or_404()
            db.session.delete(question_object)

        db.session.commit()
        return self.to_dict()

    def add_attempts(self, attempts, user_id):
        # attempts -> {'qaid': qaid, 'question_number': question_number, 'answer': answer}
        for attempt in attempts:
            print('Adding attempt: {}'.format(attempt))
            question_attempt = Quiz_Question_Attempts(question_id = attempt['qaid'],
                                                      user_id = user_id,
                                                      answer = attempt['answer'])
            
            db.session.add(question_attempt)
        db.session.commit()
        return self.to_dict()

    # Filter methods
    def add_filters(self, filters):
        """
            filters = {
                "matching_joins": True/False,
                "spell_check": True/False,
                "additional_data": True/False
            }
        """
        print("Adding Filters....")
        filter = Filters(quiz_id = self.id,
                         matching_joins = filters['matching_joins'],
                         spell_check = filters['spell_check'],
                         additional_data = filters['additional_data']
                        )

        db.session.add(filter)
        db.session.commit()

        return self.to_dict()

    @staticmethod
    def sort_questions(question_array: list):
        question_numbers = [x['question_number'] for x in question_array]
        n = len(question_numbers)

        for i in range(n):
            swapped = False

            for j in range(0, n-i-1):
                if question_numbers[j] > question_numbers[j+1]:
                    question_numbers[j], question_numbers[j+1] = question_numbers[j+1], question_numbers[j]
                    swapped = True

            if (swapped == False):
                break
        
        # match the question numbers to questions
        # and replace
        for i in range(len(question_numbers)):
            for j in question_array:
                if j['question_number'] == question_numbers[i]:
                    question_numbers[i] = j
                    break

        return question_numbers

class Quiz_QuestionSet(db.Model):
    __tablename__ = "Quiz_QuestionSet"

    # Fields
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    quizID = db.Column(db.String(32), db.ForeignKey('Quiz.id')) # FK -> Quiz 

    schema = db.Column(db.String(70))

    # relationships
    quiz = db.relationship('Quiz', back_populates='question_sets')
    questions = db.relationship('Quiz_QPA', back_populates='question_set')
    
    # Functions
    def __repr__(self):
        return "<Quiz_QuestionSet Quiz: {}, ID: {}>".format(self.quizID, self.id)
    
    def to_dict(self):
        data = {}
        data['schema'] = [url_for('quiz.retrieve_schema', img_name=self.schema, _external=True)]
        data['questions'] = []
        data['questionSet_ID'] = self.id
        data['quizID'] = self.quizID
        
        questions = self.questions
        for question in questions:
            data['questions'].append(question.to_dict())
            
        return data
                        

class Quiz_QPA(db.Model):
    # Table name
    __tablename__ = 'Quiz_QPA'

    # Fields
    qaid = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    quiz_id = db.Column(db.String(32), db.ForeignKey('Quiz.id')) # FK -> Quiz 
    questionSetID = db.Column(db.String(32), db.ForeignKey('Quiz_QuestionSet.id')) # FK -> QuestionSet

    question_number = db.Column(db.Integer)
    problem = db.Column(db.String(400))
    answer = db.Column(db.String(1000))

    # Relationships
    quiz = db.relationship('Quiz', back_populates='questions')
    question_set = db.relationship('Quiz_QuestionSet', back_populates='questions')
    attempts = db.relationship('Quiz_Question_Attempts', back_populates='question')

    # Functions
    def __repr__(self):
        return "<Quiz_QPA | ID: {}, \
               Quiz ID: {}, \
               Question Number: {}>".format(self.qaid, self.quiz_id, self.question_number)
    
    def from_dict(self, data: dict):
        fields = ['problem', 'answer']

        for field in fields:
            if field in data:
               setattr(self, field, data[field]) 

        return self

    def to_dict(self):
        data = {
            "qaid": self.qaid,
            "question_number": self.question_number,
            "problem": self.problem,
            "answer": self.answer,
            "quiz_id": self.quiz_id
        }
        return data
    
class Quiz_Question_Attempts(db.Model):
    # Table name
    __tablename__ = 'Quiz_Quiz_Attempts'

    # Fields
    attempt_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK

    question_id = db.Column(db.String(32), db.ForeignKey('Quiz_QPA.qaid')) # Fk
    user_id = db.Column(db.String(32), db.ForeignKey('Users.id')) # FK

    answer = db.Column(db.String(1000))
    score = db.Column(types.DECIMAL(5, 2))
    feedback = db.Column(db.String(1000))

    # Relationships
    question = db.relationship('Quiz_QPA', back_populates='attempts')


    # Functions    
    def __repr__(self):
        return "<Quiz Attempt | ID: {}, \
             User ID: {}, \
             Question Answer: {}, \
             Score: {}>".format(self.attempt_id, self.user_id, self.answer, self.score)

    def to_dict(self):
        data = {
            "attempt_id": self.attempt_id,
            "quiz_id": self.quiz_id,
            "ques_id": self.ques_id,
            "user_id": self.user_id,
            "answer": self.answer,
            "score": self.score
        }
        return data
    
class Filters(db.Model):
    # Table name
    __tablename__ = 'Filters'

    # Fields
    filter_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    quiz_id = db.Column(db.String(32), db.ForeignKey('Quiz.id'))

    matching_joins = db.Column(db.Boolean)
    spell_check = db.Column(db.Boolean)
    additional_data = db.Column(db.Boolean)

    quiz = db.relationship('Quiz', back_populates='filters')

    # Functions    
    def __repr__(self):
        return "<Filter | ID: {}, Matching Join: {}, Spell Check: {}, Additional Data: {}>" \
                .format(self.filter_id, self.matching_joins, self.spell_check, self.additional_data)

    def to_dict(self):
        data = {
            "filter_id": self.filter_id,
            "matching_joins": self.matching_joins,
            "spell_check": self.spell_check,
            "additional_data": self.additional_data
        }
        return data

class Animation(db.Model):
    # Table name
    __tablename__ = 'animation'

    # Fields
    ani_id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid) # PK
    userid = db.Column(db.String(32), db.ForeignKey('Users.id')) # Fk

    animation_name = db.Column(db.String(100))
    query = db.Column(db.String(500))
    schema_id = db.Column(db.Integer)
    
    user = db.relationship('Users', back_populates='animations')

    # Functions    
    def __repr__(self):
        return "<Animation | ID: {}, \
             User ID: {}, \
             Query: {}>".format(self.ani_id, self.userid, self.query)

    def to_dict(self):
        data = {
            "ani_id": self.ani_id,
            "user_id": self.userid,
            "query": self.query,
            "schema_id": self.schema_id,
            "animation_name": self.animation_name
        }
        return data

