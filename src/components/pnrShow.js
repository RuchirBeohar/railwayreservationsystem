import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import search from "../resources/search.png";
import Swal from 'sweetalert2';

import AdminNavigationBar from "../components/adminNavigationBar";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function PnrShow() {
  const [state, setState] = useState([]);
  const [pnr, setPnr] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:9955/orders/findByPNR/${pnr}`)
      .then(response => {
        const { data } = response;
        setState(response.data);
        if (response.status==200) {
            Swal.fire({
                icon: 'success',
                title: 'PNR number matched',
                showConfirmButton: true,
                 timer: 20000
              })
        } 

      })
      .catch(error =>
        //  window.alert("No Train with Given ID found")
        Swal.fire({
          icon: 'error',
          title: 'No PNR with the given PNR number found!',
          showConfirmButton: true,
           timer: 20000
        })
      );
  }

  function changePnr(e) {
    setPnr(e.target.value);
    setErrorMessage('');
  }

  return (
    <div>
      <Container fluid className="mb-5">
        <Row xs={1} md={2}>
          <Col>
            <img src={search} className="img-fluid p-3" alt="Sample image" style={{
              width: '75%', marginLeft: '50px', marginTop: '30px'
            }} />
          </Col>
          <Col>
            <center>
              <Card style={{ width: '80%' }} className="mb-5">
                <CardHeader>
                  <h3>Ticket Details Using PNR number</h3>
                </CardHeader>
                <form onSubmit={onSubmit}>
                  <label className=" mt-3">Enter PNR Number:</label>
                  <br />
                  <input required className="mt-3" name="pnr" onChange={changePnr} value={pnr} />
                  <br />
                  <button className="mt-3" type="submit" style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px', fontWeight: '10px', border: 'none', width: '120px', height: '40px' }}>Search</button>
                  {errorMessage && <p className="mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
              </Card>
              {state.length > 0 && (
              <Card style={{textAlign:'left', width:'60%'}} className="p-5">
                  <p><strong>PNR Number:</strong> {state[0].pnr}</p>
                  <p><strong>Passenger Name:</strong> {state[0].name}</p>
                  <p><strong>Passenger Mobile Number:</strong> {state[0].mobilenum}</p>
                  <p><strong>Source:</strong> {state[0].startStation}</p>
                  <p><strong>Destination:</strong> {state[0].endStation}</p>
                  <p><strong>Total Passenger:</strong> {state[0].quantity}</p>
             </Card>
             )}
                 <p className="mt-3">
                      <strong>Cancel Ticket?</strong><Link to="/cancelTicket"> Click Here</Link>
                 </p>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

