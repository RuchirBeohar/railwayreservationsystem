import React, { Component } from "react";
import { useHistory } from "react-router-dom";

import visalogo from "../resources/visalogo.png";
import masterlogo from "../resources/masterlogo.png";
import { SOURCE, DESTINATION, NOOFTICKETS } from "./TicketBooking";
import { Router } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';

export const TOTAL = "TOTAL";

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "",

      source: "",
      destination: "",
      nooftickets: "",
      total: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //setting the state value to session storage value

    // this.setState({ source: sessionStorage.getItem(SOURCE) });
    // this.setState({ destination: sessionStorage.getItem(DESTINATION) });
    // this.setState({ nooftickets: sessionStorage.getItem(NOOFTICKETS) });
    // this.setState({ total: sessionStorage.getItem(NOOFTICKETS) * 340 });
    // this.setState({});
    // this.setState({
    //   total:
    //     sessionStorage.getItem(NOOFTICKETS) * 340 -
    //     sessionStorage.getItem(NOOFTICKETS) * 340 * (10 / 100),
    // });
   
    const selectedClass = sessionStorage.getItem('SELECTEDCLASS');
    const source = sessionStorage.getItem(SOURCE);
    const destination = sessionStorage.getItem(DESTINATION);
    const noOfTickets = sessionStorage.getItem(NOOFTICKETS);


    let ticketPrice;
    if(selectedClass === '2s'){
      ticketPrice=300;
    }
    else if(selectedClass === 'sleeper'){
      ticketPrice=520;
    }
    else if(selectedClass === '1st AC'){
      ticketPrice=2050;
    }
    else if(selectedClass === '2nd AC'){
      ticketPrice=1040;
    }
    else{
      ticketPrice=980;
    }

    const total = noOfTickets * ticketPrice;

  
  this.setState({
    source,
    destination,
    nooftickets: noOfTickets,
    total,
  });

  }

  async handleChange(e) {
    this.setState({
      method: e.target.value,
    });

    let total = this.state.total;
    sessionStorage.setItem(TOTAL, total);
  }
  handleSubmit(e) {
    e.preventDefault();
    let method = this.state.method;

    if (method === "creditcard") {
      // this.props.history.push(`/sbipg`);
      window.location.href="/sbipg";
    } else if (method === "mobile") {
      // this.props.history.push(`/submitPaymentDetail`);
      window.location.href="/submitPaymentDetail";
    }
    if (this.componentDidMount()) {
      fetch("http://localhost:9955/orders/addOrder", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          trainid: this.state.trainid,
          source: this.state.source,
          destination: this.state.destination,
          nooftickets: this.state.nooftickets,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          // alert("Your ticket is not booked");
          Swal.fire({
            icon: 'error',
            title: 'Your ticket is not booked',
            showConfirmButton: true,
             timer: 20000
          });
        })
        .catch((err) => {
          // alert("Your ticket is successfully booked");
          Swal.fire({
            icon: 'success',
            title: 'Your ticket is successfully booked',
            showConfirmButton: true,
             timer: 20000
          });
        });
    }
  }

  // async handleSubmit(e) {
  //   e.preventDefault();
  //   const method = this.state.method;

  //   if (method === "creditcard") {
  //     this.props.history.push(`/sbipg`);
  //   } else if (method === "mobile") {
  //     this.props.history.push(`/submitPaymentDetail`);
  //   }

  //   const response = await fetch("http://localhost:9955/orders/addOrder", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       trainid: this.state.trainid, // set the trainid here if necessary
  //       source: this.state.source,
  //       destination: this.state.destination,
  //       nooftickets: this.state.nooftickets,
  //     }),
  //   });

  //   if (!response.ok) {
  //     alert("Your ticket is not booked");
  //   } else {
  //     alert("Your ticket is successfully booked");
  //   }
  // }

  render() {
    return (
      <div>
        <div className="container p-3 mb-5" style={{ marginTop: 0 }}>
          <center>
            <Card  style={{ width: '45%' }}>
              <h5
                className="card-header info-color white-text text-center py-4"
                style={{ backgroundColor: " #F1EFF1 " }}
              >
                <strong style={{ color: "black" }}>
                  {" "}
                  <h3 className="mb-4" >Your Details</h3>
                  <h6>
                    {" "}
                    <span style={{marginLeft:'40px'}}>Source :{" "}</span>
                    <input
                      type="text"
                      value={this.state.source}
                      readOnly
                      style={{textAlign:'left'}}
                    />{" "}
                  </h6>
                  <h6>
                    {" "}
                    <span style={{marginLeft:'10px'}}>Destination :{" "}</span>
                    <input
                      type="text"
                      value={this.state.destination}
                      readOnly
                    />
                  </h6>
                  <h6>
                    {" "}
                    No of Tickets :{" "}
                    <input
                      type="text"
                      value={this.state.nooftickets}
                      readOnly
                    />
                  </h6>{" "}
                  <h6>
                    {" "}
                    Your Total Bill :{" "}
                    <input
                      type="text"
                      value={this.state.total}
                      readOnly
                    />
                  </h6>
                  {/* <span className="mt-4">
                  Select the Payment Method
                  </span> */}
                  <br />
                </strong>
              </h5>

              <div className="card-body px-lg-5">
                <form
                  className="text-center"
                  style={{ color: "#757575" }}
                  onSubmit={this.handleSubmit}
                >
                  <h4 className="mt-2 mb-3" >
                    Select the Payment Method
                  </h4>
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="creditcard"
                      name="method"
                      value="creditcard"
                      onChange={this.handleChange}
                    />
                    <label className="custom-control-label" for="creditcard">
                      Credit Card
                      <div>
                        <img src={visalogo} width="50" height="20" alt="" />
                        <img src={masterlogo} width="50" height="22" alt="" />
                      </div>
                    </label>
                  </div>
                  <br/>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="mobilenum"
                      name="method"
                      value="mobile"
                      onChange={this.handleChange}
                    />
                    <label className="custom-control-label" for="mobilenum">
                      UPI <br/>
                      (Payment will added to the mobile bill)
                    </label>
                  </div>
                  <button
                    className="btn btn-outline-primary btn-rounded btn-block z-depth-0 my-4 waves-effect"
                    style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}}
                    type="submit"
                  >
                    NEXT
                  </button>
                </form>
              </div>
            </Card>
          </center>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
