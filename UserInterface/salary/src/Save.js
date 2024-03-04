import SaveEdit from './Edit';

const Save = ({
  id,
  name,
  department,
  designation,
  contact,
  join,
  email,
  address,
  isEditing,
}) => {
  const saveToServer = () => {
    console.log("It's editing" + isEditing);
    console.log("It's email" + email);
    const emp = {
      id: id,
      name,
      department,
      designation,
      contact,
      join,
      email,
      address,
    };
    if (isEditing === true) {
      SaveEdit(emp);
    } else {
      saveNewEmployee(emp);
    }
  };
  const saveNewEmployee = (emp) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var rawUserData = JSON.stringify({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      designation: emp.designation,
      contact: emp.contact,
      join: emp.join,
      email: emp.email,
      address: emp.address,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawUserData,
      redirect: 'follow',
    };

    fetch('http://127.0.0.1:5000/create-employee', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <button type="submit" onClick={saveToServer}>
      Submit
    </button>
  );
};

export default Save;
