import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = 'f@n_|^Is"6zHto-edhd@Q+}jtYpDm$<<'
    DEBUG = True

    # Flask-Migrate
    MIGRATION_DIR = os.path.join(basedir, 'app\\database\\migrations')

    # Flask-SQLAlchemy
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app\\database\\db_files\\main.db')
    
    SQLALCHEMY_BINDS = {
        "prefixed": "sqlite:///" + os.path.join(basedir, "app\\database\\db_files\\prefixed_sc.db")
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # Flask-JWT-Extended
    JWT_SECRET_KEY = 'sic-1/)to06#WV$~XB;u,JO=#%AmXV+b'
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)