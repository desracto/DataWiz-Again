from ...extensions import db
from flask_sqlalchemy.session import Session
from sqlalchemy.engine import Connection
from sqlalchemy import text


def create_prefixed_connection():
    prefixed_session = Session(db).get_bind(bind=db.get_engine('prefixed'))
    return prefixed_session.connect()

def retrieve_query_results(animation_steps, conn: Connection):
    step_results = []
    for step in animation_steps:
        step_result = []
        rows = conn.execute(text(step))
        for row in rows:
            step_result.append(row)
        
        step_results.append(step_result)

    return step_results






