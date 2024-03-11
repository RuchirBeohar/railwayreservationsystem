import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/esm/Container";
import Swal from 'sweetalert2';
import axios from "axios";

//export the variable to access from other components

export const SOURCE = "SOURCE";
export const DESTINATION = "DESTINATION";
export const NOOFTICKETS = "NOOFTICKETS";

export const SELECTEDCLASS = "SELECTEDCLASS"

class TicketBooking extends Component {
  constructor(props) {
    super(props);
    this.checkSource = this.checkSource.bind(this);
    this.checkDestination = this.checkDestination.bind(this);
    this.checkTickets = this.checkTickets.bind(this);
    this.storeDetails = this.storeDetails.bind(this);
    this.setdate = this.setdate.bind(this);
    this.setname = this.setname.bind(this);
    this.setage = this.setage.bind(this);
    this.setmobilenum = this.setmobilenum.bind(this);

    this.checkClass = this.checkClass.bind(this);

    //Equal the state to empty
    this.state = {
    
      
      source: "",
      destination: "",
      nooftickets: "",
      date:"",

      name:"",
      age:"",
      mobilenum:"",

      src:[],
      dest :[],

      selectedClass: ""
    };
  }

  componentDidMount() {
    // Fetch the options from API and update the state
    fetch("http://localhost:9030/search/findAllTrains")
      .then(response => response.json())
      .then(data => {
        const src = data.map(train => train.startStation);
        const dest = data.map(train => train.endStation);
        this.setState({ src, dest });
      })
      .catch(error => {
        console.log("Error fetching options from API:", error);
      });
  }
  

  //get the input data and store it on variable and
  //display the input data value in console

  //store the input data into states

  checkClass(e) {
    var selectedClass = e.target.value;
    this.setState({
      selectedClass: selectedClass
    });
    console.log("Selected Class: " + selectedClass);
  }

  checkSource(e) {
    var soList = document.getElementById("soList").value;
    this.setState({
      source: e.target.value
    });
    console.log("Source : " + soList);
  }
  checkDestination(e) {
    var deList = document.getElementById("deList").value;
    this.setState({
      destination: e.target.value
    });
    console.log("Destination : " + deList);
  }
  checkTickets(e) {
    var tickets = document.getElementById("tickets").value;
    this.setState({
      nooftickets: e.target.value
    });
    console.log("No of Tickets : " + tickets);
  }

  setdate(e){
    this.setState({
      date: e.target.value
    });
  }

  setname(e){
    this.setState({
      name: e.target.value
    });
  }

  setage(e){
    this.setState({
      age: e.target.value
    });
  }

  setmobilenum(e){
    this.setState({
      mobilenum: e.target.value
    });
  }

  //store the state value into variable
  //check if state is not equal to empty if not then save
  //that data into session storage
  storeDetails(e) {
    e.preventDefault();
  
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    const rn = randomNumber.toString();

    sessionStorage.setItem('rn', rn);

    let source = this.state.source;
    let destination = this.state.destination;
    let nooftickets = this.state.nooftickets;
    let date = this.state.date;

    let name = this.state.name;
    let age = this.state.age;
    let mobilenum = this.state.mobilenum;

    let selectedClass = this.state.selectedClass;

    sessionStorage.setItem('date', date);
    sessionStorage.setItem('name',name);
    sessionStorage.setItem('mobilenum',mobilenum);
    sessionStorage.setItem('age',age);


    //Validating the source, If validated store the data to sessionStorage.


    if(name === ""){
      // window.alert("please provide passenger name");
      Swal.fire({
        icon: 'info',
        title: 'Please Provide Passenger Name',
        showConfirmButton: true,
        timer: 20000
      });
      window.location.href="/booking";
    }

    else if(age <=8){
      // window.alert("Age must be greater than 8 years");
      Swal.fire({
        icon: 'info',
        title: 'Age must be greater than 8 years',
        showConfirmButton: true,
         timer: 20000
      });
      window.location.href="/booking";
    }

    else if(mobilenum.length < 10){
      // window.alert("please provide valid Mobile Number");
      Swal.fire({
        icon: 'info',
        title: 'please provide valid Mobile Number',
        showConfirmButton: true,
         timer: 20000
      });
      window.location.href="/booking";
    }

    else if (source === "") {
      // alert("SOURCE cannot be empty");
      Swal.fire({
        icon: 'info',
        title: 'SOURCE cannot be empty',
        showConfirmButton: true,
         timer: 20000
      });
      //Redirect the same component when storeMethod is called
      // this.props.history.pushback(`/booking`);
      window.location.href="/booking";
    } 
    // else if (source !== "") {
    //   sessionStorage.setItem(SOURCE, source);
    //   //go to another component when storeMethod is called
    //   // this.props.history.push(`/payment`);
    //   window.location.href="/payment";
    // }

    //Validating the destination, If validated store the data to sessionStorage.
    else if (destination === "") {
      // alert("DESTINATION cannot be empty");
      Swal.fire({
        icon: 'info',
        title: 'DESTINATION cannot be empty',
        showConfirmButton: true,
         timer: 20000
      });
      //Redirect the same component when storeMethod is called
      this.props.history.push(`/booking`);
    } 
    // else if (destination !== "") {
    //   sessionStorage.setItem(DESTINATION, destination);
    //   //go to another component when storeMethod is called
    //   // this.props.history.push(`/payment`);
    //   window.location.href="/payment";
    // }

    else if(source === destination){
      // alert("Source and destination cannot be same...!");
      Swal.fire({
        icon: 'info',
        title: 'Source and destination cannot be same...!',
        showConfirmButton: true,
         timer: 20000
      });
      window.location.href="/booking";
    }

    //Validating the nooftickets, If validated store the data to sessionStorage.
    else if (nooftickets === "") {
      // alert("NO OF TICKETS cannot be empty");
      Swal.fire({
        icon: 'info',
        title: 'NO OF TICKETS cannot be empty',
        showConfirmButton: true,
         timer: 20000
      });
      //Redirect the same component when storeMethod is called
      this.props.history.push(`/booking`);
      // window.location.href="/booking";
    } 
    // else if (nooftickets !== "") {
    //   sessionStorage.setItem(NOOFTICKETS, nooftickets);
    //   //go to another component when storeMethod is called
    //   //this.props.history.push(`/payment`);
    //   window.location.href="/payment";
    // }

    if(destination !== source && nooftickets !== "" && destination !== "" && source !== "" && mobilenum.length === 10 && age >8 && name !== ""){
      sessionStorage.setItem(SOURCE, source);
      sessionStorage.setItem(DESTINATION, destination);
      sessionStorage.setItem(NOOFTICKETS, nooftickets);

      sessionStorage.setItem(SELECTEDCLASS, selectedClass); 

      Swal.fire({
        icon: 'success',
        title: 'Redirecting You to The Payment Interface',
        showConfirmButton: true,
         timer: 20000
      });
      window.location.href="/payment";
    }
  }

