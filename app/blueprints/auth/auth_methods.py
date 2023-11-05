from . import auth_bp
from flask_jwt_extended import get_jwt, create_access_token, get_jwt_identity, set_access_cookies, create_refresh_token, set_refresh_cookies
from flask import jsonify
from datetime import datetime, timedelta

@auth_bp.after_request
def refresh_expiring_jwts(response):
    """
        Refreshes any token which will expire in 30 minutes
    """
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.utcnow()
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            refresh_token = create_refresh_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
        return response
    except (RuntimeError, KeyError):
        return response
