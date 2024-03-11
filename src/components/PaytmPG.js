import React, { Component } from "react";
import axios from "axios";
import paytmlogo from "../resources/paytm.png";
//import image
import { TOTAL } from "./PaymentMethod";
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';

class PaytmPG extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkmobilenum = this.checkmobilenum.bind(this);
    this.checkpin = this.checkpin.bind(this);
    this.state = {
      mobileno: "",
      fourdigitpin: "",
      amount: "",
      total: ""
    };
  }
  componentDidMount() {
    this.setState({
      total: sessionStorage.getItem(TOTAL)
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let mobileno = this.state.mobileno;
    let fourdigitpin = this.state.fourdigitpin;
    // const { mobileno, fourdigitpin, amount } = this.state;
    console.log(mobileno);
    console.log(fourdigitpin);
    const addPayment = {
      mobileno: this.state.mobileno,
      fourdigitpin: this.state.fourdigitpin,
      amount: this.state.amount
    };
    this.setState({
      // mobileno: e.target.value,
      // fourdigitpin: e.target.value,
      amount: e.target.value
    });

    if (mobileno.length !== 10) {
      // alert("Mobile must be of 10 digits");
      Swal.fire({
        icon: 'info',
        title: 'Mobile must be of 10 digits!',
        showConfirmButton: true,
         timer: 20000
      });
    }
    else if (fourdigitpin.length !== 4) {
      // alert("PIN must be of 4 digits");
       Swal.fire({
        icon: 'info',
        title: 'PIN must be of 4 digits!',
        showConfirmButton: true,
         timer: 20000
      });
    }
    else{
    axios
      .post("http://localhost:9955/orders/addOrder", addPayment)
      .then(res => console.log(res.data));
    // this.props.history.push(`/thankyou`);
     Swal.fire({
      icon: 'success',
      title: 'Ticket Booked Successfully',
      text:'click on OK to check Booking Details',
      showConfirmButton: true,
       timer: 20000
    });
    window.location.href="/thankyou";
    }
  }
  checkmobilenum(e) {
   
    this.setState({
      mobileno: e.target.value
    })}

  checkpin(e) {
    this.setState({
      fourdigitpin: e.target.value
    })};

  render() {
    const style={
      '@media(max-width:400px)':{width:'60%'}
    }
    return (
      <div className="m-5">
        <div className="container" style={{ marginTop: 0 }}>
          <center>
            <Card style={{ width: '45%' }}>
              <h5
                className="card-header info-color white-text text-center py-4"
                style={{ backgroundColor: "#F1EFF1" }}
              >
                <strong style={{ color: "black" }}>
                  {" "}
                  <h2>Payment</h2>
                </strong>
              </h5>
              <div className="logo p-3">
                <img src={paytmlogo}  width="60%" height="200" alt="" style={style}/>
              </div>
              
              <div className="card-body px-lg-5">
                <form
                  className="text-center"
                  style={{ color: "#757575" }}
                  onSubmit={this.onSubmit}
                >
                  <label> Mobile Number : </label>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="form-control mb-4"
                    name="mobileno"
                    onChange={this.checkmobilenum}
                    required
                  />
                  <label> Four Digit PIN Number : </label>
                  <input
                    type="text"
                    placeholder="Four Digit PIN Number"
                    className="form-control mb-4"
                    name="fourdigitpin"
                    onChange={this.checkpin}
                    required
                  />
                  <label> Amount : </label>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control mb-4"
                    name="amount"
                    value={this.state.total}
                    style={{fontWeight:'bold'}}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-primary btn-rounded btn-block z-depth-0 my-4 waves-effect"
                    style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}}
                    type="submit"
                  >
                    PROCEED
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

export default PaytmPG;