import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import r from "../resources/remove.png";
import Swal from 'sweetalert2';

import AdminNavigationBar from "../components/adminNavigationBar";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function DeleteTrain() {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    axios
      .delete(`http://localhost:9030/trains/delete/${id}`)
      .then(response => {
        const { data } = response;
        console.log(response);
        if (response.status==200) {
          // window.alert("Train Route Removed Successfully");
          Swal.fire({
            icon: 'success',
            title: 'Train Route Removed Successfully',
            showConfirmButton: true,
             timer: 20000
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
            <img src={r} className="img-fluid p-3" alt="Sample image" style={{
              width: '75%', marginLeft: '50px', marginTop: '30px'
            }} />
          </Col>
          <Col>
            <center>
              <Card style={{ width: '80%' }} className="mb-5">
                <CardHeader>
                  <h3>Remove Train Route</h3>
                </CardHeader>
                <form onSubmit={onSubmit}>
                  <label className=" mt-3">Enter Train Number:</label>
                  <br />
                  <input required className="mt-3" name="id" onChange={changeId} value={id} />
                  <br />
                  <button className="mt-3" type="submit" style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px', fontWeight: '10px', border: 'none', width: '150px', height: '50px' }}>Remove Route</button>
                  {errorMessage && <p className="mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
                  <h6 className="mt-3">
                    <Link to={"/trainlist"}>Go Back To Your Train List.</Link>
                  </h6>
                </form>
              </Card>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

