import datetime
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
    joindate = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(500), nullable=False)

    def __str__(self):
        return "id " + str(self.id) + " name " + self.name + " department " + self.department
    
class Employee_Data():
    id=0
    name=""
    department=""
    designation=""
    contact=""
    email=""
    joindate=""
    address=""

    def __str__(self):
        return "id " + str(self.id) + " name " + self.name + " department " + self.department



with app.app_context():
    db.create_all()

@app.route('/create-employees-batch', methods=['POST'])
def create_employee_batch():
    data = request.get_json()

    for employee_data in data:
        if not Employee.query.filter_by(name=employee_data['name']).first():
            new_employee = Employee(name=employee_data['name'], department=employee_data['department'], designation=employee_data['designation'], contact=employee_data['contact'], email=employee_data['email'], joindate=employee_data['join'], address=employee_data['address'])
            db.session.add(new_employee)

    db.session.commit()
    return jsonify({'message': 'Employees added successfully'}), 201

# @app.route('/create-employee', methods=['POST'])
# def add_employee():
#     employee_data = request.get_json()
#     print("Employee data")
#     employee_data=employee_data['name']
#     print(employee_data)
#     print(employee_data['name'])
#     if not Employee.query.filter_by(name=employee_data['name']).first():
#         new_employee = Employee(name=employee_data['name'],
#                                  department=employee_data['department'], 
#                                  designation=employee_data['designation'], 
#                                  contact=employee_data['contact'], 
#                                  email=employee_data['email'], 
#                                  joindate=employee_data['join'], 
#                                  address=employee_data['address'])
#         db.session.add(new_employee)
#     else:
#         return jsonify({"error": "Employee with this name already exists"}), 409

#     db.session.commit()
#     return jsonify({'message': 'Employees added successfully'}), 201
@app.route('/create-employee', methods=['POST'])
def add_employee():
    employee_data = request.get_json()
    print("Employee data")
    print(employee_data)
    
    if not Employee.query.filter_by(name=employee_data['name']).first():
        new_employee = Employee(name=employee_data['name'],
                                department=employee_data['department'], 
                                designation=employee_data['designation'], 
                                contact=employee_data['contact'], 
                                email=employee_data['email'], 
                                joindate=employee_data['join'], 
                                address=employee_data['address'])
        db.session.add(new_employee)
    else:
        return jsonify({"error": "Employee with this name already exists"}), 409

    db.session.commit()
    return jsonify({'message': 'Employee added successfully'}), 201


# @app.route('/create-employee', methods=['POST'])
# def add_employee():
#     employee_data = request.get_json()
#     print("Employee data")
    
#     print(employee_data)
#     name = employee_data.get('name')
#     print(name)
#     if not name:
#         return jsonify({"error": "Name field is required"}), 400

#     if not Employee.query.filter_by(name=name).first():
#         new_employee = Employee(name=name, department=employee_data.get('department'), designation=employee_data.get('designation'), contact=employee_data.get('contact'), email=employee_data.get('email'), join=employee_data.get('join'), address=employee_data.get('address'))
#         db.session.add(new_employee)
#     else:
#         return jsonify({"error": "Employee with this name already exists"}), 409

#     db.session.commit()
#     return jsonify({'message': 'Employee added successfully'}), 201



@app.route('/display-employee', methods=['GET'])
def get_employee():
    employees = Employee.query.all()
    employee_list = []
    
    for employee in employees:
        employee_data = {
            'id': employee.id,
            'name': employee.name,
            'department': employee.department,
            'designation': employee.designation,
            'contact': employee.contact,
            'email': employee.email,
            'join': employee.joindate,
            'years_of_experience':calculate_years_of_experience(employee.joindate),
            'address': employee.address

        }
        employee_list.append(employee_data)
    
    return jsonify({'employees': employee_list})

@app.route('/update-employee', methods=['PUT'])
def update_employee():
    print("Inside  Update")
    data = request.get_json()

    for employee_data in data:
        print(employee_data['id'])
        print(employee_data['name'] )
        updated_entry = Employee.query.filter_by(id=employee_data['id']).first()
        print(Employee.query.filter_by(id=employee_data['id']).first())
        print("updated entry is ", updated_entry)
        if updated_entry:
            updated_entry.name = employee_data['name']
            updated_entry.department = employee_data['department']
            updated_entry.designation = employee_data['designation']
            updated_entry.contact = employee_data['contact']
            updated_entry.email = employee_data['email']
            # updated_entry.joindate = employee_data['join']
            updated_entry.address = employee_data['address']
            # updated_entry.update()
            # Employee.query.update(updated_entry)

            db.session.commit()
    
    return jsonify({'message': 'Employee details updated successfully'})



@app.route('/delete-employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    employee = Employee.query.get(employee_id)

    if employee:
        db.session.delete(employee)
        db.session.commit()
        return jsonify({'message': 'Employee details deleted successfully'})
    else:
        return jsonify({'error': 'Employee details do not exist'}), 404

from datetime import datetime

def calculate_years_of_experience(joindate):
    join_date = datetime.strptime(joindate, '%Y-%m-%d') 
    current_date = datetime.now()
    years_of_experience = current_date.year - join_date.year
    if current_date.month < join_date.month or (current_date.month == join_date.month and current_date.day < join_date.day):
        years_of_experience -= 1
    print(years_of_experience)
    return years_of_experience

calculate_years_of_experience("2020-03-09")

@app.route('/calculate-experience/<int:employee_id>', methods=['GET'])
def get_employee_experience(employee_id):
    employee = Employee.query.get(employee_id)
    if employee:
        years_of_experience = calculate_years_of_experience(employee.joindate)
        return jsonify({'years_of_experience': years_of_experience})
    else:
        return jsonify({'error': 'Employee not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
