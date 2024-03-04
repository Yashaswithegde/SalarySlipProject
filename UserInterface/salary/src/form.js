import './Form.css';
import { useState, useEffect } from 'react';
import Save from './Save';
// import Edit from './Edit';
const Form = ({ employee }) => {
  const [name, setName] = useState(employee ? employee.name : '');
  const [department, setDepartment] = useState(
    employee ? employee.department : ''
  );
  const [designation, setdesignation] = useState(employee?.designation);
  const [contact, setcontact] = useState(employee?.contact);
  const [join, setjoin] = useState(employee?.join);
  const [email, setemail] = useState(employee?.email);
  const [address, setaddress] = useState(employee?.address);
  // const [Editing, setisEditing] = useState(false);
  useEffect(() => {
    console.log(employee);
    console.log(name);
    // console.log(setName);
    console.log(department);
    // console.log(setDepartment);
  }, [name, department]);

  return (
    <>
      <form className="row">
        <div className="Column1">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={(e) => setdesignation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
            />
          </div>
        </div>
        <div className="column2">
          <div>
            <label htmlFor="day">join Date:</label>
            <input
              type="text"
              id="day"
              name="day"
              value={join}
              onChange={(e) => setjoin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
        </div>

        <Save
          id={employee?.id}
          name={name}
          department={department}
          designation={designation}
          contact={contact}
          join={join}
          email={email}
          address={address}
          isEditing={employee ? true : false}
        />
      </form>
    </>
  );
};
export default Form;
