from app import create_app
from app.extensions import db  

from app.blueprints.animation.scripts.generator import generate_prefixed, retrieve_schema

from app.database.models.models import Users
from app.database.models.models import Quiz
from app.database.models.models import Quiz_QPA
from sqlalchemy import text


# creates app and enables extensions
app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 
            "generate_prefixed": generate_prefixed,

            # Models
            "User": Users,
            "Quiz": Quiz,
            "Quiz_QA": Quiz_QPA
            }

print("Rida Asif", 7057167)
print("Muhammad Tehami Nadeem", 6925133)
