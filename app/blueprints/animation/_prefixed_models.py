from ...extensions import db
from datetime import datetime

# Naming Scheme:

# Table Names: SchemaX_TableName
# Field Names: tablename_FieldName

class Object:
    def as_dict(self):
        return {c.name: str(getattr(self, c.name)) for c in self.__table__.columns}

#Schema 1
class Schema1_Employee(db.Model, Object):
    # Table Name and Bind
    __tablename__ = "Employee"
    __bind_key__ = "prefixed"

    # Fields
    employee_ID = db.Column(db.Integer, primary_key=True)
    employee_FirstName = db.Column(db.String(50))
    employee_LastName = db.Column(db.String(50))
    employee_Age = db.Column(db.Integer)
    employee_Dept = db.Column(db.String(50))
    employee_Salary = db.Column(db.Integer)

    def __repr__(self):
        return "<Schema 1: Employee(ID: {})>".format(self.employee_ID)
    
# Schema 2
class Schema2_Product(db.Model, Object):
    # Table name and Bind
    __tablename__ = "Product"
    __bind_key__ = "prefixed"

    # Fields
    products_ID = db.Column(db.Integer, primary_key=True)
    products_Name = db.Column(db.String(50))
    products_Category = db.Column(db.String(50))
    products_Price = db.Column(db.Integer)

    # Relationship
    inventory = db.relationship('Schema2_Inventory', back_populates='product')
    
    def __repr__(self):
        return "<Schema 2: Product(ID: {})>".format(self.products_ID)
        
class Schema2_Inventory(db.Model, Object):
    # Table Name
    __tablename__ = "Inventory"
    __bind_key__ = "prefixed"

    # Field Names
    inventory_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    inventory_Quantity = db.Column(db.Integer)
    products_ProductID = db.Column(db.Integer, db.ForeignKey('Product.products_ID'))

    # Relationship
    product = db.relationship('Schema2_Product', back_populates='inventory')

    def __repr__(self):
        return "<Schema 2: Inventory(ID: {})>".format(self.inventory_ID)

# Schema 3
class Schema3_Course(db.Model, Object):
    # Table Name
    __tablename__ = 'Course'
    __bind_key__ = "prefixed"

    # Fields
    course_ID = db.Column(db.String(10), primary_key=True)
    course_Name = db.Column(db.String(100))
    course_Credit = db.Column(db.Integer)
    course_Dept = db.Column(db.String(50))

    # Relationships
    enrollment = db.relationship('Schema3_Enrollment', back_populates='course')

    # Functions
    def __repr__(self):
        return "<Schema 3: Course(ID: {})>".format(self.course_ID)
    
class Schema3_Enrollment(db.Model, Object):
    # Table name
    __tablename__ = 'Enrollment'
    __bind_key__ = "prefixed"

    # Field Name
    enrollment_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    enrollment_StudentID = db.Column(db.Integer)
    enrollment_CourseID = db.Column(db.String(10), db.ForeignKey('Course.course_ID'))
    enrollment_Grade = db.Column(db.String(2))

    # Relationship
    course = db.relationship('Schema3_Course', back_populates='enrollment')

    # Functions
    def __repr__(self):
        return "<Schema 3: Enrollment(ID: {})>".format(self.enrollment_ID)

# Schema 4
class Schema4_Flight(db.Model, Object):
    # Table name
    __tablename__ = 'Flight'
    __bind_key__ = "prefixed"

    # Fields
    flight_ID = db.Column(db.Integer, primary_key=True)
    flight_AirlineName = db.Column(db.String(100))
    flight_DepartureCity = db.Column(db.String(100))
    flight_ArrivalCity = db.Column(db.String(100))
    flight_DepartureTime = db.Column(db.DateTime)
    flight_ArrivalTime = db.Column(db.DateTime)

    # Relationships
    ticket = db.relationship('Schema4_Ticket', back_populates='flight')

    # Functions
    def __repr__(self):
        return "<Schema 4: Flight(ID: {})>".format(self.flight_ID)
    
