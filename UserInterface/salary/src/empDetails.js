import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './form';

const EmpDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployeeId, setEditedEmployeeId] = useState(null);
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(10);

  useEffect(() => {
    fetch('http://localhost:5000/display-employee')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
        setFilteredEmployees(data.employees);
      });
  }, []);

  const handleMinExperienceChange = (e) => {
    setMinExperience(parseInt(e.target.value, 10));
    filterEmployees(searchTerm, parseInt(e.target.value, 10), maxExperience);
  };

  const handleMaxExperienceChange = (e) => {
    setMaxExperience(parseInt(e.target.value, 10));
    filterEmployees(searchTerm, minExperience, parseInt(e.target.value, 10));
  };

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterEmployees(term, minExperience, maxExperience);
  };

  const filterEmployees = (term, minExp, maxExp) => {
    const filtered = employees.filter((emprec) => {
      console.log('emprec: ', emprec);
      const nameMatches = emprec.name.toLowerCase().includes(term);
      const experienceInRange =
        emprec.years_of_experience >= minExp &&
        emprec.years_of_experience <= maxExp;
      return nameMatches && experienceInRange;
    });
    setFilteredEmployees(filtered);
  };

  const handleClick = () => {
    setIsCreating(true);
  };

  const handleDelete = (employeeId) => {
    fetch(`http://localhost:5000/delete-employee/${employeeId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setEmployees(
            employees.filter((employee) => employee.id !== employeeId)
          );
          setFilteredEmployees(
            filteredEmployees.filter((employee) => employee.id !== employeeId)
          );
        } else {
          console.error('Error deleting employee:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting employee:', error));
  };

  const handleEdit = (id) => {
    const employee = employees.find((employee) => employee.id === id);
    setSelectedEmployee(employee);
    setIsCreating(true);
  };

  const handleDoubleClick = (id) => {
    setIsEditing(true);
    setEditedEmployeeId(id);
  };

  const handleChange = (e, field, employeeId) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === employeeId) {
        return { ...employee, [field]: e.target.value };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  return (
    <div className="container">
      <h1 className="heading">Workforce Wizards</h1>
      {isCreating && (
        <div>
          <Form employee={selectedEmployee} />
          <button onClick={() => setIsCreating(false)}>
            Cancel Create Employee
          </button>
        </div>
      )}
      {!isCreating && (
        <div>
          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Years Of Experience</th>
                  <th>Contact</th>
                  <th>E-mail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <a
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleEdit(employee.id);
                        }}
                      >
                        [e]
                      </a>
                    </td>
                    <td>{employee.id}</td>
                    <td>
                      {isEditing && editedEmployeeId === employee.id ? (
                        <input
                          type="text"
                          value={employee.name}
                          onChange={(e) => handleChange(e, 'name', employee.id)}
                          onBlur={() => setIsEditing(false)}
                        />
                      ) : (
                        <span
                          onDoubleClick={() => handleDoubleClick(employee.id)}
                        >
                          {employee.name}
                        </span>
                      )}
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.years_of_experience}</td>
                    <td>{employee.contact}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className="del"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              className="add"
              onClick={handleClick}
              style={{ padding: '10px', margin: '10px' }}
            >
              Add Employee
            </button>
          </div>
          <div className="filter">
            <p>Search By Name:</p>
            <input
              type="text"
              placeholder="Search By Name"
              value={searchTerm}
              onChange={handleFilter}
              style={{
                width: '80%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                margin: '15px',
              }}
            />
            <p>Filter By Experience:</p>
            <label>Minimum Experience:</label>
            <input
              type="number"
              value={minExperience}
              onChange={handleMinExperienceChange}
            />
            <label>Maximum Experience:</label>
            <input
              type="number"
              value={maxExperience}
              onChange={handleMaxExperienceChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpDetails;