  render() {
    if(localStorage.getItem("token")){

      const currentDate = new Date().toISOString().split("T")[0];
      const uniqueSrc = [...new Set(this.state.src)];
      const uniqueDest = [...new Set(this.state.dest)];

    return (
      <session>
        <div className="mt-5 mb-5">
          <center>
              <Card className= "mb-5" style={{ width: '45%' }}>
                <h5
                  className="card-header info-color white-text text-center"
                  style={{ backgroundColor: " #F1EFF1 " }}
                >
                  <strong style={{ color: "black" }}>
                    {" "}
                    Book Train Tickets Online{" "}
                  </strong>
                </h5>

                <div className="card-body px-lg-5">
                  <form
                    className="text-center"
                    style={{ color: "#757575" }}
                    onSubmit={this.storeDetails}
                    
                  >
                   <label className="mx-3 mt-3">Passenger Name :</label>
                   <input
                      type="text"
                      placeholder="Passenger Name"
                      className="form-control mb-4"
                      onChange={this.setname} 
                      name="name"
                      required
                    />
                    <label className="mx-3 mt-3">Passenger Age :</label>
                   <input
                      type="text"
                      placeholder="Passenger Age"
                      className="form-control mb-4"
                      onChange={this.setage} 
                      name="age"
                      required
                    />
                    <label className="mx-3 mt-3">Passenger Mobile Number :</label>
                   <input
                      type="text"
                      placeholder="Passenger Mobile Number"
                      className="form-control mb-4"
                      onChange={this.setmobilenum} 
                      name="mobilenum"
                      required
                    />

                 
                    <label className="mx-3 mt-3"> From : </label>
                    <select
                      class="browser-default custom-select mb-4"
                      id="soList"
                      onChange={this.checkSource}
                    >
                      <option value="" disabled selected>
                        Choose option
                      </option>
                     {uniqueSrc.map((source, index) => (
                       <option key={index} value={source}>{source}</option>
                     ))}

                    </select>
                    <label className="mx-3">To : </label>
                    <select
                      class="browser-default custom-select mb-4"
                      id="deList"
                      onChange={this.checkDestination}
                    >
                      <option value="" disabled selected>
                        Choose option
                      </option>
                      {uniqueDest.map((destination, index) => (
                       <option key={index} value={destination}>{destination}</option>
                     ))}
                    </select>
                    <br/>  
      
                    <label className="mt-2 mx-3 mb-4 ">Select class:</label> 
                    <select
                      class="browser-default custom-select mb-4"
                      id="checkClass"
                      onChange={this.checkClass}
                      required
                    >
                      <option value="" disabled selected>
                        choose option
                      </option>
                      <option value="sleeper">
                        Sleeper
                      </option>
                      <option value="1st AC">
                        1st AC
                      </option>
                      <option value="2nd AC">
                        2nd AC
                      </option>
                      <option value="3rd AC">
                        3rd AC
                      </option>
                      <option value="2s">
                        2S
                      </option>
                    </select>         
                   
                    <br/>
                    <label className="mt-2 mx-3 mb-4 ">Select Date:</label>
                    <input required type="date" onChange={this.setdate} name="date"  min={currentDate}/>
                    <br/>
                    <label className="mb-3"> No of Tickets : </label>
                    <input
                    required
                      type="text"
                      placeholder="No of tickets"
                      className="form-control mb-4"
                      id="tickets"
                      onChange={this.checkTickets}
                    />

                    <button  className="p-2" style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}}
                      type="submit"
                    >
                      NEXT
                    </button>
                  </form>
                </div>
              </Card>
              </center>
        </div>
      </session>
    );
    }
    else{
      return(
        <div className="mt-5 mb-5" style={{width:'60%', textAlign:'center',justifyContent:'center' , margin:'0 auto'}}>
        <Alert   variant="primary" style={{color:'black', fontWeight:'bold'}}>
          <h3>Login To Continue ..!</h3>    
          <Link to='/login'>Login</Link>
        </Alert>
        </div>
      );
    }
  }
}

export default TicketBooking;