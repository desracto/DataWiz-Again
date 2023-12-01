from app import create_app
from app.extensions import db  

from app.blueprints.animation.scripts.generator import generate_prefixed, retrieve_schema

from app.models import Users
from app.models import Quiz
from app.models import Quiz_QPA
from sqlalchemy import text

# creates app and enables extensions
app = create_app()

def query(query: str):
    return db.session.execute(text(query))

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 
            "generate_prefixed": generate_prefixed,
            'query': query,

            # Models
            "User": Users,
            "Quiz": Quiz,
            "Quiz_QPA": Quiz_QPA
            }