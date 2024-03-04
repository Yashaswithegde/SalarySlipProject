import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('./instance/tasklists.db')

# Create a cursor object
cursor = conn.cursor()

# Execute SQL query (example: select all records from a table)
cursor.execute('SELECT * FROM Employee');
# cursor.execute('pragma table_info(Employee);')  
# Fetch results
rows = cursor.fetchall()

# Print the results
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()

