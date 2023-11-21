from sqlalchemy import create_engine, text

# Install 
# - pip install mysql-connector-python
# - pip install sqlalchemy


# DB 1 - rfa373 (Datawiz App Platform DB)
print("DB 1 - DW-AP DB - rfa373")

# Connect to the database
engine = create_engine("mysql+mysqlconnector://sql12657821:dyMDPWtEP5@sql12.freemysqlhosting.net/sql12657821")

# Test the connection
connection = engine.connect()
# q = text("CREATE TABLE filters (filter_id INT AUTO_INCREMENT PRIMARY KEY, filter_name VARCHAR(50), mark decimal(5,2))")
q1 = text("show tables")
# connection.execute(q)
result = connection.execute(q1)

for i in result:
    print(i)


# DB 2 - rfa71 (Schema DB)
print("\nDB 2 - Schema DB - rfa71")

# Connect to the database
engine2 = create_engine("mysql+mysqlconnector://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

# Test the connection
connection2 = engine2.connect()
# q = text("CREATE TABLE filters (filter_id INT AUTO_INCREMENT PRIMARY KEY, filter_name VARCHAR(50), mark decimal(5,2))")
q2 = text("show tables")
# connection.execute(q)
result2 = connection2.execute(q2)

for i in result2:
    print(i)