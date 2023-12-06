from flask import request, jsonify, url_for
from datetime import datetime

from . import quiz_bp

from app.database.models.models import Quiz, Users, Quiz_QPA, Quiz_Question_Attempts
from ...extensions import db
from ..main.errors import bad_request, error_response

from flask_jwt_extended import jwt_required, get_jwt_identity

@quiz_bp.route("/retrieve-quizzes", methods=['GET'])
@jwt_required()
def retrieve_quizzes():
    # get user account
    email = get_jwt_identity()
    user:Users = Users.query.filter_by(email=email).first_or_404()

    # retrieve all their quizzes
    return user.retrieve_quizes()

@quiz_bp.route("/retrieve-quiz/<quiz_id>", methods=['GET'])
@jwt_required()
def retrieve_quiz(quiz_id):
    quiz:Quiz = Quiz.query.filter_by(id=quiz_id).first_or_404()
    return quiz.to_dict()

@quiz_bp.route("/retrieve-filtered-quiz/<quiz_id>", methods=['GET'])
@jwt_required()
def retrieve_filtered_quiz(quiz_id):
    quiz:Quiz = Quiz.query.filter_by(id=quiz_id).first_or_404()
    return quiz.filter_quiz()

@quiz_bp.route("/", methods=['POST'])
@jwt_required()
def create_quiz():
    """
        JSON Format:
        {
            [REQUIRED] "quiz_name": "name": str,
            [REQUIRED] "start_time": "time": str,
            [OPTIONAL] "description": description
            [JWT-IDENTITY] "user_id": "id": str,

            [OPTIONAL] "questions": [
                            {
                                'question_number': question_number,
                                'problem': problem, 
                                'answer': answer
                            }, 
                            {
                                'question_number': question_number,
                                'problem': problem, 
                                'answer': answer
                            }]

            [REQUIRED] "filters":   {
                                        "matching_join": False,
                                        "spell_checker": False,
                                        "punish_add_data": False
                                    }

            [OPTIONAL] "img_data": img_data
        }
    """
    data = request.get_json() or {}

    # Checking if required fields present in json request
    if 'quiz_name' not in data or 'start_time' not in data:
        return bad_request('must include quiz name, start time and user id')
    
    # retrieve the user ID
    email = get_jwt_identity()
    user:Users = Users.query.filter_by(email=email).first_or_404()

    # Create new response
    quiz = None
    quiz:Quiz = Quiz(name = data['quiz_name'], 
                     description = data['description'],
                     userid = user.id)
    
    quiz.add_time(data['start_time'])
    db.session.add(quiz)
    db.session.commit()
    
    if 'questions' in data:
        quiz.add_questions(data['questions'])

    # Handle the 'schema' field if it's present
    if 'schema' in data:
        quiz.schema = data['schema']

    # Create response and add quiz object
    response = jsonify(quiz.to_dict())
    response.status_code = 201

    # Set Location header to new resource
    response.headers['Location'] = url_for('quiz.retrieve_quiz', quiz_id=quiz.id)
    return response
    
@quiz_bp.route("/add-question/", methods=['PUT'])
@jwt_required()
def add_quiz_question():
    """
        JSON Format:
        {
            [REQUIRED] "quiz_id": quiz_id,
            "questions": [
                {
                    "question_number": question_number,
                    "problem": problem,
                    "answer": answer
                }
            ]
        }
    """
    data = request.get_json() or {}
    REQUIRED_KEYS = ['quiz_id', 'questions']

    # Checking if required fields are present in the JSON request
    if not all(KEY in data for KEY in REQUIRED_KEYS):
        return bad_request('must include quiz_id, problem and answer')

    quiz:Quiz = Quiz.query.get_or_404(id=data['quiz_id'])

    # Create a new quiz question and add it to the quiz
    quiz.add_questions(data['questions'])

    # Create a response with the added question
    response = jsonify(quiz.to_dict())
    response.status_code = 201

    # Set Location header to the new resource
    response.headers['Location'] = url_for('quiz.retrieve_quiz', quiz_id=quiz.id)
    return response

@quiz_bp.route("/edit-question/", methods=['PUT'])
@jwt_required()
def edit_quiz_question():
    """
        JSON Format:
        {
            [REQUIRED] 'quiz_id': quiz_id,
            'edited_questions = [
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
        }
    """
    data = request.get_json() or {}

    # Find the quiz associated with quiz_id
    quiz:Quiz = Quiz.query.get_or_404(data['quiz_id'])
    
    # Find the quiz question associated with qaid
    quiz.edit_question(data['edited_questions'])

    # Create a response with the updated question
    response = jsonify(quiz.to_dict())
    response.status_code = 200

    return response

@quiz_bp.route("/delete-question", methods=['DELETE'])
@jwt_required()
def delete_quiz_question():
    """
        JSON Format:
        {
            'quiz_id': quiz_id
            'deleted_questions': [qaid, qaid, qaid]
        }
    """
    data = request.get_json() or {}

    quiz:Quiz = Quiz.query.filter_by(id=data['quiz_id']).first_or_404()
    quiz.delete_question(data['deleted_questions'])

    response = jsonify(quiz.to_dict())
    response.status_code = 200

    return response 

@quiz_bp.route("/submit-response", methods=['POST'])
@jwt_required()
def submit_response():
    """
        {
            "quiz_id": quiz_id,
            "response": [
                {
                    "qaid": qaid,
                    "question_number": question_number,
                    "answer": answer
                },
                {
                    "qaid": qaid,
                    "question_number": question_number,
                    "answer": answer
                }
            ]
        }
    """
    data = request.get_json() or {}
    REQUIRED_KEYS = ['quiz_id', 'response']

    # check for fields
    if not all(KEY in data for KEY in REQUIRED_KEYS):
        return bad_request('Malformed request object. Required keys: quiz_id, response')

    # get user id
    user_identity = get_jwt_identity() # LEARNER IDENTITY
    user:Users = Users.query.filter_by(email=user_identity).first_or_404()

    # get quiz object
    quiz:Quiz = Quiz.query.filter_by(id=data['quiz_id']).first_or_404()
    quiz.add_attempts(data['response'], user.id)

    return jsonify(
        {
            'message': "responses submitted successfully"
        }
    )

