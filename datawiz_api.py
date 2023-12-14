from app import db, create_app
from app.blueprints.animation.scripts.generator import generate_prefixed, retrieve_schema

from app.models import Users
from app.models import Quiz
from app.models import Quiz_QA
app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 
            "generate_prefixed": generate_prefixed,

            # Models
            "User": Users,
            "Quiz": Quiz,
            "Quiz_QA": Quiz_QA
            }

print("Rida Asif", 7057167)
print("Muhammad Tehami Nadeem", 6925133)