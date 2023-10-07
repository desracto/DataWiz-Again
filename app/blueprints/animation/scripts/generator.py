"""
    This file is used to populate the prefixed scehma databases

"""

from ....extensions import db
import re
from datetime import datetime

from .._prefixed_models import Schema1_Employee as Employee
from .._prefixed_models import Schema2_Product as Product, \
                                  Schema2_Inventory as Inventory
from .._prefixed_models import Schema3_Course as Course, \
                                  Schema3_Enrollment as Enrollment
from .._prefixed_models import Schema4_Flight as Flight, \
                                  Schema4_Passenger as Passenger, \
                                  Schema4_Ticket as Ticket 

from .._prefixed_models import Schema5_Album as Album, \
                                  Schema5_Artist as Artist, \
                                  Schema5_Genre as Genre, \
                                  Schema5_Song as Song


def delete_db(id: int):
    if id == 1 or id == 6:
        emps = Employee.query.all()
        for emp in emps:
            db.session.delete(emp)
    
    if id == 2 or id == 6:
        prods = Product.query.all()
        for prod in prods:
            db.session.delete(prod)
        
        invens = Inventory.query.all()
        for inv in invens:
            db.session.delete(inv)

    if id == 3 or id == 6:
        courses = Course.query.all()
        for course in courses:
            db.session.delte(course)
        
        enrolls = Enrollment.query.all()
        for enroll in enrolls:
            db.session.delete(enroll)
        
    if id == 4 or id == 6:
        flights = Flight.query.all()
        for flight in flights:
            db.session.delete(flight)
        
        passengers = Passenger.query.all()
        for passenger in passengers:
            db.session.delete(passenger)
        
        tickets = Ticket.query.all()
        for ticket in tickets:
            db.session.delete(ticket)
        
    if id == 5 or id == 6:
        albums = Album.query.all()
        for album in albums:
            db.session.delte(album)
        
        artists = Artist.query.all()
        for artist in artists:
            db.session.delete(artist)
        
        genres = Genre.query.all()
        for genre in genres:
            db.session.delte(genre)
        
        songs = Song.query.all()
        for song in songs:
            db.session.delete(song)


def retrieve_schema(id: int):
    table_names = []
    if id == 1:
        table_names.append('EMPLOYEE')
    elif id == 2:
        table_names.append('PRODUCT')
        table_names.append('INVENTORY')
    elif id == 3:
        table_names.append('COURSE')
        table_names.append('ENROLLMENT')
    elif id == 4:
        table_names.append('FLIGHT')
        table_names.append('PASSENGER')
        table_names.append('TICKET')
    elif id == 5:
        table_names.append('ALBUM')
        table_names.append('ARTIST')
        table_names.append('SONG')
        table_names.append('GENRE')

    result = {}
    with open("animation\\schemas.txt", "r") as file:
        for line in file:
            if line.find('#') == 0:
                continue

            if any(x in line for x in table_names):
                line = line.strip()
                line = re.split(',', line)

                if not result.get(line[0]):
                    result[line[0]] = []
                    
                result[line[0]].append(line[1::])
    
    return result

def generate_prefixed(id: int):
    result = retrieve_schema(id)

    if id == 1 or id == 6:
        # Employee 
        for arr in result['EMPLOYEE']:
            obj = emp = Employee(employee_ID=arr[0], 
                                 employee_FirstName=arr[1], 
                                 employee_LastName=arr[2], 
                                 employee_Age=int(arr[3]), 
                                 employee_Dept=arr[4], 
                                 employee_Salary=int(arr[5]))
            db.session.add(obj)
        db.session.commit()

    if id == 2 or id == 6:
        # Product Table
        for arr in result['PRODUCT']:
            prod = Product(products_ID=int(arr[0]),
                        products_Name=arr[1],
                        products_Category=arr[2],
                        products_Price=int(arr[3]))
            db.session.add(prod)
        
        # Inventory table
        for arr in result['INVENTORY']:
            inv = Inventory(products_ProductID=int(arr[0]),
                            inventory_Quantity=int(arr[1])) 

            db.session.add(inv)
        db.session.commit()

    if id == 3 or id == 6:
        # Course 
        for arr in result['COURSE']:
            obj = Course(course_ID=arr[0],
                         course_Name=arr[1],
                         course_Credit=int(arr[2]),
                         course_Dept=arr[3])
            
            db.session.add(obj)
        
        # Inventory
        for arr in result['ENROLLMENT']:
            obj = Enrollment(enrollment_ID=int(arr[0]),
                                    enrollment_StudentID=int(arr[1]),
                                    enrollment_CourseID=arr[2],
                                    enrollment_Grade=arr[3])           
            db.session.add(obj)
        db.session.commit()

    if id == 4 or id == 6:
        # Flight table
        for arr in result['FLIGHT']:
            obj = Flight(flight_ID = int(arr[0]),
                         flight_AirlineName = arr[1],
                         flight_DepartureCity = arr[2],
                         flight_ArrivalCity = arr[3],
                         flight_DepartureTime = datetime.strptime(arr[4], '%m/%d/%Y %H:%M'),
                         flight_ArrivalTime = datetime.strptime(arr[5], '%m/%d/%Y %H:%M'))

            db.session.add(obj)

        # Passenger Table
        for arr in result['PASSENGER']:
            obj = Passenger(passenger_ID = int(arr[0]),
                            passenger_FirstName = arr[1],
                            passenger_LastName = arr[2],
                            passenger_Gender = arr[3],
                            passenger_Age = arr[4])

            db.session.add(obj)

        # Ticket Table
        for arr in result['TICKET']:
            obj = Ticket(ticket_ID = int(arr[0]),
                            ticket_FlightID = int(arr[1]),
                            ticket_PassengerID = int(arr[2]),
                            ticket_SeatNumber = arr[3],
                            ticket_Price = float(arr[4]))
            db.session.add(obj)
        db.session.commit()

    if id == 5 or id == 6:
        # Album Table
        for arr in result['ALBUM']:
            obj = Album(album_ID = int(arr[0]),
                        album_Name = arr[1],
                        album_ReleaseYear = int(arr[2]),
                        album_ArtistID = int(arr[3]))
            db.session.add(obj)

        # Genre
        for arr in result['GENRE']:
            obj = Genre(genre_ID = int(arr[0]),
                        genre_Name = arr[1])

            db.session.add(obj)

        # Artist
        for arr in result['ARTIST']:
            obj = Artist(artist_ID = int(arr[0]),
                         artist_Name = arr[1],
                         artist_Country = arr[2],
                         artist_GenreID = int(arr[3]))
            
            db.session.add(obj)

        # Song
        for arr in result['SONG']:
            obj = Song(song_ID = int(arr[0]),
                       song_Title = arr[1],
                       song_AlbumID = int(arr[2]))

            db.session.add(obj)
        db.session.commit()        
