from sqlalchemy import create_engine, text

# Install 
# - pip install mysql-connector-python
# - pip install sqlalchemy


# # DB 1 - rfa373 (Datawiz App Platform DB)
# print("DB 1 - DW-AP DB - rfa373")

# # Connect to the database
# engine = create_engine("mysql+mysqlconnector://sql12657821:dyMDPWtEP5@sql12.freemysqlhosting.net/sql12657821")

# # Test the connection
# connection = engine.connect()
# # q = text("CREATE TABLE filters (filter_id INT AUTO_INCREMENT PRIMARY KEY, filter_name VARCHAR(50), mark decimal(5,2))")
# q1 = text("show tables")
# # connection.execute(q)
# result = connection.execute(q1)

# for i in result:
#     print(i)


# DB 2 - rfa71 (Schema DB)
print("\nDB 2 - Schema DB - rfa71")

# Connect to the database
engine2 = create_engine("mysql+mysqlconnector://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

# Test the connection
connection2 = engine2.connect()

# ------------------ schema 1
# q1 = text("CREATE TABLE employees (emp_id INT, first_name VARCHAR(50), last_name VARCHAR(50), age INT, dept VARCHAR(50), salary DECIMAL(10, 2))")
# q2 = text("INSERT INTO employees (emp_id, first_name, last_name, age, dept, salary) VALUES (101, 'John', 'Doe', 30, 'Sales', 50000), (102, 'Jane', 'Smith', 28, 'Marketing', 48000), (103, 'Michael', 'Johnson', 35, 'HR', 55000), (104, 'Emily', 'Williams', 24, 'IT', 52000),(105, 'Robert', 'Brown', 32, 'Finance', 60000), (106, 'Lisa', 'Lee', 29, 'Sales', 49000), (107, 'David', 'Kim', 27, 'Marketing', 47000), (108, 'Sarah', 'Anderson', 33, 'HR', 56000), (109, 'James', 'Martinez', 25, 'IT', 53000), (110, 'Olivia', 'Harris', 31, 'Finance', 61000), (111, 'Ethan', 'Lewis', 26, 'Sales', 48000), (112, 'Mia', 'Clark', 34, 'Marketing', 49000), (113, 'Alexander', 'Allen', 29, 'HR', 55000), (114, 'Sophia', 'Wright', 27, 'IT', 54000), (115, 'Daniel', 'Scott', 32, 'Finance', 60000)")
# connection2.execute(q1)
# connection2.execute(q2)


# ------------------ schema 2
# q3 = text("CREATE TABLE Products (pid INT PRIMARY KEY, p_name VARCHAR(50), category VARCHAR(30), price DECIMAL(6, 2))")
# q5 = text("CREATE TABLE Inventory ( pid INT, quantity INT, FOREIGN KEY (pid) REFERENCES Products(pid))")
# connection2.execute(q3)
# connection2.execute(q5)

# q4 = text("INSERT INTO Products (pid, p_name, category, price) VALUES (101, 'Laptop', 'Electronics', 800), (102, 'Smartphone', 'Electronics', 500), (103, 'Headphones', 'Electronics', 100), (104, 'T-shirt', 'Apparel', 25), (105, 'Jeans', 'Apparel', 50), (106, 'Sneakers', 'Footwear', 80), (107, 'Backpack', 'Accessories', 40), (108, 'Watch', 'Accessories', 120), (109, 'Blender', 'Appliances', 150), (110, 'Coffee Maker', 'Appliances', 100), (111, 'Book', 'Books', 15), (112, 'Tablet', 'Electronics', 300), (113, 'Camera', 'Electronics', 400), (114, 'Dress', 'Apparel', 60), (115, 'Sandals', 'Footwear', 30), (116, 'Sunglasses', 'Accessories', 20), (117, 'Microwave', 'Appliances', 200), (118, 'Smart Speaker', 'Electronics', 120), (119, 'Fitness Tracker', 'Electronics', 70), (120, 'Wallet', 'Accessories', 35)")
# q6 = text("INSERT INTO Inventory (pid, quantity) VALUES (101, 50), (102, 80), (103, 100), (104, 70), (105, 90), (106, 60), (107, 40), (108, 30), (109, 20), (110, 25), (111, 100), (112, 45), (113, 35), (114, 75), (115, 85), (116, 95), (117, 15), (118, 50), (119, 60), (120, 80)")
# connection2.execute(q4)
# connection2.execute(q6)

# ------------------ schema 3
# q7 = text("CREATE TABLE Courses (course_id VARCHAR(10) PRIMARY KEY, course_name VARCHAR(50), credits INT, dept VARCHAR(50))")
# q9 = text("CREATE TABLE enrollment (e_id INT, stu_id INT, course_id VARCHAR(10), grade VARCHAR(1), FOREIGN KEY (course_id) REFERENCES Courses(course_id))")
# connection2.execute(q7)
# connection2.execute(q9)

# q8 = text("INSERT INTO Courses (course_id, course_name, credits, dept) VALUES ('CS101', 'Introduction to CS', 3, 'Computer Sci'),('MATH201', 'Calculus I', 4, 'Mathematics'),('ENG101', 'English Composition', 3, 'English'),('HIS202', 'World History', 3, 'History'),('BIO301', 'Biology Concepts', 4, 'Biology'),('ECON102', 'Microeconomics', 3, 'Economics'),('PHY202', 'Physics II', 4, 'Physics'),('CHEM101', 'General Chemistry', 4, 'Chemistry'),('PSYCH201', 'Intro to Psychology', 3, 'Psychology'),('ARTS101', 'Introduction to Art', 3, 'Arts'),('SOC101', 'Sociology Fundamentals', 3, 'Sociology'),('POLSCI201', 'Political Science', 3, 'Political Sci'),('SPAN101', 'Spanish I', 3, 'Languages'),('GEOL201', 'Earth Science', 4, 'Geology'),('MUS101', 'Music Appreciation', 3, 'Music'),('PHIL202', 'Ethics', 3, 'Philosophy'),('FIN202', 'Finance Principles', 3, 'Finance'),('MKT101', 'Marketing Fundamentals', 3, 'Marketing'),('CUL101', 'Culinary Arts', 3, 'Culinary'),('STAT201', 'Statistics', 3, 'Mathematics'),('ANTHRO101', 'Introduction to Anthrop', 3, 'Anthropology'),('LIT101', 'English Literature', 3, 'English'),('FREN101', 'French I', 3, 'Languages'),('THEA101', 'Introduction to Theater', 3, 'Theater'),('PHOT101', 'Photography Basics', 3, 'Photography'),('NUTR201', 'Nutrition and Health', 3, 'Nutrition'),('GYM101', 'Physical Education', 2, 'Physical Edu'),('ENVSCI201', 'Environmental Science', 4, 'Environmental'),('ECON201', 'Macroeconomics', 3, 'Economics'),('BIOL101', 'Biology Foundations', 3, 'Biology')")
# q10 = text("INSERT INTO enrollment (e_id, stu_id, course_id, grade) VALUES (1, 101, 'CS101', 'A'),(2, 102, 'MATH201', 'B'),(3, 103, 'ENG101', 'A'),(4, 104, 'HIS202', 'C'),(5, 105, 'BIO301', 'A'),(6, 106, 'ECON102', 'B'),(7, 107, 'PHY202', 'B'),(8, 108, 'CHEM101', 'C'),(9, 109, 'PSYCH201', 'A'),(10, 110, 'ARTS101', 'A'),(11, 111, 'SOC101', 'B'),(12, 112, 'POLSCI201', 'B'),(13, 113, 'SPAN101', 'A'),(14, 114, 'GEOL201', 'C'),(15, 115, 'MUS101', 'A'),(16, 116, 'PHIL202', 'B'),(17, 117, 'FIN202', 'B'),(18, 118, 'MKT101', 'C'),(19, 119, 'CUL101', 'A'),(20, 120, 'STAT201', 'A'),(21, 121, 'ANTHRO101', 'B'),(22, 122, 'LIT101', 'C'),(23, 123, 'FREN101', 'A'),(24, 124, 'THEA101', 'B'),(25, 125, 'PHOT101', 'B'),(26, 126, 'NUTR201', 'C'),(27, 127, 'GYM101', 'A'),(28, 128, 'ENVSCI201', 'A'),(29, 129, 'ECON201', 'B'),(30, 130, 'BIOL101', 'C')")
# connection2.execute(q8)
# connection2.execute(q10)


# ------------------ schema 4

# q11 = text("CREATE TABLE Flights ( flight_id INT PRIMARY KEY, airline_name NVARCHAR(100), departure NVARCHAR(100), arrival NVARCHAR(100), departure_time DATETIME, arrival_time DATETIME)")
# q12 = text("CREATE TABLE Passengers (passenger_id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), gender VARCHAR(10), age INT)")
# q13 = text("CREATE TABLE Tickets (ticket_id INT PRIMARY KEY, flight_id INT, passenger_id INT, seat_number VARCHAR(5), price DECIMAL(8,2),FOREIGN KEY (flight_id) REFERENCES Flights(flight_id), FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id))")
# connection2.execute(q11)
# connection2.execute(q12)
# connection2.execute(q13)

# q14 = text("INSERT INTO Flights (flight_id, airline_name, departure , arrival, departure_time, arrival_time) VALUES (1001, N'Delta Airlines', N'New York', N'Los Angeles', '2023-05-25T08:00:00', '2023-05-25T12:00:00'), (1002, N'United Airlines', N'Chicago', N'Denver', '2023-05-25T09:30:00', '2023-05-25T11:30:00'), (1003, N'American Airlines', N'Los Angeles', N'New York', '2023-05-25T15:00:00', '2023-05-25T23:00:00'), (1004, N'Southwest Airlines', N'Dallas', N'Las Vegas', '2023-05-26T07:45:00', '2023-05-26T09:30:00'), (1005, N'JetBlue Airways', N'Boston', N'Miami', '2023-05-26T10:15:00', '2023-05-26T13:30:00'), (1006, N'British Airways', N'London', N'Paris', '2023-05-26T14:30:00', '2023-05-26T16:00:00'), (1007, N'Emirates', N'Dubai', N'Sydney', '2023-05-27T00:00:00', '2023-05-27T06:30:00'), (1008, N'Singapore Airlines', N'Singapore', N'Tokyo', '2023-05-27T08:45:00', '2023-05-27T15:30:00'), (1009, N'Qantas', N'Sydney', N'Melbourne', '2023-05-28T11:15:00', '2023-05-28T12:30:00'), (1010, N'Air Canada', N'Toronto', N'Vancouver', '2023-05-28T13:00:00', '2023-05-28T15:15:00'), (1011, N'Lufthansa', N'Frankfurt', N'Beijing', '2023-05-28T02:00:00', '2023-05-28T07:30:00'), (1012, N'Cathay Pacific', N'Hong Kong', N'Singapore', '2023-05-29T06:45:00', '2023-05-29T09:30:00'), (1013, N'Virgin Atlantic', N'London', N'New York', '2023-05-29T08:30:00', '2023-05-29T14:15:00'), (1014, N'Air France', N'Paris', N'Rome', '2023-05-29T15:45:00', '2023-05-29T17:30:00'), (1015, N'Qatar Airways', N'Doha', N'Dubai', '2023-05-30T10:00:00', '2023-05-30T10:45:00'), (1016, N'Etihad Airways', N'Abu Dhabi', N'Mumbai', '2023-05-30T12:30:00', '2023-05-30T14:45:00'), (1017, N'KLM Royal Dutch', N'Amsterdam', N'Barcelona', '2023-05-30T16:15:00', '2023-05-30T18:00:00'), (1018, N'Turkish Airlines', N'Istanbul', N'Athens', '2023-05-31T11:00:00', '2023-05-31T12:45:00'), (1019, N'EgyptAir', N'Cairo', N'Johannesburg', '2023-05-31T14:30:00', '2023-05-31T20:15:00'), (1020, N'Japan Airlines', N'Tokyo', N'Seoul', '2023-05-31T09:00:00', '2023-05-31T11:30:00')")
# q15 = text("INSERT INTO Passengers (passenger_id, first_name, last_name, gender, age) VALUES (2001, 'John', 'Doe', 'Male', 35), (2002, 'Sarah', 'Johnson', 'Female', 28), (2003, 'Michael', 'Smith', 'Male', 45), (2004, 'Emily', 'Williams', 'Female', 32), (2005, 'David', 'Brown', 'Male', 29), (2006, 'Jessica', 'Anderson', 'Female', 26), (2007, 'Robert', 'Jones', 'Male', 41), (2008, 'Olivia', 'Martinez', 'Female', 30), (2009, 'William', 'Davis', 'Male', 38), (2010, 'Sophia', 'Garcia', 'Female', 24), (2011, 'James', 'Rodriguez', 'Male', 33), (2012, 'Mia', 'Hernandez', 'Female', 22), (2013, 'Benjamin', 'Gonzalez', 'Male', 39), (2014, 'Charlotte', 'Wilson', 'Female', 27), (2015, 'Daniel', 'Taylor', 'Male', 36), (2016, 'Ava', 'Thomas', 'Female', 25), (2017, 'Matthew', 'Moore', 'Male', 34), (2018, 'Harper', 'Lee', 'Female', 23), (2019, 'Joseph', 'Turner', 'Male', 37), (2020, 'Amelia', 'King', 'Female', 31)")
# q16 = text("INSERT INTO Tickets (ticket_id, flight_id, passenger_id, seat_number, price) VALUES (3001, 1001, 2001, 'A1', 350.5), (3002, 1001, 2002, 'B2', 450.25), (3003, 1002, 2003, 'C3', 280), (3004, 1003, 2004, 'D4', 500), (3005, 1004, 2005, 'E5', 200.75), (3006, 1005, 2006, 'F6', 320.8), (3007, 1006, 2007, 'G7', 400), (3008, 1007, 2008, 'H8', 280.5), (3009, 1008, 2009, 'I9', 380), (3010, 1009, 2010, 'J10', 420.25), (3011, 1010, 2011, 'K11', 330), (3012, 1011, 2012, 'L12', 460.75), (3013, 1012, 2013, 'M13', 340), (3014, 1013, 2014, 'N14', 420.5), (3015, 1014, 2015, 'O15', 280.8), (3016, 1015, 2016, 'P16', 390), (3017, 1016, 2017, 'Q17', 320.25), (3018, 1017, 2018, 'R18', 410.5), (3019, 1018, 2019, 'S19', 290), (3020, 1019, 2020, 'T20', 370.75)")
# connection2.execute(q14)
# connection2.execute(q15)
# connection2.execute(q16)


# ------------------ schema 5

# q17 = text("CREATE TABLE Genres (genre_id INT PRIMARY KEY, genre_name VARCHAR(30))")
# q18 = text("CREATE TABLE Artists (artist_id INT PRIMARY KEY, artist_name VARCHAR(50), country VARCHAR(50), genre_id INT, FOREIGN KEY (genre_id) REFERENCES Genres(genre_id))")
# q19 = text("CREATE TABLE Albums (album_id INT PRIMARY KEY, album_name VARCHAR(50), year INT, artist_id INT, FOREIGN KEY (artist_id) REFERENCES Artists(artist_id))")
# q20 = text("CREATE TABLE Songs (song_id INT PRIMARY KEY, song_title VARCHAR(50), album_id INT, FOREIGN KEY (album_id) REFERENCES Albums(album_id))")
# connection2.execute(q17)
# connection2.execute(q18)
# connection2.execute(q19)
# connection2.execute(q20)

# q21 = text("INSERT INTO Genres (genre_id, genre_name) VALUES (301, 'Rock'), (302, 'Pop'), (303, 'Jazz'), (304, 'Country'), (305, 'Indie'), (306, 'Hip Hop'), (307, 'Electronic'), (308, 'Reggae'), (309, 'Classical'), (310, 'Salsa'), (311, 'Funk'), (312, 'Bollywood'), (313, 'Soul'), (314, 'Gospel')")
# q22 = text("INSERT INTO Artists (artist_id, artist_name, country, genre_id) VALUES (201, 'Queen', 'United Kingdom', 301), (202, 'The Rolling Stones', 'United Kingdom', 301), (203, 'Taylor Swift', 'United States', 302), (204, 'Miles Davis', 'United States', 303), (205, 'Johnny Cash', 'United States', 304), (206, 'Beyoncé', 'United States', 302), (207, 'Arctic Monkeys', 'United Kingdom', 305), (208, 'Eminem', 'United States', 306), (209, 'Daft Punk', 'France', 307), (210, 'B.B. King', 'United States', 304), (211, 'Bob Marley', 'Jamaica', 308), (212, 'Ludwig van Beethoven', 'Germany', 309), (213, 'Nirvana', 'United States', 305), (214, 'Metallica', 'United States', 306), (215, 'Celia Cruz', 'Cuba', 310), (216, 'James Brown', 'United States', 311), (217, 'A.R. Rahman', 'India', 312), (218, 'Aretha Franklin', 'United States', 313), (219, 'Brian Eno', 'United Kingdom', 307), (220, 'Mahalia Jackson', 'United States', 314)")
# q23 = text("INSERT INTO Albums (album_id, album_name, year, artist_id) VALUES (101, 'Greatest Hits', 1995, 201), (102, 'Rock Anthems', 2002, 202), (103, 'Pop Sensations', 2010, 203), (104, 'Classic Jazz', 1998, 204), (105, 'Country Roads', 2005, 205), (106, 'R&B Grooves', 2012, 206), (107, 'Indie Classics', 2008, 207), (108, 'Hip Hop Hits', 2015, 208), (109, 'Electronic Vibes', 2006, 209), (110, 'Blues Legends', 1997, 210), (111, 'Reggae Roots', 2011, 211), (112, 'Classical Masterpieces', 2000, 212), (113, 'Alternative Rewind', 2009, 213), (114, 'Metal Mayhem', 2014, 214), (115, 'Latin Salsa', 2003, 215), (116, 'Funky Grooves', 2007, 216), (117, 'Bollywood Beats', 2013, 217), (118, 'Soulful Sounds', 1999, 218), (119, 'Ambient Dreams', 2016, 219), (120, 'Gospel Favorites', 2004, 220)")
# q24 = text("INSERT INTO Songs (song_id, song_title, album_id) VALUES (1001, 'Bohemian Rhapsody', 101), (1002, 'Paint It Black', 102), (1003, 'Shake It Off', 103), (1004, 'So What', 104), (1005, 'Ring of Fire', 105), (1006, 'Love On Top', 106), (1007, 'Do I Wanna Know?', 107), (1008, 'Lose Yourself', 108), (1009, 'Around the World', 109), (1010, 'The Thrill Is Gone', 110), (1011, 'One Love', 111), (1012, 'Moonlight Sonata', 112), (1013, 'Smells Like Teen Spirit', 113), (1014, 'Enter Sandman', 114), (1015, 'Suavemente', 115), (1016, 'Get Up (I Feel Like A)', 116), (1017, 'Chaiyya Chaiyya', 117), (1018, 'Respect', 118), (1019, 'Ambient Bliss', 119), (1020, 'Amazing Grace', 120)")
# connection2.execute(q21)
# connection2.execute(q22)
# connection2.execute(q23)
# connection2.execute(q24)


# ---- Test removal 
# q_ = text("drop table Inventory")
# connection2.execute(q_)
# q_ = text("drop table Products")
# connection2.execute(q_)



qf = text("Show TABLES")
resultf = connection2.execute(qf)
for i in resultf:
    print(i)
from sqlalchemy import create_engine, text

# Install 
# - pip install mysql-connector-python
# - pip install sqlalchemy


# # DB 1 - rfa373 (Datawiz App Platform DB)
# print("DB 1 - DW-AP DB - rfa373")

# # Connect to the database
# engine = create_engine("mysql+mysqlconnector://sql12657821:dyMDPWtEP5@sql12.freemysqlhosting.net/sql12657821")

# # Test the connection
# connection = engine.connect()
# # q = text("CREATE TABLE filters (filter_id INT AUTO_INCREMENT PRIMARY KEY, filter_name VARCHAR(50), mark decimal(5,2))")
# q1 = text("show tables")
# # connection.execute(q)
# result = connection.execute(q1)

# for i in result:
#     print(i)


# DB 2 - rfa71 (Schema DB)
print("\nDB 2 - Schema DB - rfa71")

# Connect to the database
engine2 = create_engine("mysql+mysqlconnector://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

# Test the connection
connection2 = engine2.connect()

# ------------------ schema 1
# q1 = text("CREATE TABLE employees (emp_id INT, first_name VARCHAR(50), last_name VARCHAR(50), age INT, dept VARCHAR(50), salary DECIMAL(10, 2))")
# q2 = text("INSERT INTO employees (emp_id, first_name, last_name, age, dept, salary) VALUES (101, 'John', 'Doe', 30, 'Sales', 50000), (102, 'Jane', 'Smith', 28, 'Marketing', 48000), (103, 'Michael', 'Johnson', 35, 'HR', 55000), (104, 'Emily', 'Williams', 24, 'IT', 52000),(105, 'Robert', 'Brown', 32, 'Finance', 60000), (106, 'Lisa', 'Lee', 29, 'Sales', 49000), (107, 'David', 'Kim', 27, 'Marketing', 47000), (108, 'Sarah', 'Anderson', 33, 'HR', 56000), (109, 'James', 'Martinez', 25, 'IT', 53000), (110, 'Olivia', 'Harris', 31, 'Finance', 61000), (111, 'Ethan', 'Lewis', 26, 'Sales', 48000), (112, 'Mia', 'Clark', 34, 'Marketing', 49000), (113, 'Alexander', 'Allen', 29, 'HR', 55000), (114, 'Sophia', 'Wright', 27, 'IT', 54000), (115, 'Daniel', 'Scott', 32, 'Finance', 60000)")
# connection2.execute(q1)
# connection2.execute(q2)


# ------------------ schema 2
# q3 = text("CREATE TABLE Products (pid INT PRIMARY KEY, p_name VARCHAR(50), category VARCHAR(30), price DECIMAL(6, 2))")
# q5 = text("CREATE TABLE Inventory ( pid INT, quantity INT, FOREIGN KEY (pid) REFERENCES Products(pid))")
# connection2.execute(q3)
# connection2.execute(q5)

# q4 = text("INSERT INTO Products (pid, p_name, category, price) VALUES (101, 'Laptop', 'Electronics', 800), (102, 'Smartphone', 'Electronics', 500), (103, 'Headphones', 'Electronics', 100), (104, 'T-shirt', 'Apparel', 25), (105, 'Jeans', 'Apparel', 50), (106, 'Sneakers', 'Footwear', 80), (107, 'Backpack', 'Accessories', 40), (108, 'Watch', 'Accessories', 120), (109, 'Blender', 'Appliances', 150), (110, 'Coffee Maker', 'Appliances', 100), (111, 'Book', 'Books', 15), (112, 'Tablet', 'Electronics', 300), (113, 'Camera', 'Electronics', 400), (114, 'Dress', 'Apparel', 60), (115, 'Sandals', 'Footwear', 30), (116, 'Sunglasses', 'Accessories', 20), (117, 'Microwave', 'Appliances', 200), (118, 'Smart Speaker', 'Electronics', 120), (119, 'Fitness Tracker', 'Electronics', 70), (120, 'Wallet', 'Accessories', 35)")
# q6 = text("INSERT INTO Inventory (pid, quantity) VALUES (101, 50), (102, 80), (103, 100), (104, 70), (105, 90), (106, 60), (107, 40), (108, 30), (109, 20), (110, 25), (111, 100), (112, 45), (113, 35), (114, 75), (115, 85), (116, 95), (117, 15), (118, 50), (119, 60), (120, 80)")
# connection2.execute(q4)
# connection2.execute(q6)

# ------------------ schema 3
# q7 = text("CREATE TABLE Courses (course_id VARCHAR(10) PRIMARY KEY, course_name VARCHAR(50), credits INT, dept VARCHAR(50))")
# q9 = text("CREATE TABLE enrollment (e_id INT, stu_id INT, course_id VARCHAR(10), grade VARCHAR(1), FOREIGN KEY (course_id) REFERENCES Courses(course_id))")
# connection2.execute(q7)
# connection2.execute(q9)

# q8 = text("INSERT INTO Courses (course_id, course_name, credits, dept) VALUES ('CS101', 'Introduction to CS', 3, 'Computer Sci'),('MATH201', 'Calculus I', 4, 'Mathematics'),('ENG101', 'English Composition', 3, 'English'),('HIS202', 'World History', 3, 'History'),('BIO301', 'Biology Concepts', 4, 'Biology'),('ECON102', 'Microeconomics', 3, 'Economics'),('PHY202', 'Physics II', 4, 'Physics'),('CHEM101', 'General Chemistry', 4, 'Chemistry'),('PSYCH201', 'Intro to Psychology', 3, 'Psychology'),('ARTS101', 'Introduction to Art', 3, 'Arts'),('SOC101', 'Sociology Fundamentals', 3, 'Sociology'),('POLSCI201', 'Political Science', 3, 'Political Sci'),('SPAN101', 'Spanish I', 3, 'Languages'),('GEOL201', 'Earth Science', 4, 'Geology'),('MUS101', 'Music Appreciation', 3, 'Music'),('PHIL202', 'Ethics', 3, 'Philosophy'),('FIN202', 'Finance Principles', 3, 'Finance'),('MKT101', 'Marketing Fundamentals', 3, 'Marketing'),('CUL101', 'Culinary Arts', 3, 'Culinary'),('STAT201', 'Statistics', 3, 'Mathematics'),('ANTHRO101', 'Introduction to Anthrop', 3, 'Anthropology'),('LIT101', 'English Literature', 3, 'English'),('FREN101', 'French I', 3, 'Languages'),('THEA101', 'Introduction to Theater', 3, 'Theater'),('PHOT101', 'Photography Basics', 3, 'Photography'),('NUTR201', 'Nutrition and Health', 3, 'Nutrition'),('GYM101', 'Physical Education', 2, 'Physical Edu'),('ENVSCI201', 'Environmental Science', 4, 'Environmental'),('ECON201', 'Macroeconomics', 3, 'Economics'),('BIOL101', 'Biology Foundations', 3, 'Biology')")
# q10 = text("INSERT INTO enrollment (e_id, stu_id, course_id, grade) VALUES (1, 101, 'CS101', 'A'),(2, 102, 'MATH201', 'B'),(3, 103, 'ENG101', 'A'),(4, 104, 'HIS202', 'C'),(5, 105, 'BIO301', 'A'),(6, 106, 'ECON102', 'B'),(7, 107, 'PHY202', 'B'),(8, 108, 'CHEM101', 'C'),(9, 109, 'PSYCH201', 'A'),(10, 110, 'ARTS101', 'A'),(11, 111, 'SOC101', 'B'),(12, 112, 'POLSCI201', 'B'),(13, 113, 'SPAN101', 'A'),(14, 114, 'GEOL201', 'C'),(15, 115, 'MUS101', 'A'),(16, 116, 'PHIL202', 'B'),(17, 117, 'FIN202', 'B'),(18, 118, 'MKT101', 'C'),(19, 119, 'CUL101', 'A'),(20, 120, 'STAT201', 'A'),(21, 121, 'ANTHRO101', 'B'),(22, 122, 'LIT101', 'C'),(23, 123, 'FREN101', 'A'),(24, 124, 'THEA101', 'B'),(25, 125, 'PHOT101', 'B'),(26, 126, 'NUTR201', 'C'),(27, 127, 'GYM101', 'A'),(28, 128, 'ENVSCI201', 'A'),(29, 129, 'ECON201', 'B'),(30, 130, 'BIOL101', 'C')")
# connection2.execute(q8)
# connection2.execute(q10)


# ------------------ schema 4

# q11 = text("CREATE TABLE Flights ( flight_id INT PRIMARY KEY, airline_name NVARCHAR(100), departure NVARCHAR(100), arrival NVARCHAR(100), departure_time DATETIME, arrival_time DATETIME)")
# q12 = text("CREATE TABLE Passengers (passenger_id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), gender VARCHAR(10), age INT)")
# q13 = text("CREATE TABLE Tickets (ticket_id INT PRIMARY KEY, flight_id INT, passenger_id INT, seat_number VARCHAR(5), price DECIMAL(8,2),FOREIGN KEY (flight_id) REFERENCES Flights(flight_id), FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id))")
# connection2.execute(q11)
# connection2.execute(q12)
# connection2.execute(q13)

# q14 = text("INSERT INTO Flights (flight_id, airline_name, departure , arrival, departure_time, arrival_time) VALUES (1001, N'Delta Airlines', N'New York', N'Los Angeles', '2023-05-25T08:00:00', '2023-05-25T12:00:00'), (1002, N'United Airlines', N'Chicago', N'Denver', '2023-05-25T09:30:00', '2023-05-25T11:30:00'), (1003, N'American Airlines', N'Los Angeles', N'New York', '2023-05-25T15:00:00', '2023-05-25T23:00:00'), (1004, N'Southwest Airlines', N'Dallas', N'Las Vegas', '2023-05-26T07:45:00', '2023-05-26T09:30:00'), (1005, N'JetBlue Airways', N'Boston', N'Miami', '2023-05-26T10:15:00', '2023-05-26T13:30:00'), (1006, N'British Airways', N'London', N'Paris', '2023-05-26T14:30:00', '2023-05-26T16:00:00'), (1007, N'Emirates', N'Dubai', N'Sydney', '2023-05-27T00:00:00', '2023-05-27T06:30:00'), (1008, N'Singapore Airlines', N'Singapore', N'Tokyo', '2023-05-27T08:45:00', '2023-05-27T15:30:00'), (1009, N'Qantas', N'Sydney', N'Melbourne', '2023-05-28T11:15:00', '2023-05-28T12:30:00'), (1010, N'Air Canada', N'Toronto', N'Vancouver', '2023-05-28T13:00:00', '2023-05-28T15:15:00'), (1011, N'Lufthansa', N'Frankfurt', N'Beijing', '2023-05-28T02:00:00', '2023-05-28T07:30:00'), (1012, N'Cathay Pacific', N'Hong Kong', N'Singapore', '2023-05-29T06:45:00', '2023-05-29T09:30:00'), (1013, N'Virgin Atlantic', N'London', N'New York', '2023-05-29T08:30:00', '2023-05-29T14:15:00'), (1014, N'Air France', N'Paris', N'Rome', '2023-05-29T15:45:00', '2023-05-29T17:30:00'), (1015, N'Qatar Airways', N'Doha', N'Dubai', '2023-05-30T10:00:00', '2023-05-30T10:45:00'), (1016, N'Etihad Airways', N'Abu Dhabi', N'Mumbai', '2023-05-30T12:30:00', '2023-05-30T14:45:00'), (1017, N'KLM Royal Dutch', N'Amsterdam', N'Barcelona', '2023-05-30T16:15:00', '2023-05-30T18:00:00'), (1018, N'Turkish Airlines', N'Istanbul', N'Athens', '2023-05-31T11:00:00', '2023-05-31T12:45:00'), (1019, N'EgyptAir', N'Cairo', N'Johannesburg', '2023-05-31T14:30:00', '2023-05-31T20:15:00'), (1020, N'Japan Airlines', N'Tokyo', N'Seoul', '2023-05-31T09:00:00', '2023-05-31T11:30:00')")
# q15 = text("INSERT INTO Passengers (passenger_id, first_name, last_name, gender, age) VALUES (2001, 'John', 'Doe', 'Male', 35), (2002, 'Sarah', 'Johnson', 'Female', 28), (2003, 'Michael', 'Smith', 'Male', 45), (2004, 'Emily', 'Williams', 'Female', 32), (2005, 'David', 'Brown', 'Male', 29), (2006, 'Jessica', 'Anderson', 'Female', 26), (2007, 'Robert', 'Jones', 'Male', 41), (2008, 'Olivia', 'Martinez', 'Female', 30), (2009, 'William', 'Davis', 'Male', 38), (2010, 'Sophia', 'Garcia', 'Female', 24), (2011, 'James', 'Rodriguez', 'Male', 33), (2012, 'Mia', 'Hernandez', 'Female', 22), (2013, 'Benjamin', 'Gonzalez', 'Male', 39), (2014, 'Charlotte', 'Wilson', 'Female', 27), (2015, 'Daniel', 'Taylor', 'Male', 36), (2016, 'Ava', 'Thomas', 'Female', 25), (2017, 'Matthew', 'Moore', 'Male', 34), (2018, 'Harper', 'Lee', 'Female', 23), (2019, 'Joseph', 'Turner', 'Male', 37), (2020, 'Amelia', 'King', 'Female', 31)")
# q16 = text("INSERT INTO Tickets (ticket_id, flight_id, passenger_id, seat_number, price) VALUES (3001, 1001, 2001, 'A1', 350.5), (3002, 1001, 2002, 'B2', 450.25), (3003, 1002, 2003, 'C3', 280), (3004, 1003, 2004, 'D4', 500), (3005, 1004, 2005, 'E5', 200.75), (3006, 1005, 2006, 'F6', 320.8), (3007, 1006, 2007, 'G7', 400), (3008, 1007, 2008, 'H8', 280.5), (3009, 1008, 2009, 'I9', 380), (3010, 1009, 2010, 'J10', 420.25), (3011, 1010, 2011, 'K11', 330), (3012, 1011, 2012, 'L12', 460.75), (3013, 1012, 2013, 'M13', 340), (3014, 1013, 2014, 'N14', 420.5), (3015, 1014, 2015, 'O15', 280.8), (3016, 1015, 2016, 'P16', 390), (3017, 1016, 2017, 'Q17', 320.25), (3018, 1017, 2018, 'R18', 410.5), (3019, 1018, 2019, 'S19', 290), (3020, 1019, 2020, 'T20', 370.75)")
# connection2.execute(q14)
# connection2.execute(q15)
# connection2.execute(q16)


# ------------------ schema 5

# q17 = text("CREATE TABLE Genres (genre_id INT PRIMARY KEY, genre_name VARCHAR(30))")
# q18 = text("CREATE TABLE Artists (artist_id INT PRIMARY KEY, artist_name VARCHAR(50), country VARCHAR(50), genre_id INT, FOREIGN KEY (genre_id) REFERENCES Genres(genre_id))")
# q19 = text("CREATE TABLE Albums (album_id INT PRIMARY KEY, album_name VARCHAR(50), year INT, artist_id INT, FOREIGN KEY (artist_id) REFERENCES Artists(artist_id))")
# q20 = text("CREATE TABLE Songs (song_id INT PRIMARY KEY, song_title VARCHAR(50), album_id INT, FOREIGN KEY (album_id) REFERENCES Albums(album_id))")
# connection2.execute(q17)
# connection2.execute(q18)
# connection2.execute(q19)
# connection2.execute(q20)

# q21 = text("INSERT INTO Genres (genre_id, genre_name) VALUES (301, 'Rock'), (302, 'Pop'), (303, 'Jazz'), (304, 'Country'), (305, 'Indie'), (306, 'Hip Hop'), (307, 'Electronic'), (308, 'Reggae'), (309, 'Classical'), (310, 'Salsa'), (311, 'Funk'), (312, 'Bollywood'), (313, 'Soul'), (314, 'Gospel')")
# q22 = text("INSERT INTO Artists (artist_id, artist_name, country, genre_id) VALUES (201, 'Queen', 'United Kingdom', 301), (202, 'The Rolling Stones', 'United Kingdom', 301), (203, 'Taylor Swift', 'United States', 302), (204, 'Miles Davis', 'United States', 303), (205, 'Johnny Cash', 'United States', 304), (206, 'Beyoncé', 'United States', 302), (207, 'Arctic Monkeys', 'United Kingdom', 305), (208, 'Eminem', 'United States', 306), (209, 'Daft Punk', 'France', 307), (210, 'B.B. King', 'United States', 304), (211, 'Bob Marley', 'Jamaica', 308), (212, 'Ludwig van Beethoven', 'Germany', 309), (213, 'Nirvana', 'United States', 305), (214, 'Metallica', 'United States', 306), (215, 'Celia Cruz', 'Cuba', 310), (216, 'James Brown', 'United States', 311), (217, 'A.R. Rahman', 'India', 312), (218, 'Aretha Franklin', 'United States', 313), (219, 'Brian Eno', 'United Kingdom', 307), (220, 'Mahalia Jackson', 'United States', 314)")
# q23 = text("INSERT INTO Albums (album_id, album_name, year, artist_id) VALUES (101, 'Greatest Hits', 1995, 201), (102, 'Rock Anthems', 2002, 202), (103, 'Pop Sensations', 2010, 203), (104, 'Classic Jazz', 1998, 204), (105, 'Country Roads', 2005, 205), (106, 'R&B Grooves', 2012, 206), (107, 'Indie Classics', 2008, 207), (108, 'Hip Hop Hits', 2015, 208), (109, 'Electronic Vibes', 2006, 209), (110, 'Blues Legends', 1997, 210), (111, 'Reggae Roots', 2011, 211), (112, 'Classical Masterpieces', 2000, 212), (113, 'Alternative Rewind', 2009, 213), (114, 'Metal Mayhem', 2014, 214), (115, 'Latin Salsa', 2003, 215), (116, 'Funky Grooves', 2007, 216), (117, 'Bollywood Beats', 2013, 217), (118, 'Soulful Sounds', 1999, 218), (119, 'Ambient Dreams', 2016, 219), (120, 'Gospel Favorites', 2004, 220)")
# q24 = text("INSERT INTO Songs (song_id, song_title, album_id) VALUES (1001, 'Bohemian Rhapsody', 101), (1002, 'Paint It Black', 102), (1003, 'Shake It Off', 103), (1004, 'So What', 104), (1005, 'Ring of Fire', 105), (1006, 'Love On Top', 106), (1007, 'Do I Wanna Know?', 107), (1008, 'Lose Yourself', 108), (1009, 'Around the World', 109), (1010, 'The Thrill Is Gone', 110), (1011, 'One Love', 111), (1012, 'Moonlight Sonata', 112), (1013, 'Smells Like Teen Spirit', 113), (1014, 'Enter Sandman', 114), (1015, 'Suavemente', 115), (1016, 'Get Up (I Feel Like A)', 116), (1017, 'Chaiyya Chaiyya', 117), (1018, 'Respect', 118), (1019, 'Ambient Bliss', 119), (1020, 'Amazing Grace', 120)")
# connection2.execute(q21)
# connection2.execute(q22)
# connection2.execute(q23)
# connection2.execute(q24)


# ---- Test removal 
# q_ = text("drop table Inventory")
# connection2.execute(q_)
# q_ = text("drop table Products")
# connection2.execute(q_)



qf = text("Show TABLES")
resultf = connection2.execute(qf)
for i in resultf:
    print(i)