import React, { Component, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Update from "../resources/update.png";
import Swal from 'sweetalert2';

import AdminNavigationBar from "../components/adminNavigationBar";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function UpdateTrain() {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  function onSubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:9030/trains/${id}`)
      .then(response => {
        const { data } = response;
        console.log(response);
        if (response.status==200) {
          // window.alert("Train Route Removed Successfully");
          sessionStorage.setItem('updateData', JSON.stringify(data));
          Swal.fire({
            icon: 'success',
            title: 'Train Number Matched... Redirecting you to Updation page',
            showConfirmButton: true,
             timer: 20000
          }).then(() => {
            navigate("/uptodateTrain");
          });

        } 
      })
      .catch(error =>
        //  window.alert("No Train with Given ID found")
        Swal.fire({
          icon: 'error',
          title: 'No Train with the given ID found!',
          showConfirmButton: true,
           timer: 20000
        })
      );
  }

  function changeId(e) {
    setId(e.target.value);
    setErrorMessage('');
  }

  return (
    <div>
      <AdminNavigationBar />
      <br /> <br />
      <Container fluid>
        <Row xs={1} md={2}>
          <Col>
            <img src={Update} className="img-fluid p-3" alt="Sample image" style={{
              width: '75%', marginLeft: '50px', marginTop: '0px'
            }} />
          </Col>
          <Col>
            <center>
              <Card style={{ width: '80%' }} className="mb-5">
                <CardHeader>
                  <h3>Update Train Route</h3>
                </CardHeader>
                <form onSubmit={onSubmit}>
                  <label className=" mt-3">Enter Train Number to Update:</label>
                  <br />
                  <input required className="mt-3" name="id" onChange={changeId} value={id} />
                  <br />
                  <button className="mt-3" type="submit" style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px', fontWeight: '10px', border: 'none', width: '100px', height: '40px' }}>Search</button>
                  {errorMessage && <p className="mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
              </Card>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

