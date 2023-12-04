from ..user import user_bp
from flask import request, jsonify, url_for
from flask_jwt_extended import create_access_token, create_refresh_token, \
                               jwt_required, \
                               set_access_cookies, unset_jwt_cookies, set_refresh_cookies, \
                               get_jwt_identity
from flask_cors import cross_origin


from ..main.errors import bad_request, error_response
from ...extensions import db
from flask_cors import cross_origin
from ...database.models.models import Users

from flask import Response, current_app
import logging

def set_cookies(response: Response, access_token, refresh_token):
    """
        Modifies provided response object to set cookies on client side
        cookies set:
            id: username
            expires: expiration time
    """
    # JWT Tokens
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    
def unset_cookies(response: Response):
    """
        Unsets cookies from client side
    """
    # JWT Tokens
    unset_jwt_cookies(response)

@user_bp.route('/', methods=['POST'])
def register_user():
    """
        create_user function recieves a JSON request following this format:\n
        {
                                "fullname": fullname
            [REQUIRED] [UNIQUE] "username": "username"\n
            [REQUIRED] [UNIQUE] "email": "email@test.com",\n
            [REQUIRED]          "password": "password"\n,
                                "account_type": account-type,
                                "gender": gender
        }

        Error handling checks if the mandatory fields are present and if it already exists in the database. 
        If it passes through the error handling, new User object is created using the function ``User.from_dict()``.

        Returns URL to newly created user resource
        Code: 201 (Created Sucess)
    """
    # Retrieve JSON body from request or set empty json 
    data = request.get_json() or {}

    # Checking if mandatory fields are present -> return error if not
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('must include username, email and password')
    
    # Checking if data already in use by another account
    if Users.query.filter_by(username=data['username']).first():
        return bad_request('EUNIDB') # please enter a different username
    if Users.query.filter_by(email=data['email']).first():
        return bad_request('EEMIDB') #please use a different email
    
    # Create new user if above checks pass
    user:Users = Users().from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()

    # Return valid response for successful object creation
    response = jsonify(user.to_dict())
    response.status_code = 201
    
    # Set location to URL for new resource
    response.headers['Location'] = url_for('user.get_user', username=user.username)
    return response

@user_bp.route('/login/', methods=['POST'])
def login():
    """
        Retrieves a JSON object in the form:\n
        {
            [REQUIRED] "email": value,\n
            [REQUIRED] "password": value
        }

        Error handling checks if the required fields are present and if the user exists.
        If the user exists and password is correct, create a JWT Access Token and bind current user 
        to the email. This stores the email in the ``current_user`` variable

        After that, it modifies the response object to set the access token & CSRF token as cookies
        and returns the response object to the client.

        If the credentials are invalid, return 401 code for invalid credentials.
    """
    data = request.get_json() or {}

    if 'email' not in data or 'password' not in data:
        return bad_request('must include email and password')

    # Check if user present in database using email
    try:
        user:Users = Users.query.filter_by(email=data['email']).first()
        
        # User not found
        if not user:
            return error_response(404, 'ACNF01')
    except Exception as e:
        return error_response(500, 'Internal server error. Error: ' + str(e))

    # If user present and password match, login user
    if user and user.check_password(data['password']):
        # Sets the ID as email
        access_token = create_access_token(identity=data["email"])
        refresh_token = create_refresh_token(identity=data["email"])

        response = jsonify({
            "message": "login successful",
            "user": user.to_dict()
        })

        # Modify response object for cookies
        set_cookies(response, access_token, refresh_token)

        return response
    else:
        return error_response(401, 'INEP01')
    
@user_bp.route('/logout/', methods=['POST'])
@jwt_required()
def logout():
    """
        logout function unsets the JWT and CSRF tokens from the client's cookies, thus logging them out of the server
    """
    response = jsonify({"msg": "logout successful"})
    unset_cookies(response)
    return response

@user_bp.route('/load_user/', methods=['GET'])
@jwt_required()
def get_user():
    """
        Returns requested user as JSON object if user found or
        returns 404 code if user doesn't exist. 
    """
    current_user = get_jwt_identity()
    user: Users = Users.query.filter_by(email=current_user).first_or_404()
    return jsonify(user.to_dict())

@user_bp.route('/id/<username>/', methods=['PUT'])
@jwt_required()
def update_user(username:str):
    """
        update_user function recieves a response object following this format:\n 
        {
            [OPTIONAL] "fullname"
            [OPTIONAL] "username": "username",\n
            [OPTIONAL] "email": "email"\n
            [OPTIONAL] "current_password": "current_password"
            [OPTIONAL] "new_password": "new_password"
        }

        Error handling checks if the new username/email aren't the same as
        current and arent already in use.

        If passes error handling, the user's details are changed using ``User.from_dict()``.

        Returns updated resource representation
        Code: 200 (OK)
    """
    try:
        user:Users = Users.query.filter_by(username=username).first()
    except Exception as e:  
        return error_response(500, 'Internal server error. Error: ' + str(e))
    data = request.get_json() or {}

    # Checking if the new data already exists in the database
    # but as each field is optional, first check if the fields 
    # exist in response object & not same 
    if 'username' in data and data['username'] != user.username and \
            Users.query.filter_by(username=data['username']).first():
        return bad_request('please use a different username')
    if 'email' in data and data['email'] != user.email and \
            Users.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email')

    # change user data 
    user.from_dict(data, new_user=False)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return error_response(500, 'Internal server error. Error: ' + str(e))

    # return new user resource represnetation
    return url_for('user.get_user', username=user.username)

@user_bp.route('/id/<username>/', methods=['DELETE'])
@jwt_required()
def delete_user(username:str):
    """
        delete_user fetches a user using their ``username`` and 
        deletes the resource from the database.
        Also logs out user
    """
    # Deletes user resource from database
    try:
        user:Users = Users.query.filter_by(username=username).first()
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return error_response(500, 'Internal server error. Error: ' + str(e))

    response = jsonify({
        "message": "account has been successfully deleted" 
    })

    # Logout user
    unset_cookies(response)

    return response
