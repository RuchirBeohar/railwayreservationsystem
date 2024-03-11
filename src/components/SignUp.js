import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import register from "../resources/resgister.png";
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state={
            username:'',
            password:'',
            mobileNumber:'',
            gender:'',
            role: '', 
            usernameError:'',
            passwordError:'',
            mobileNumberError:'',
            genderError:'',
            isProfile: false,

        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
      } 
      valid(){
        if(this.state.username.length<4 && this.state.password.length<6 && this.state.mobileNumber.length !==10 && this.state.gender.length<1 && this.state.role.length<1){
         this.setState({usernameError:"Username must be greater then 4",
          passwordError: "Password length should be more than 6",
          mobileNumberError:"Mobile number should be of 10 digits",
          genderError:"Gender must be selected",
        })
      }

      else  if(this.state.username.length<4){
          this.setState({
          usernameError:"Invalid Username"})
          }
      else  if(this.state.password.length<6){
        this.setState({
        passwordError:"Password length should be more than 6"})
        }
      else  if(this.state.mobileNumber.length<=9){
        this.setState({
        mobileNumberError:"Mobile number should be of 10 digits"})
        }
      else  if(this.state.gender.length<1){
        this.setState({
        genderError:"Gender must be selected"})
      }
      else{
        return true
      }

      
    }
    
    register(e){
      this.setState({usernameError:"",
      passwordError: "",
      mobileNumberError:"",
      genderError:"",
    })
    e.preventDefault();
      if(this.valid()){
        fetch("http://localhost:8682/subs", {
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
            
          },
          "body": JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            mobileNumber: this.state.mobileNumber,
            gender: this.state.gender,
          }),
        })
        // .then(response => response.json())
        .then(response => {
        //  alert("your registration is successfully submitted")
        if (response.status === 404) {
          throw new Error("Username already exists");
        } else if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'your registration is successfully submitted',
          showConfirmButton: true,
           timer: 20000
        });
      }
      else {
        throw new Error("Registration failed");
      }
        })
        .catch(err => {
          // alert("your registration is not submitted")
          if (err.message === "Username already exists") {
            Swal.fire({
              icon: "error",
              title: "Username already exists",
              showConfirmButton: true,
              timer: 20000,
            });
          } else{
          Swal.fire({
            icon: 'error',
            title: 'your registration is not submitted',
            showConfirmButton: true,
             timer: 20000
          });
        }
        });
      }
    }
    
    handleChange(changeObject) {
        this.setState(changeObject)
      }
    
   render(){
        return (
            <div className="outer">
              <Row xs={1} md={2}>
               <Col style={{marginLeft:'100px !important'}} > 
                <img src={register} className="img-fluid p-3 mt-5" alt="Sample image" style={{
                  width:'85%' ,marginLeft:'50px' ,marginTop:'30px'
                 }} />
               </Col>
          <Col>
            <Container fluid style={{ paddingTop: '30px' }}>
               <Card className="inner p-5 mb-5" style={{ width: 'auto' }}>
            <form>
                <h3>Register</h3><br/>

                <div className="form-group">
                    <label>UserName</label>
                    <input type="text" className="form-control mb-3 p-2 mt-2" placeholder="Enter username" 
                    onChange={(e) => this.handleChange({ username: e.target.value })} />
                    <p style={{color:"red" }}>{this.state.usernameError}</p>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control mb-3 p-2 mt-2" placeholder="Enter password"  
                    onChange={(e) => this.handleChange({ password: e.target.value })} />
                    <p style={{color:"red" }}>{this.state.passwordError}</p>
                </div>

                <div className="form-group">
                    <label>MobileNumber</label>
                    <input type="text" className="form-control mb-3 p-2 mt-2" placeholder="Enter mobile number"  
                    onChange={(e) => this.handleChange({ mobileNumber: e.target.value })}/>
                    <p style={{color:"red" }}>{this.state.mobileNumberError}</p>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <br/>
                    <input type="radio" name="gender" value="male"  className="mx-2"
                    onChange={(e) => this.handleChange({ gender: e.target.value })} />
                    Male
                    <input type="radio" name="gender" value="female" className="mx-2"
                    onChange={(e) => this.handleChange({ gender: e.target.value })} />
                    Female
                    <input type="radio" name="gender" value="others" className="mx-2"
                    onChange={(e) => this.handleChange({ gender: e.target.value })} />
                    Others
                    <p style={{color:"red" }}>{this.state.genderError}</p>
                </div>

                <button style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}} type="submit" className="btn btn-dark btn-lg btn-block" onClick={(e)=>this.register(e)} >Register</button>
              <p className="mt-2">Have an account?  <Link to="/login">Login Here</Link></p>
            </form>
            </Card>
            </Container>
            </Col>
            </Row>
            </div>
        );
   }
  }