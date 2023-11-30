from app.blueprints.animation import animation_bp

from flask import jsonify, request
from flask_jwt_extended import jwt_required
from ...extensions import db

from ..main.errors import bad_request, error_response
from .scripts.generator import generate_prefixed

from ._prefixed_models import Schema1_Employee as Employee
from ._prefixed_models import Schema2_Product as Product, Schema2_Inventory as Inventory
from ._prefixed_models import Schema3_Course as Course, Schema3_Enrollment as Enrollment
from ._prefixed_models import Schema4_Flight as Flight, Schema4_Passenger as Passenger, Schema4_Ticket as Ticket
from ._prefixed_models import Schema5_Album as Album, Schema5_Artist as Artist, Schema5_Genre as Genre, Schema5_Song as Song

from pyparsing import ParseException

from app.scripts.Active_animation_parser import generate_animation_steps
from app.scripts.Active_sqlra import translate_query

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
        "employees": emps_json
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
        "products": prods_json,
        "inventory": invens_json
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
        'enrollments': enrolls_json
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
    try:
        # Get the JSON data from the request
        query_data = request.get_json() or {}

        # Extract the query from the JSON data
        query = query_data.get('query', None)

        # Validate if the 'query' key is present in the JSON data
        if not query:
            return bad_request('Missing or invalid "query" in JSON data')

        # Call the animation parser function and retrieve the steps_result
        steps_result = generate_animation_steps(query)

        # Return the steps_result as JSON
        return jsonify({'steps_result': steps_result})

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
