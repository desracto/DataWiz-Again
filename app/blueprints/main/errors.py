from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES

def error_response(status_code, message=None):
    """
        Returns a response object with the provided status code and 
        relevant message from the HTTP_STATUS_CODES dictionary.

        If a message is provided, it 
    """
    payload = {
        'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')
    }
    if message:
        payload['message'] = message
    response = jsonify(payload)
    response.status_code = status_code
    return response

def bad_request(message):
    return error_response(400, message)