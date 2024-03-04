from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasklists.db'
db = SQLAlchemy(app)
CORS(app)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    department = db.Column(db.String(255), nullable=False)
    designation = db.Column(db.String(255), nullable=False)
    contact = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    joining = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(500), nullable=False)

    def __str__(self):
        return "id " + str(self.id) + " name " + self.name + " department " + self.department

with app.app_context():
    db.create_all()


@app.route('/salary', methods=['POST'])
def create_employee():
    data = request.get_json()

    # Check if an employee with the provided ID already exists
    if not Employee.query.filter_by().first():
        new_employee = Employee(name=data['name'], department=data['department'], designation=data['designation'], contact=data['contact'], email=data['email'], joining=data['joining'], address=data['address'])
        db.session.add(new_employee)
        db.session.commit()  # Commit the employee addition

        return jsonify({'message': 'Employee added successfully'}), 201
    else:
        return jsonify({'error': 'Employee already exists'}), 400


@app.route('/salary', methods=['GET'])
def get_employee():
    employee = Employee.query.filter_by().first()

    if employee:
        return jsonify({'employee': employee.name, 'department': employee.department, 'designation': employee.designation, 'contact': employee.contact, 'email': employee.email, 'joining': employee.joining, 'address': employee.address})
    else:
        return jsonify({'error': 'Employee does not exist'}), 404
    
@app.route('/salary', methods=['PUT'])
def update_tasklist():
    data = request.get_json()
    updated_entry = Employee.query.filter_by().first()

    if updated_entry:
        updated_entry.id = data['id']
        updated_entry.name = data['name']
        updated_entry.department = data['department']
        updated_entry.designation = data['designation']
        updated_entry.contact = data['contact']
        updated_entry.email = data['email']
        # updated_entry.joining = data['joining']
        updated_entry.address= data['address']

        db.session.commit()
        return jsonify({'message': 'Employee details updated successfully'})
    else:
        return jsonify({'error': 'Employee details does not exist before'}), 404 
    
# Endpoint to delete a user's tasklist
@app.route('/salary', methods=['DELETE'])
def delete_tasklist():
    delete_entry = Employee.query.filter_by().first()

    if delete_entry:
        db.session.delete(delete_entry)
        db.session.commit()
        return jsonify({'message': 'Employee details deleted successfully'})
    else:
        return jsonify({'error': 'Employee details does not exist'}), 404

if __name__ == '__main__':
    app.run(debug=True)
