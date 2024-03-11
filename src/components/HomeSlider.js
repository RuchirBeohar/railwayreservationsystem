import React, { Component } from "react";
import { Slide } from "react-slideshow-image";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//importing the images
import slide1 from "../resources/s2.jpg";
import slide2 from "../resources/slider1.jpg";
import slide3 from "../resources/s3.jpg";
import c from "../resources/contact.png";
//save it to an array
const slideImages = [slide1, slide2, slide3];

//slider properties
const properties = {
  duration: 10000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};


export default class HomeSlider extends Component {
  render() {
    return (
      <div>
        <Container fluid className="p-5">
      <Carousel >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 style={{fontFamily:'roboto' , fontWeight:'bold'}}>Login To Book Ticket...</h3>
          <br/>
          <Link className="p-3" to = "/login" style={{fontFamily:'roboto',backgroundColor:'black',color:'white' ,borderRadius:'3px',border:'none' ,width:'150px'}}>
             Login
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 style={{fontFamily:'roboto', fontWeight:'bold'}}>New User? Register Now...</h3>
          <br/>
          <Link to = "/signUp" className="p-3" style={{fontFamily:'roboto', backgroundColor:'black',color:'white' ,borderRadius:'3px',border:'none' ,width:'150px'}}>
             Register
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 style={{fontFamily:'roboto', color:'white',fontWeight:'bold'}}>SAFETY | SECURITY | PUNCTUALITY</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Container>

    <Container className='p-5'>
      <div style={{fontSize:'20px'}}>
        <h4 className="p-2 px-3 mb-3" style={{background:'black', color:'white'}}><center>FAQ</center></h4>
        
        <h5>Q. How to Book Ticket?</h5>
        <div className="mt-3" style={{fontFamily:'roboto', fontSize:'1.15rem'}}>
        <p>
         1. Login/Register to the Website.
       </p>
       <p>
        2. Search for Trains: Start by searching for available trains based on your desired source and destination stations, as well as the date of travel.
       </p>
       <p>
        3. Select Train : Once you find a suitable train, choose it.
       </p>
       <p>
       4. Review and Confirm: Review your booking details, including the train name, sourec, destination and date. Verify that everything is correct before proceeding.
      </p>
       <p>
       5. Make Payment: Select a payment method and provide the necessary payment details to complete the booking. Online payment options usually include credit/debit cards, net banking, or digital wallets.
       </p>
       <p>
       6. Receive Confirmation: After successful payment, you will receive a confirmation message or email with your ticket details. It will contain a unique PNR (Passenger Name Record) number, which is essential for future references.
       </p>
       </div>
       </div>
    </Container>

    <Container className="mb-5 mt-5">
      <Card className="p-5" style={{width:'100%'}}>
      <center>
        <h5 className="mb-4">Any Query Contact Us...</h5>
        <Link  className="mb-5 p-3" to="/contactAdmin" style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}}>Contact</Link>
      </center>
      </Card>
    </Container>


    {/* <div>
      <a href="https://www.facebook.com/learnbuildteach/"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://www.twitter.com/jamesqquick" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.instagram.com/learnbuildteach"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
     */}
    </div>
    );
  }
}
