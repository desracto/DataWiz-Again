# do not import anything from here please
# cyclical imports are bad

from flask import Flask
from config import Config
from flask_cors import CORS
from .extensions import register_app

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    register_app(app)
    
    # Main blueprint
    from app.blueprints.main import main_bp
    app.register_blueprint(main_bp, url_prefix="/api/main/")

    # Auth Blueprint
    from app.blueprints.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth/")

    # User Blueprint
    from app.blueprints.user import user_bp
    app.register_blueprint(user_bp, url_prefix="/api/user/")

    # Animation Blueprint
    from app.blueprints.animation import animation_bp 
    app.register_blueprint(animation_bp, url_prefix="/api/animation/")

    # Quiz Blueprint
    from app.blueprints.quiz import quiz_bp
    app.register_blueprint(quiz_bp, url_prefix="/api/quiz/")

    return app


