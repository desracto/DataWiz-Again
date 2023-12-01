import os
from datetime import timedelta
from logging.config import dictConfig

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = 'f@n_|^Is"6zHto-edhd@Q+}jtYpDm$<<'
    DEBUG = True
    FRONTEND_DOMAIN = 'http://localhost:3000/'

    # Flask-Migrate
    MIGRATION_DIR = os.path.join(basedir, 'app\\database\\migrations')

    # Flask-SQLAlchemy
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql://avnadmin:AVNS_RpJJfd42UmhF5jXnw0n@dw-users-datawiz-users.a.aivencloud.com:27940/defaultdb'
    
    SQLALCHEMY_BINDS = {
        "prefixed": "sqlite:///" + os.path.join(basedir, "app\\database\\db_files\\prefixed_sc.db"),
        "prefixed_mysql": "mysql://avnadmin:AVNS_RpJJfd42UmhF5jXnw0n@dw-users-datawiz-users.a.aivencloud.com:27940/prefixed_db"
        }

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # Flask-JWT-Extended
    JWT_SECRET_KEY = 'sic-1/)to06#WV$~XB;u,JO=#%AmXV+b'
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_COOKIE_SECURE = False




