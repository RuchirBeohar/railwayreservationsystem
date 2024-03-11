import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import contact from "../resources/contact.png";
import Swal from 'sweetalert2';


const ContactAdmin = () => {
  // const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [queryInput, setqueryInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(queryInput);
    console.log(name);
    console.log(phoneNumber);

    let is = "true";
    // if(id === ""){
    //   const domain = window.location.hostname;
    //   // alert("please provide ID!");
      
    //   Swal.fire({
    //     icon: 'info',
    //     title: 'Please Provide ID!',
    //     showConfirmButton: true,
    //     timer: 20000
    //    });
    //     is = "false";
    //     window.location.href="/contactAdmin"
    // }
    // else if(name === ""){
    //   // alert("please provide Name");
    //    Swal.fire({
    //     icon: 'info',
    //     title: 'Please Provide Name!',
    //     showConfirmButton: true,
    //      timer: 20000
    //   });
    //   is = "false";
    //   window.location.href="/contactAdmin";
    // }
    if(phoneNumber.length !== 10){
      //alert("phone number must be of 10 digits!");
       Swal.fire({
        icon: 'info',
        title: 'Phone number must be of 10 digits!',
        showConfirmButton: true,
         timer: 20000
      });
      is = "false";
      window.location.href="/contactAdmin";
    }

    if(is === "true"){
    // Send the form data to the backend
    fetch('http://localhost:9050/contacts/addContact', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        "Accept": "application/json",
      },
      body: JSON.stringify({
        // id : id,
        name: name,
        phoneNumber: phoneNumber,
        query:queryInput
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Form data submitted successfully:', data);
      // Perform any additional actions after submitting the form
    })
    .catch(error => {
      if(is === "true"){
        //alert("Form data submitted successfully!")
        Swal.fire({
          icon: 'success',
          title: 'Form Data Submitted Successfully!',
          showConfirmButton: true,
          timer: 20000
        });
        window.location.href = "/";
      }  
      //console.error('Error submitting form data',error);
      // Handle any errors that occur during form submission
    });
  };
}

  return (
    <div>
      <Row xs={1} md={2}>
        <Col style={{marginLeft:'100px !important'}}> 
          <img src={contact} className="img-fluid p-3" alt="Sample image" style={{
            width:'75%' ,marginLeft:'50px' ,marginTop:'30px'
          }} />
        </Col>
        <Col>
    <Container fluid style={{ paddingTop: '30px' }}>
    <Card className="p-5 mb-5" style={{ width: 'auto' }}>
      <h3>Contact Us</h3>
      <br/>
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label htmlFor="idInput" className="form-label">ID</label>
          <input required type="text" placeholder="Enter valid ID" className="form-control" id="idInput" value={id} onChange={(e) => setId(e.target.value)} />
        </div> */}
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input required type="text" placeholder="Enter Full Name" className="form-control" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneInput" className="form-label">Phone Number</label>
          <input required type="text" placeholder="Enter Phone Number" className="form-control" id="phoneInput" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="queryInput" className="form-label">Query</label>
          <input required type="text" placeholder="Enter Your Query" className="form-control" id="queryInput" value={queryInput} onChange={(e) => setqueryInput(e.target.value)} />
        </div>
        <button style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}} type="submit" className="btn btn-primary p-2">Submit</button>
      </form>
      </Card>
      </Container>
      </Col>
    </Row>
    </div>
  );
};

export default ContactAdmin;
