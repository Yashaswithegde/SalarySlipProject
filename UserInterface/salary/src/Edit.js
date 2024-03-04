function SaveEdit(emp) {
  console.log('Save edit is invoked');
  var myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify([
    {
      id: emp.id,
      name: emp.name,
      department: emp.department,
      designation: emp.designation,
      contact: emp.contact,
      email: emp.email,
      address: emp.address,
    },
  ]);
  console.log(raw);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
  };
  console.log('Request Options');
  console.log(requestOptions);
  fetch('http://127.0.0.1:5000/update-employee', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
}

export default SaveEdit;
