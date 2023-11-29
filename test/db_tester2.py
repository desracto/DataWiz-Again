from sqlalchemy import create_engine, text

# print("\nDB 2 - Schema DB - rfa71")

# Connect to the database
engine = create_engine("mysql+mysqlconnector://sql12658112:yFlLxXMggz@sql12.freemysqlhosting.net/sql12658112")

# Test the connection
connection = engine.connect()

# (emp_id, first_name, last_name, age, dept, salary) 
# q = text("INSERT INTO employees VALUES (102, 'John', 'Doe', 30, 'Sales', 50000)")
# connection.execute(q)
q2 = text("INSERT INTO employees (emp_id, first_name, last_name, age, dept, salary) VALUES (101, 'John', 'Doe', 30, 'Sales', 50000), (102, 'Jane', 'Smith', 28, 'Marketing', 48000), (103, 'Michael', 'Johnson', 35, 'HR', 55000), (104, 'Emily', 'Williams', 24, 'IT', 52000),(105, 'Robert', 'Brown', 32, 'Finance', 60000), (106, 'Lisa', 'Lee', 29, 'Sales', 49000), (107, 'David', 'Kim', 27, 'Marketing', 47000), (108, 'Sarah', 'Anderson', 33, 'HR', 56000), (109, 'James', 'Martinez', 25, 'IT', 53000), (110, 'Olivia', 'Harris', 31, 'Finance', 61000), (111, 'Ethan', 'Lewis', 26, 'Sales', 48000), (112, 'Mia', 'Clark', 34, 'Marketing', 49000), (113, 'Alexander', 'Allen', 29, 'HR', 55000), (114, 'Sophia', 'Wright', 27, 'IT', 54000), (115, 'Daniel', 'Scott', 32, 'Finance', 60000)")
connection.execute(q2)


query = text("SELECT * FROM employees")

result1 = connection.execute(query)
print("query executed")

ans = []

for i in result1:
    print(i)
    ans.append(i)

print(len(ans[0]))

print(type(ans[0]))
# print(type(ans[0][0]))
