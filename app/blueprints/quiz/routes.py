from flask import request, jsonify, url_for, send_file
from datetime import datetime
import urllib.request as requests
from flask_accept import accept
import io, base64
from PIL import Image

from . import quiz_bp

from app.database.models.models import Quiz, Users, Quiz_QPA, Quiz_QuestionSet, Quiz_Question_Attempts
from ...extensions import db
from ..main.errors import bad_request, error_response

from flask_jwt_extended import jwt_required, get_jwt_identity

import os

@quiz_bp.route("/retrieve-quizzes/", methods=['GET'])
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

@quiz_bp.route("/retrieve-filtered-quiz/<quiz_id>/", methods=['GET'])
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
                                "schema": [File],
                                "questions": [
                                    {
                                        "problem": problem,
                                        "answer": answer,
                                        "question_number": question_number
                                    },
                                    {
                                        "problem": problem,
                                        "answer": answer,
                                        "question_number": question_number
                                    }
                                ]
                            },
                            {
                                "schema": [File],
                                "questions": [
                                    {
                                        "problem": problem,
                                        "answer": answer,
                                        "question_number": question_number
                                    },
                                    {
                                        "problem": problem,
                                        "answer": answer,
                                        "question_number": question_number
                                    }
                                ]
                            }
                        ]
            [REQUIRED] "filters":   {
                                        "matching_join": False,
                                        "spell_check": False,
                                        "additional_data": False
                                    }

            [OPTIONAL] "img_data": img_data
        }
    """
    data = request.get_json() or {}

    # Field checks
    if 'quiz_name' not in data or 'start_time' not in data or 'description' not in data:
        return bad_request('must include quiz_name, description, start_time in request object')
    
    # retrieve user ID
    email = get_jwt_identity()
    user:Users = Users.query.filter_by(email=email).first_or_404()

    # Create Quiz header 
    quiz:Quiz = Quiz(name=data['quiz_name'],
                     description=data['description'],
                     userid = user.id)
    quiz.add_time(data['start_time'])
    
    db.session.add(quiz)
    db.session.commit()

    # if questions present
    if 'questionList' in data:
        quiz.add_questions(data['questionList'])

    if 'filters' in data:
        quiz.add_filters(data['filters'])

    # # Create response and add quiz object
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

@quiz_bp.route("/delete-quiz", methods=['DELETE'])
@jwt_required()
def delete_quiz():
    """
        JSON Format:
        request: {
            "quiz_id": quiz_id
        }
    """
    data = request.get_json() or {}

    if 'quiz_id' not in data:
        return bad_request("must include quiz ID in request")

    quiz:Quiz = Quiz.query.get_or_404(data['quiz_id'])
    db.session.delete(quiz)
    db.session.commit()

    response = {
        "msg": "quiz sucessfully deleted"
    }
    response = jsonify(response)
    response.status_code = 200

    return response

@quiz_bp.route("/change-link-generated/", methods=['PUT'])
@jwt_required()
def change_link_generated():
    """
        JSON Format
        request: {
            "quiz_id": quiz_id
        }
    """
    data = request.get_json() or {}
    if 'quiz_id' not in data:
        return bad_request("must include quiz_id in request")
    
    quiz:Quiz = Quiz.query.get_or_404(data['quiz_id'])
    quiz.link_generated = True

    try:
        db.session.add(quiz)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return error_response(500, "Error handling request" + str(e))
    
    response = {
        "msg": "sucessfully updated link_generated to TRUE"
    }
    response = jsonify(response)
    response.status_code = 204 # no redirect

    return response

@quiz_bp.route("/edit-quiz/", methods=['PUT'])
@jwt_required()
def edit_quiz():
    """
        JSON Format
        request: {
            "id": id,
            "quiz_name": quiz_name,
            "start_time": start_time,
            "description": description,
            "questionLists": [
                {
                    "schema": [Binary Data] / [URL Preview],
                    "questions": [                
                        {
                                "problem": problem,
                                "answer": answer,
                                "qaid": qaid,
                                "question_number": question_number
                            },
                            {
                                "problem": problem,
                                "answer": answer,
                                "qaid": qaid,
                                "question_number": question_number
                            }
                        ]
                }...

            ]
        }
    """
    data = request.get_json() or {}

    # check for fields
    
    # retrieve quiz object
    quiz:Quiz = Quiz.query.get_or_404(data['id'])
    quiz.from_dict(data)

    db.session.add(quiz)
    db.session.commit()

    response = {
        "msg": "quiz object updated sucessfully"
    }

    response = jsonify(response)
    response.status_code = 204

    return response

@quiz_bp.route("/add-filter/", methods=['PUT'])
@jwt_required()
def add_filter():
    """
        {
            "quiz_id": quiz_id
        }
    """
    pass

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
            'msg': "responses submitted successfully"
        }
    )

# reoute for retriving all unique user attempts
@quiz_bp.route("/retrieve-userid-attempts", methods=['GET'])
@jwt_required()
def retrieve_user_id_attempts():
    """
        JSON Formats

        Request Format:
        ```Python
        request: {
            "quiz_id": quiz_id
        }
        ```

        Return format:
        ```Python
        response: {
            "users": [
                {
                    "user_id": user_id,
                    "username": username
                },
                {
                    "user_id": user_id,
                    "username": username
                }....
            ]
        }
    """
    data = request.get_json() or {}

    # retrieve user object
    user:Users = Users.query.filter_by(email=get_jwt_identity()).first_or_404()

    # retrieve quiz 
    quiz:Quiz = Quiz.query.get_or_404(data['quiz_id'])

    # retrieve all userid attempts
    userid_attempts = quiz.retrieves_all_userid_responses()

    return jsonify({
        "users": userid_attempts
    })

# route for auto-grading
@quiz_bp.route("/retrieve-user-response", methods=['GET'])
@jwt_required()
def retrieve_user_response():
    """
        JSON Formats\n
        ``Request Object``
        ```Python
        request: {
            "user_id": user_id,
            "quiz_id": quiz_id
        }
        ```
    """
    data = request.get_json() or {}

    # Retrieve quiz object
    quiz:Quiz = Quiz.query.get_or_404(data['quiz_id'])

    # Retrieve all user responses
    quiz_responses = quiz.retrieve_user_responses(data['user_id'])

    return jsonify({
        "quiz_responses": quiz_responses
    })

@quiz_bp.route('/retrieve-schema/<img_name>')
def retrieve_schema(img_name):
    return send_file('schema_files\\{}'.format(img_name))

