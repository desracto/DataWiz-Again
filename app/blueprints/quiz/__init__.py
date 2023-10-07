from flask import Blueprint

quiz_bp = Blueprint('quiz', __name__)

from app.blueprints.quiz import routes