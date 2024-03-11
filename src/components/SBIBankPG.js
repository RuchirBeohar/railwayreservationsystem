import React, { Component } from "react";

//importing the images
import sbilogo from "../resources/sbi.jpg";
import cvv from "../resources/cvv.png";
import { TOTAL } from "./PaymentMethod";
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';

class SBIBankPG extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.checkCard = this.checkCard.bind(this);
    this.checkCVV = this.checkCVV.bind(this);

    this.state = {
      total: "",
      cvv: "",
      cardnumber: "",
    };
  }

  componentDidMount() {
    this.setState({
      total: sessionStorage.getItem(TOTAL)
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let cardnumber = this.state.cardnumber;
    let cvv = this.state.cvv;
    if(cardnumber.length !== 12){
      // alert("Please Enter Valid Card Number");
      Swal.fire({
        icon: 'info',
        title: 'Please Enter Valid Card Number',
        showConfirmButton: true,
         timer: 20000
      });
    }
    else if(cvv.length !== 3){
      // alert("CVV must be of 3 digits");
      Swal.fire({
        icon: 'info',
        title: 'CVV must be of 3 digits',
        showConfirmButton: true,
         timer: 20000
      });
    }
    // this.props.history.push(`/thankyou`);
    else{
      Swal.fire({
        icon: 'success',
        title: 'Ticket Booked Successfully',
        text:'press OK to check ticket details',
        showConfirmButton: true,
         timer: 20000
      });
     window.location.href="/thankyou";
    }
  }
  checkCard(e) {
   
    this.setState({
      cardnumber: e.target.value
    })}

  checkCVV(e) {
    this.setState({
      cvv: e.target.value
    })};

  render() {
    const style={
      '@media(max-width:400px)':{width:'60%'}
    }
    return (
      <div className="mb-5">
        <div className="container" style={{ marginTop: 0 }}>
          <center>
            <Card style={{ width: "45%" }}>
              <h5
                className="card-header info-color white-text text-center py-4"
                style={{ backgroundColor: "#F1EFF1" }}
              >
                <strong style={{ color: "black"}}>
                  {" "}
                  <h2>Payment</h2>
                </strong>
              </h5>
              <div className="logo p-3">
                <img src={sbilogo} width='75%' height="200" alt="" style={style}/>
              </div>

              <div className="card-body px-lg-5">
                <form
                  className="text-center"
                  style={{ color: "#757575" }}
                  onSubmit={this.onSubmit}
                >
                  <label> Name on Card : </label>
                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="form-control mb-4"
                    required
                  />
                  <label> Card Number : </label>
                  <input
                    name="cardnumber"
                    type="text"
                    placeholder="Credit/Debit Card Number"
                    className="form-control mb-4"
                    onChange={this.checkCard}
                    required
                  />
                  <label>
                    {" "}
                    CVV :
                    <a
                      href="https://www.strategicprofitsinc.com/cvv_info/cvv_info.html"
                      target="_blank"
                    >
                      <img src={cvv} width="20" height="20" alt="" />
                    </a>
                  </label>
                  <input
                    name="cvv"
                    type="text"
                    placeholder="CVV"
                    className="form-control mb-4"
                    onChange={this.checkCVV}
                    required
                  />
                  <label> Amount : </label>
                  <input
                    type="text"
                    placeholder=""
                    className="form-control mb-4"
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

export default SBIBankPG;