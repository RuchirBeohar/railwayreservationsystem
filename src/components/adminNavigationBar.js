import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/resources/admin-settings-male.png";
import adminProfileIcon from "../../src/resources/user-check.svg";
import createTrainIcon from "../../src/resources/file-plus.svg";
import trainListIcon from "../../src/resources/book-open.svg";
import signOutIcon from "../../src/resources/log-out.svg";
import style from "../../src/style.module.css/admin.style.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default class AdminNavigationBar extends Component {
  render() {
    return (
      // <div className="container-fluid p-0">
      //   <nav className="navbar navbar-expand-lg" style={{backgroundColor:'seagreen'}}>
      //     <a className="navbar-brand" href="/">
      //       <img
      //         src={logo}
      //         width="63"
      //         height="62"
      //         className="d-inline-block align-top"
      //         alt="admin-logo"
      //       />
      //     </a>
      //     <a className="navbar-brand" href="/">
      //       <h2>Admin</h2>
      //     </a>
      //     {/* <Link to="/" className="navbar-brand">
      //       <h2 className="navbar-brand">Admin</h2>
      //     </Link> */}
      //     <div className="collapse  navbar-collapse">
      //       <ul className="navbar-nav  mx-auto">
      //         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      //         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      //         &nbsp;
      //         <li className="navbar-item">
      //           <Link to="/adminProfile" className="nav-link">
      //             <img src={adminProfileIcon} alt="adminProfileIcon" />
      //           </Link>
      //         </li>
      //         &nbsp; &nbsp; &nbsp; &nbsp;
      //         <li className="navbar-item">
      //           <Link to="/trainlist" className="nav-link">
      //             <img src={trainListIcon} alt="trainListIcon" />
      //           </Link>
      //         </li>
      //         &nbsp; &nbsp; &nbsp; &nbsp;
      //         <li className="navbar-item">
      //           <Link to="/addTrain" className="nav-link">
      //             <img src={createTrainIcon} alt="createTrainIcon" />
      //           </Link>
      //         </li>
      //       </ul>
      //     </div>
      //     <div className="collapse  navbar-collapse">
      //       <ul className="navbar-nav  ml-auto">
      //         <li className="navbar-item">
      //           <Link to="/" className="nav-link">
      //           <strong style={{color:'#8b0000'}}>Logout </strong>
      //             <img src={signOutIcon} alt="signOutIcon" />
      //           </Link>
      //         </li>
      //       </ul>
      //     </div>
      //   </nav>
      // </div>
      <div>
      <Navbar variant="dark" style={{backgroundColor:'seagreen'}} className="p-1">
        <Container>
          <Navbar.Brand href="#home">
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">


          <Nav className="me-auto " style={{color:'white !important' , fontWeight:'bold'}}>
            <Nav.Link href="/trainlist">Trains</Nav.Link>
            <Nav.Link href="/addTrain">Add Route</Nav.Link>
            <Nav.Link href="/delTrain">Remove Route</Nav.Link>
            <Nav.Link href="/updateTrain">Update Route</Nav.Link>
            <Nav.Link href="/contactDetails">Contact Details</Nav.Link>
            <Nav.Link href="/bookingDetails">Booking Details</Nav.Link>
          </Nav>

           <img
               src={logo}
               width="63"
               height="62"
               className="d-inline-block align-top"
               alt="admin-logo"
             />
          <Navbar.Text className="justify-content-end">
          
             <NavDropdown title="Admin" id="collasible-nav-dropdown" style={{fontWeight:'bold'}}>
              <NavDropdown.Item href="/" style={{backgroundColor:'black'}}><span><img src={signOutIcon} alt="signOutIcon" /></span>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    );
  }
}