from app.blueprints.animation import animation_bp

from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from ...extensions import db

from ...database.models.models import Users, Animation

from ..main.errors import bad_request, error_response
from .scripts.generator import generate_prefixed

from ...database.models._prefixed_models import Schema1_Employee as Employee, \
                                                Schema2_Product as Product, Schema2_Inventory as Inventory, \
                                                Schema3_Course as Course, Schema3_Enrollment as Enrollment, \
                                                Schema4_Flight as Flight, Schema4_Passenger as Passenger, Schema4_Ticket as Ticket, \
                                                Schema5_Album as Album, Schema5_Artist as Artist, Schema5_Genre as Genre, Schema5_Song as Song
                                                
from ...scripts.animation_parser import retrieve_query_results

@animation_bp.route('/schema/1/')
def schema1():
    results = {}
    employees = Employee.query.all()

    # Prefixed database not generated
    if employees is None:
        generate_prefixed(1)
    
    emps_json = []
    for emp in employees:
        emps_json.append(emp.as_dict())
    
    results = {
        "employee": emps_json
    }
    return jsonify(results=results)

@animation_bp.route('/schema/2/')
def schema2():
    products = Product.query.all()
    invens = Inventory.query.all()

    # Prefixed database not generated
    if products is None or invens is None:
        generate_prefixed(2)

    prods_json = []
    for prod in products:
        prods_json.append(prod.as_dict())
    
    invens_json = []
    for inv in invens:
        invens_json.append(inv.as_dict())

    results = {
        'product': prods_json,
        'inventory': invens_json
    }

    return jsonify(results=results)

@animation_bp.route('/schema/3/')
def schema3():
    course = Course.query.all()
    enrollments = Enrollment.query.all()

    # Prefixed database not generated
    if len(course) == 0 or len(enrollments) == 0:
        generate_prefixed(3)

    course_json = []
    for course in course:
        course_json.append(course.as_dict())
    
    enrolls_json = []
    for enroll in enrollments:
        enrolls_json.append(enroll.as_dict())

    results = {
        'course': course_json,
        'enrollment': enrolls_json
    } 

    return jsonify(results=results)

@animation_bp.route('/schema/4/')
def schema4():
    flights = Flight.query.all()
    passengers = Passenger.query.all()
    tickets = Ticket.query.all()

    # Prefixed database not generated
    if len(flights) == 0 or len(passengers) == 0 or len(tickets) == 0:
        generate_prefixed(4)
    
    flights_json = []
    for flight in flights:
        flights_json.append(flight.as_dict())
    
    passengers_json = []
    for passenger in passengers:
        passengers_json.append(passenger.as_dict())
    
    tickets_json = []
    for ticket in tickets:
        tickets_json.append(ticket.as_dict())

    results = {
        'flight': flights_json,
        'passenger': passengers_json,
        'ticket': tickets_json
    }

    return jsonify(results=results)

@animation_bp.route('/schema/5/')
def schema5():
    albums = Album.query.all()
    genres = Genre.query.all()
    songs = Song.query.all()
    artists = Artist.query.all()

    if len(albums) == 0 or len(genres) == 0 or len(songs) == 0 or len(artists) == 0:
        generate_prefixed(5)
    
    albums_json = []
    for album in albums:
        albums_json.append(album.as_dict())
    
    genres_json = []
    for genre in genres:
        genres_json.append(genre.as_dict())
    
    songs_json = []
    for song in songs:
        songs_json.append(song.as_dict())
    
    artists_json = []
    for artist in artists:
        artists_json.append(artist.as_dict())

    results = {
        'album': albums_json,
        'genre': genres_json,
        'song': songs_json,
        'artist': artists_json
    }

    return jsonify(results=results)

@animation_bp.route('/animate/', methods=['POST'])
def animate_query():
    # Get the JSON data from the request
    query_data = request.get_json() or {}

    # Extract the query from the JSON data
    query = query_data.get('query', None)

    # Validate if the 'query' key is present in the JSON data
    if not query:
        return bad_request('Missing or invalid "query" in JSON data')

    query_results = retrieve_query_results(query)
    
    # Return the steps_result as JSON
    return jsonify(query_results)

@animation_bp.route("/retrieve_animations/", methods=['GET'])
@jwt_required()
def retrieve_animations():
    # retrieve user
    user:Users = Users.query.filter_by(email=get_jwt_identity()).first_or_404()
    return user.retrieve_animations()

@animation_bp.route("/retrieve_animation/<animation_id>/", methods=['GET'])
@jwt_required()
def retrieve_animation(animation_id):
    animation:Animation = Animation.query.get_or_404(ani_id = animation_id)
    return animation.to_dict()

@animation_bp.route("/save-animation/", methods=['POST'])
@jwt_required()
def save_animation():
    data = request.get_json() or {}
    
    # field check
    if 'animation_name' not in data or 'query' not in data or 'schema_id' not in data:
        return bad_request('must include animation_name and query')
    
    # get user
    email = get_jwt_identity()
    user:Users = Users.query.filter_by(email=email).first_or_404()
    
    # create animation object
    animation = Animation(userid = user.id,
                          animation_name = data['animation_name'],
                          query = data['query'],
                          schema_id = data['schema_id']
                          )
    
    db.session.add(animation)
    db.session.commit()
    
    response = jsonify(animation.to_dict())
    response.status_code = 201
    
    return response