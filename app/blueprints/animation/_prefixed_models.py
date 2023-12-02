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
    emp_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    age = db.Column(db.Integer)
    dept = db.Column(db.String(50))
    salary = db.Column(db.Integer)

    def __repr__(self):
        return "<Schema 1: Employee(ID: {})>".format(self.emp_id)
    
# Schema 2
class Schema2_Product(db.Model, Object):
    # Table name and Bind
    __tablename__ = "Product"
    __bind_key__ = "prefixed"

    # Fields
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(50))
    category = db.Column(db.String(50))
    price = db.Column(db.Integer)

    # Relationship
    inventory = db.relationship('Schema2_Inventory', back_populates='product')
    
    def __repr__(self):
        return "<Schema 2: Product(ID: {})>".format(self.product_id)
        
class Schema2_Inventory(db.Model, Object):
    # Table Name
    __tablename__ = "Inventory"
    __bind_key__ = "prefixed"

    # Field Names
    inventory_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quantity = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.product_id'))

    # Relationship
    product = db.relationship('Schema2_Product', back_populates='inventory')

    def __repr__(self):
        return "<Schema 2: Inventory(ID: {})>".format(self.inventory_id)

# Schema 3
class Schema3_Course(db.Model, Object):
    # Table Name
    __tablename__ = 'Course'
    __bind_key__ = "prefixed"

    # Fields
    course_id = db.Column(db.String(10), primary_key=True)
    course_name = db.Column(db.String(100))
    credits = db.Column(db.Integer)
    dept = db.Column(db.String(50))

    # Relationships
    enrollment = db.relationship('Schema3_Enrollment', back_populates='course')

    # Functions
    def __repr__(self):
        return "<Schema 3: Course(ID: {})>".format(self.course_id)
    
class Schema3_Enrollment(db.Model, Object):
    # Table name
    __tablename__ = 'Enrollment'
    __bind_key__ = "prefixed"

    # Field Name
    enroll_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer)
    course_id = db.Column(db.String(10), db.ForeignKey('Course.course_id'))
    grade = db.Column(db.String(2))

    # Relationship
    course = db.relationship('Schema3_Course', back_populates='enrollment')

    # Functions
    def __repr__(self):
        return "<Schema 3: Enrollment(ID: {})>".format(self.enroll_id)

# Schema 4
class Schema4_Flight(db.Model, Object):
    # Table name
    __tablename__ = 'Flight'
    __bind_key__ = "prefixed"

    # Fields
    flight_id = db.Column(db.Integer, primary_key=True)
    airline_name = db.Column(db.String(100))
    departure = db.Column(db.String(100))
    arrival = db.Column(db.String(100))
    departure_time = db.Column(db.DateTime)
    arrival_time = db.Column(db.DateTime)

    # Relationships
    tickets = db.relationship('Schema4_Ticket', back_populates='flight')

    # Functions
    def __repr__(self):
        return "<Schema 4: Flight(ID: {})>".format(self.flight_id)
    
class Schema4_Passenger(db.Model, Object):
    # Table name
    __tablename__ = 'Passenger'
    __bind_key__ = "prefixed"

    # Fields
    passenger_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    gender = db.Column(db.String(6))
    age = db.Column(db.Integer)

    # Relationships
    ticket = db.relationship('Schema4_Ticket', back_populates='passenger')

    # Functions
    def __repr__(self):
        return "<Scheam 4: Passenger(ID: {})>".format(self.passenger_id)
    
class Schema4_Ticket(db.Model, Object):
    # Table name
    __tablename__ = 'Ticket'
    __bind_key__ = "prefixed"

    # Fields
    ticket_id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('Flight.flight_id'))
    passenger_id = db.Column(db.Integer, db.ForeignKey('Passenger.passenger_id'))
    seat_number = db.Column(db.String(4))
    price = db.Column(db.Float)

    # Relationships
    flight = db.relationship("Schema4_Flight", back_populates='tickets')
    passenger = db.relationship('Schema4_Passenger', back_populates='ticket')

    # Functions
    def __repr__(self):
        return "<Schema 4: Ticket(ID: {})>".format(self.ticket_id)

# Schema 5 
class Schema5_Album(db.Model, Object):
    # Table name
    __tablename__ = 'Album'
    __bind_key__ = "prefixed"

    # Fields
    album_id = db.Column(db.Integer, primary_key=True)
    album_name = db.Column(db.String(150))
    year = db.Column(db.Integer)
    artist_id = db.Column(db.Integer, db.ForeignKey('Artist.artist_id'))

    # Function
    song = db.relationship('Schema5_Song', back_populates='album')
    artist = db.relationship('Schema5_Artist', back_populates='album')

    # Function
    def __repr__(self):
        return "<Schema 5: Album(ID: {})>".format(self.album_id)
    
class Schema5_Genre(db.Model, Object):
    # Table name
    __tablename__ = 'Genre'
    __bind_key__ = "prefixed"

    # Fields
    genre_id = db.Column(db.Integer, primary_key=True)
    genre_name = db.Column(db.String(30))

    # Relationship
    artist = db.relationship('Schema5_Artist', back_populates='genre')

    # Function
    def __repr__(self):
        return "<Schema 5: Genre(ID: {})>".format(self.genre_id)

class Schema5_Song(db.Model, Object):
    # Table name
    __tablename__ = 'Song'
    __bind_key__ = "prefixed"

    # Fields
    song_id = db.Column(db.Integer, primary_key=True)
    song_title = db.Column(db.String(150))
    album_id = db.Column(db.Integer, db.ForeignKey('Album.album_id'))
    
    # Relationships
    album = db.relationship('Schema5_Album', back_populates='song')

    # Function 
    def __repr__(self):
        return "<Schema 5: Song(ID: {})>".format(self.song_id)

class Schema5_Artist(db.Model, Object):
    # Table name
    __tablename__ = 'Artist'
    __bind_key__ = "prefixed"

    # Fields
    artist_id = db.Column(db.Integer, primary_key=True)
    artist_name = db.Column(db.String(100))
    country = db.Column(db.String(60))
    genre_id = db.Column(db.Integer, db.ForeignKey('Genre.genre_id'))

    # Relationship
    genre = db.relationship('Schema5_Genre', back_populates='artist')
    album = db.relationship('Schema5_Album', back_populates='artist')

    # Function
    def __repr__(self):
        return "<Schema 5: Artist(ID: {})>".format(self.artist_id)