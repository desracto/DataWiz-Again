from flask_sqlalchemy import SQLAlchemy
db:SQLAlchemy = SQLAlchemy()

from flask_migrate import Migrate
migrate:Migrate = Migrate()

from flask_jwt_extended import JWTManager
jwt:JWTManager = JWTManager()

from flask_cors import CORS
cors:CORS = CORS()

def register_app(app):

    # extensions
    db.init_app(app)
    migrate.init_app(app, db, app.config["MIGRATION_DIR"])
    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True)
