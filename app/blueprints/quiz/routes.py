from flask import request, jsonify, url_for
from datetime import datetime

from . import quiz_bp

from app.database.models.models import Quiz, Users, Quiz_QPA
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
            [JWT-IDENTITY] "user_id": "id": str,

            [OPTIONAL] "question": [{'question': problem, 'answer': answer}, {'question': problem, 'answer': answer}]: array
            [OPTIONAL] "img_data": img_data
        }
    """
    data = request.get_json() or {}

    # Checking if required fields present in json request
    if 'quiz_name' not in data or 'start_time' not in data:
        return bad_request('must include quiz name, start time and user id')
    
    # retrieve the user ID
    user:Users = Users.query.filter_by(email=get_jwt_identity()).first_or_404()

    # Check if time is valid
    # DO THIS

    # Create new response
    quiz = None
    quiz:Quiz = Quiz(name=data['quiz_name'], userid=user.id)
    quiz.add_time(data['start_time'])
    
    # Check if optional fields present
    # Handle the 'question' field if it's present
    if 'question' in data:
        for question in data['question']:
            quiz_question = Quiz_QPA(problem=question['question'], answer=question['answer'])
            quiz.questions.append(quiz_question)

    # Handle the 'schema' field if it's present
    if 'schema' in data:
        quiz.schema = data['schema']
    
    db.session.add(quiz)
    db.session.commit()
    
    # Create response and add quiz object
    response = jsonify(quiz.to_dict())
    response.status_code = 201

    # Set Location header to new resource
    response.headers['Location'] = url_for('quiz.retrieve_quiz', quiz_id=quiz.id)
    return response
    
@quiz_bp.route("/<quiz_id>/add_question/", methods=['PUT'])
def add_quiz_question(quiz_id):
    """
        JSON Format:
        {
            [REQUIRED] "problem": str,
            [REQUIRED] "answer": str
        }
    """
    data = request.get_json() or {}

    # Checking if required fields are present in the JSON request
    if 'problem' not in data or 'answer' not in data:
        return bad_request('must include problem and answer')

    quiz:Quiz = Quiz.query.get_or_404(quiz_id)

    # Create a new quiz question and add it to the quiz
    question = Quiz_QPA(qaid=2, problem=data['problem'], answer=data['answer'], quiz_id=quiz_id)
    db.session.add(question)
    db.session.commit()

    # Create a response with the added question
    response = jsonify(quiz.to_dict())
    response.status_code = 201

    # Set Location header to the new resource
    response.headers['Location'] = url_for('quiz.retrieve_quiz', quiz_id=quiz.id)
    return response

@quiz_bp.route("<quiz_id>/question/<qaid>/edit_question", methods=['PUT'])
def edit_quiz_question(quiz_id, qaid):
    """
        JSON Format:
        {
            [OPTIONAL] "problem": str,
            [OPTIONAL] "answer": str
        }
    """
    data = request.get_json() or {}

    # Find the quiz associated with quiz_id
    quiz = Quiz.query.get_or_404(quiz_id)
    
    # Find the quiz question associated with qaid
    question = Quiz_QPA.query.get(qaid)
    if not question:
        return error_response(404, 'Quiz not found')
    
    # Check if optional fields 'problem' and 'answer' are present in the JSON request
    if 'problem' in data:
        # Update the problem field if it's present
        question.problem = data['problem']

    if 'answer' in data:
        # Update the answer field if it's present
        question.answer = data['answer']

    db.session.commit()

    # Create a response with the updated question
    response = jsonify(question.to_dict())
    response.status_code = 200

    return response

@quiz_bp.route("/<quiz_id>/question/<qaid>/delete_question/", methods=['DELETE'])
def delete_quiz_question(quiz_id, qaid):
    try:
        # Retrieve the quiz associated with quiz_id; raise a 404 error if not found
        quiz = Quiz.query.get_or_404(quiz_id)

        # Find the quiz question associated with qaid
        question = Quiz_QPA.query.get(qaid)
        if not question:
            return error_response(404, 'Quiz question not found')

        # Remove the question from the quiz
        db.session.delete(question)
        db.session.commit()

    except:
        error_response(500, 'internal server error')

    return '', 204

@quiz_bp.route("/<quiz_id>/<user_id>/submit-response", methods=['POST'])
def submit_response(quiz_id):
    pass