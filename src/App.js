import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
//importing the components
import TrainList from "./components/TrainList";
import HomeSlider from "./components/HomeSlider";
import TicketBooking from "./components/TicketBooking";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PaymentMethod from "./components/PaymentMethod";
import PaytmPG from "./components/PaytmPG";
import SBIBankPG from "./components/SBIBankPG";
import ThankYouMessage from "./components/ThankYouMessage";
import AdminSignIn from "./components/adminSignIn";
import CreateTrain from "./components/createTrain";
import DeleteTrain from "./components/deleteTrain";
import AdminNavigationBar from "./components/adminNavigationBar";
import ContactAdmin from "./components/contactAdmin";
import ContactDetails from "./components/contactDetails";
import BookingDetails from "./components/bookingDetails";
import PnrShow from "./components/pnrShow";
import CancelTicket from "./components/cancelTicket";
import UpdateTrain from "./components/updateTrain";
import UptodateTrain from "./components/uptodateTrain";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

//importing the images
import navImage from "./resources/navnew3.jpg";
import trainicon from "./resources/trainicon.png";
import Image from 'react-bootstrap/Image';
import './App.css';


function App() {
  return (
    <Router>
      <div className="navImage">
        <a href="">
          <img src={navImage} className="image" />
        </a>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/trainlist"
                className="nav-link"
                style={{ color: "white" }}
              >
                Train Availability
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/signUp"
                className="nav-link"
                style={{ color: "white" }}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/booking"
                className="nav-link"
                style={{ color: "white" }}
              >
                Book Train Tickets
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/pnrShow"
                className="nav-link"
                style={{ color: "white" }}
              >
                Ticket Details
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link
                to="/adminSignIn"
                className="nav-link"
                style={{ color: "white" }}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Switching between components */}
      <Routes>
        <Route path="/" element={<HomeSlider />} />
        <Route path="/trainlist" element={<TrainList />} />
        <Route path="/booking" element={<TicketBooking />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/submitPaymentDetail" element={<PaytmPG />} />
        <Route path="/thankyou" element={<ThankYouMessage />} />
        <Route path="/sbipg" element={<SBIBankPG />} />
        <Route path="/adminSignIn" element={<AdminSignIn />} />
        <Route path="/addTrain" element={<CreateTrain />} />
        <Route path="/delTrain" element={<DeleteTrain />} />
        <Route path="/adminNav" element={<AdminNavigationBar />} />
        <Route path="/contactAdmin" element={<ContactAdmin />} />
        <Route path="/contactDetails" element={<ContactDetails />} />
        <Route path="/bookingDetails" element={<BookingDetails />} />
        <Route path="/pnrShow" element={<PnrShow />} />
        <Route path="/cancelTicket" element={<CancelTicket />} />
        <Route path="/updateTrain" element={<UpdateTrain />} />
        <Route path="/uptodateTrain" element={<UptodateTrain />} />
      </Routes>    

<footer
  className="footer"
  style={{ backgroundColor: "seagreen", width: "100%", height: 60, textAlign: 'center' }}
>
  {/* social media links */}
  <div className="social-media" style={{ display: 'flex', justifyContent: 'center'}}>
    <a style={{ color: 'black', fontSize: '1.02rem', marginRight: '20px' }} href="https://www.facebook.com/IRCTCofficial/" target="_blank" rel="noopener noreferrer">
      <FaFacebook />
    </a>
    <a style={{ color: 'black', fontSize: '1.02rem',marginRight: '20px' }} href="https://twitter.com/IRCTCofficial" target="_blank" rel="noopener noreferrer">
      <FaTwitter />
    </a>
    <a style={{ color: 'black', fontSize: '1.02rem'}} href="https://www.instagram.com/irctc.official/?igshid=yyg5byow704l" target="_blank" rel="noopener noreferrer">
      <FaInstagram />
    </a>
  </div> 
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src={trainicon} width="40" alt="Train Icon" />
    <div style={{ color: "white" }}></div>
  </div>
</footer>

    </Router>
  );
}

export default App;
