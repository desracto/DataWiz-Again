from flask import Blueprint

animation_bp = Blueprint('animation', __name__)

from app.blueprints.animation import routes