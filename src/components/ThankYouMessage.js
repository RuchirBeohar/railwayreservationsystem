import React, { Component } from "react";
import { Link } from "react-router-dom";
import thankyouimg from "../resources/tq.png";
import { json } from "body-parser";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SELECTEDCLASS } from "./TicketBooking";

class ThankYouMessage extends Component {

  componentDidMount() {
    this.saveDataToDatabase();
  }
  
  saveDataToDatabase = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    const rn =  randomNumber.toString();
    // Get the card values from session storage
    let data = {
      quantity: sessionStorage.getItem('NOOFTICKETS'),
      startStation: sessionStorage.getItem('SOURCE'),
      endStation: sessionStorage.getItem('DESTINATION'),
      pnr: sessionStorage.getItem('rn'),
      name: sessionStorage.getItem('name'),
      mobilenum: sessionStorage.getItem('mobilenum'),
    };
    fetch('http://localhost:9955/orders/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the server
        console.log('Thankyou Success');
        // Perform any additional actions if needed
      })
      .catch(error => {
        // Handle errors
        console.log(error);
      });
  };


  render() {

    let date = sessionStorage.getItem('date');
    let name = sessionStorage.getItem('name');
    let pnr = sessionStorage.getItem('rn');
    let age = sessionStorage.getItem('age');
    let mobilenum = sessionStorage.getItem('mobilenum');
    let source = sessionStorage.getItem('SOURCE');
    let destination = sessionStorage.getItem('DESTINATION');
    let nooftickets = sessionStorage.getItem('NOOFTICKETS');
    let total = sessionStorage.getItem('TOTAL');
    let selectedclass = sessionStorage.getItem('SELECTEDCLASS');
    console.log(nooftickets);

    return (
      <div className="mb-5">
          <Container fluid className="p-5">
            <Row xs={1} md={2}>
              <Col>
              <center>
          <img src={thankyouimg} width="70%" style={{marginTop:'150px'}}/>
          </center>
          </Col>
          <Col >
          <center className="p-5">
          <h2 className="" style={{color:'seagreen'}}>Thankyou!</h2>
          <h5>Your Booking is Completed</h5>
          <h5 className="mt-3 mb-3" > You will get the affirmation message by SMS and Email Soon.</h5>
          <Card style={{textAlign:'left', width:'60%'}} className="p-5">
             <p><strong>Date:</strong>{date}</p>
            <CopyToClipboard text={pnr}>
            <p><strong>PNR Number:</strong> {pnr}{" "}
               <span style={{ cursor: "pointer", color: "blue" }}>Copy</span>
            </p>
            </CopyToClipboard>
             {/* {nooftickets}{total}8792345 */}
             <p><strong>Passenger Name:</strong> {name}</p>
             <p><strong>Passenger Age:</strong> {age}</p>
             <p><strong>Passenger Mobile Number:</strong> {mobilenum}</p>
             <p><strong>Source:</strong> {source}</p>
             <p><strong>Destination:</strong> {destination}</p>
             <p><strong>Ticket Type:</strong> {selectedclass}</p>
             <p><strong>Total Passenger:</strong> {nooftickets}</p>
             <p><strong>Total Amount:</strong> {total}</p>
          </Card>
          <br/>
          <Link className="p-3 mt-5"
            to="/"
            style={{
              backgroundColor: "black",
              color: "white",
              width:'70%',
              textDecoration:'none'
            }}
          >
            {" "}
            Go to Home{" "}
          </Link>
          </center>
          </Col>
          </Row>
          </Container>
      </div>
    );
  }
}

export default ThankYouMessage;