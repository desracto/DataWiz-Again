from flask_sqlalchemy import SQLAlchemy
db:SQLAlchemy = SQLAlchemy()

from flask_migrate import Migrate
migrate:Migrate = Migrate()

from flask_jwt_extended import JWTManager
jwt:JWTManager = JWTManager()

from flask_cors import CORS
cors:CORS = CORS()