class Schema4_Passenger(db.Model, Object):
    # Table name
    __tablename__ = 'Passenger'
    __bind_key__ = "prefixed"

    # Fields
    passenger_ID = db.Column(db.Integer, primary_key=True)
    passenger_FirstName = db.Column(db.String(50))
    passenger_LastName = db.Column(db.String(50))
    passenger_Gender = db.Column(db.String(5))
    passenger_Age = db.Column(db.Integer)

    # Relationships
    ticket = db.relationship('Schema4_Ticket', back_populates='passenger')

    # Functions
    def __repr__(self):
        return "<Scheam 4: Passenger(ID: {})>".format(self.passenger_ID)
    
class Schema4_Ticket(db.Model, Object):
    # Table name
    __tablename__ = 'Ticket'
    __bind_key__ = "prefixed"

    # Fields
    ticket_ID = db.Column(db.Integer, primary_key=True)
    ticket_FlightID = db.Column(db.Integer, db.ForeignKey('Flight.flight_ID'))
    ticket_PassengerID = db.Column(db.Integer, db.ForeignKey('Passenger.passenger_ID'))
    ticket_SeatNumber = db.Column(db.String(4))
    ticket_Price = db.Column(db.Float)

    # Relationships
    flight = db.relationship("Schema4_Flight", back_populates='ticket')
    passenger = db.relationship('Schema4_Passenger', back_populates='ticket')

    # Functions
    def __repr__(self):
        return "<Schema 4: Ticket(ID: {})>".format(self.ticket_ID)

# Schema 5 
class Schema5_Album(db.Model, Object):
    # Table name
    __tablename__ = 'Album'
    __bind_key__ = "prefixed"

    # Fields
    album_ID = db.Column(db.Integer, primary_key=True)
    album_Name = db.Column(db.String(150))
    album_ReleaseYear = db.Column(db.Integer)
    album_ArtistID = db.Column(db.Integer, db.ForeignKey('Artist.artist_ID'))

    # Function
    song = db.relationship('Schema5_Song', back_populates='album')
    artist = db.relationship('Schema5_Artist', back_populates='album')

    # Function
    def __repr__(self):
        return "<Schema 5: Album(ID: {})>".format(self.album_ID)
    
class Schema5_Genre(db.Model, Object):
    # Table name
    __tablename__ = 'Genre'
    __bind_key__ = "prefixed"

    # Fields
    genre_ID = db.Column(db.Integer, primary_key=True)
    genre_Name = db.Column(db.String(30))

    # Relationship
    artist = db.relationship('Schema5_Artist', back_populates='genre')

    # Function
    def __repr__(self):
        return "<Schema 5: Genre(ID: {})>".format(self.genre_ID)

class Schema5_Song(db.Model, Object):
    # Table name
    __tablename__ = 'Song'
    __bind_key__ = "prefixed"

    # Fields
    song_ID = db.Column(db.Integer, primary_key=True)
    song_Title = db.Column(db.String(150))
    song_AlbumID = db.Column(db.Integer, db.ForeignKey('Album.album_ID'))
    
    # Relationships
    album = db.relationship('Schema5_Album', back_populates='song')

    # Function 
    def __repr__(self):
        return "<Schema 5: Song(ID: {})>".format(self.song_ID)

class Schema5_Artist(db.Model, Object):
    # Table name
    __tablename__ = 'Artist'
    __bind_key__ = "prefixed"

    # Fields
    artist_ID = db.Column(db.Integer, primary_key=True)
    artist_Name = db.Column(db.String(100))
    artist_Country = db.Column(db.String(60))
    artist_GenreID = db.Column(db.Integer, db.ForeignKey('Genre.genre_ID'))

    # Relationship
    genre = db.relationship('Schema5_Genre', back_populates='artist')
    album = db.relationship('Schema5_Album', back_populates='artist')

    # Function
    def __repr__(self):
        return "<Schema 5: Artist(ID: {})>".format(self.artist_ID)