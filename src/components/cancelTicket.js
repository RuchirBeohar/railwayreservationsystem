import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Delete from "../resources/cancel.png";
import Swal from 'sweetalert2';

import AdminNavigationBar from "../components/adminNavigationBar";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function CancelTicket() {
  const [state, setState] = useState([]);
  const [pnr, setPnr] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (state.length > 0) {
      deleteTicket(state[0].id);
    }
  }, [state]);

  function onSubmit(e) {
    e.preventDefault();
    axios
      .get(`http://localhost:9955/orders/findByPNR/${pnr}`)
      .then(response => {
        const { data } = response;
        setState(response.data);
        if (response.status==200) {
            //we will call the function when state value is greater than 0.
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
  function deleteTicket(id) {
    axios
      .delete(`http://localhost:9955/orders/del/${id}`)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'PNR number matched... Ticket deleted successfully',
          showConfirmButton: true,
          timer: 20000
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete ticket',
          showConfirmButton: true,
          timer: 20000
        });
      });
  }

  function delTicket(e) {
    setPnr(e.target.value);
    setErrorMessage('');
  }

  return (
    <div>
      <Container fluid className="mb-5">
        <Row xs={1} md={2}>
          <Col>
            <img src={Delete} className="img-fluid p-3" alt="Sample image" style={{
              width: '75%', marginLeft: '50px', marginTop: '30px'
            }} />
          </Col>
          <Col>
            <center>
              <Card style={{ width: '80%' }} className="mb-5">
                <CardHeader>
                  <h3>Cancel Ticket</h3>
                </CardHeader>
                <form onSubmit={onSubmit}>
                  <label className=" mt-3">Enter PNR number to Cancel Ticket:</label>
                  <br />
                  <input required className="mt-3" name="pnr" onChange={delTicket} value={pnr} />
                  <br />
                  <button className="mt-3" type="submit" style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px', fontWeight: '10px', border: 'none', width: '120px', height: '40px' }}>Cancel</button>
                  {errorMessage && <p className="mt-3" style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
              </Card>
              <p className="mt-4">
                      <strong>Go to Home Page</strong><Link to="/"> Click Here</Link>
                 </p>
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

