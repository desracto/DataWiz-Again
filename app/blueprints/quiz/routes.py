from flask import request, jsonify, url_for
from datetime import datetime

from . import quiz_bp

from app.models import Quiz, Users
from ...extensions import db
from ..main.errors import bad_request, error_response

@quiz_bp.route("/user/<username>/retrieve-quizzes", methods=['GET'])
def retrieve_quizes(username):
    user:Users = Users.query.filter_by(username=username).first()
    return user.quizzes

@quiz_bp.route("/user/<userid>/quiz/<quiz_id>/", methods=['GET'])
def retrieve_quiz(userid, quiz_id):
    user:Users = Users.query.get_or_404(userid)
    quizzes = user.quizzes
    for quiz in quizzes:
        if quiz_id in quiz:
            return quiz

@quiz_bp.route("/", methods=['POST'])
def create_quiz():
    """
        JSON Format:
        {
            [REQUIRED] "quiz_name": "name": str,
            [REQUIRED] "start_time": "time": str,
            [REQUIRED] "user_id": "id": str,

            [OPTIONAL] "question": [[problem, answer], [problem, answer]]: array,
            [OPTIONAL] "schema"
        }
    """
    data = request.get_json() or {}

    # Checking if required fields present in json request
    if 'quiz_name' not in data or 'start_time' not in data or 'user_id' not in data:
        return bad_request('must include quiz name, start time and user id')
    
    # Create new response
    try:
        quiz:Quiz = Quiz(name=data['quiz_name'], start_time=datetime.strptime(data['start_time'], "%d/%m/%y "))
        
        # Check if optional fields present
        
        
        db.session.add(quiz)
        db.session.commit(quiz)
    except:
        error_response(500, 'internal server error')

    # Create response and add quiz object
    response = jsonify(quiz.to_dict())
    response.status_code = 201

    # Set Location header to new resource
    response['Location'] = url_for('quiz.retrieve_quiz', quiz_id=quiz.id)
    return response
    
@quiz_bp.route("quiz/<quiz_id>/add_question/", methods=['PUT'])
def add_quiz_question(quiz_id):
    pass

@quiz_bp.route("<quiz_id>/question/<qaid>/edit_question", methods=['PUT'])
def edit_quiz_question(quiz_id, qaid):
    pass

@quiz_bp.route("<quiz_id>/question/<qaid>/edit_question", methods=['PUT'])
def edit_quiz_answer(quiz_id, qaid):
    pass

@quiz_bp.route("/<quiz_id>/question/<qaid>/delete_question/", methods=['DELETE'])
def delete_quiz_question(quiz_id, qaid):
    pass

