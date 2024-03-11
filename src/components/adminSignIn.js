import React, { Component, useContext, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import admin from "../resources/adminregister.png";
import Swal from 'sweetalert2';

// import style from "../../src/style.module.css/signIn.style.css";
import "../../src/style.module.css/signIn.style.css";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("username is required!"),
  secretKey: Yup.string().required("Passcode is required!"),
});


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecret] = useState("");

  const history = useNavigate();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");
  const signInSuccess = (userData) => {
    if (fromUrl) {
      // history.push(fromUrl);
      window.location.href = "fromUrl";
    } else {
      // history.push("/addTrain");
      window.location.href = "addTrain";
    }
  };

  const login = (userData) => {
    console.log(userData.password);
    console.log(userData.secretKey);
    if(userData.secretKey=== "valid"){
    // console.log(userData.password);
    fetch("http://localhost:8682/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.response);
        if (response.response === " Invalid Credentials..!") {
          // alert("your userId and password didn't match");
          Swal.fire({
            icon: 'error',
            title: 'your userId and password did not match...!',
            showConfirmButton: true,
             timer: 20000
          });
        } 
        else {
          Swal.fire({
            icon: 'success',
            title: 'Admin LoginIn Successful',
            showConfirmButton: true,
             timer: 20000
          });
          const userData = {
            token: response,
            name: username,
          };
          signInSuccess(userData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      // alert("Please provide Correct Passcode to Login As Admin...!")
      Swal.fire({
        icon: 'error',
        title: 'Please provide Correct Passcode to Login As Admin...!',
        showConfirmButton: true,
         timer: 20000
      });
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        secretKey: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = { ...values };
          resetForm();
          login(userData);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Row xs={1} md={2}>
          <Col style={{marginLeft:'100px !important'}}> 
            <img src={admin} className="img-fluid p-3" alt="Sample image" style={{
              width:'75%' ,marginLeft:'50px' ,marginTop:'30px'
            }} />
          </Col>
          <Col>
            <Container fluid style={{ paddingTop: '30px' }}>
              <Card className="p-5 mb-5" style={{ width: 'auto' }}>
                <Form>
                  <label>Username</label>
                  <br />
                  <Field className="mb-3 p-2 mt-2" name="username" type="text" placeholder="Enter Admin Username" style={{ width: '100%' }} />
                  <ErrorMessage style={{color:'red'}} name="username" component="div" className="error-message" />
                  <br />
                  <label className="mt-1">Password</label>
                  <br />
                  <Field className="mb-3 p-2 mt-2" name="password" type="password" placeholder="Enter Admin password" style={{ width: '100%', marginTop:'5px' }} />
                  <ErrorMessage style={{color:'red'}} name="password" component="div" className="error-message" />
                  <br />
                  <label>Passcode</label>
                  <br />
                  <Field className="mb-3 p-2 mt-2" type="password" name="secretKey" placeholder=" Enter SecretKey" style={{ width: '100%' }} />
                  <ErrorMessage style={{color:'red'}} name="secretKey" component="div" className="error-message" />
                  <br />
                  <button style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px'}} className="auth-button block p-2" onClick={() => { }}>
                    Sign In
                  </button>
                  <br/>
                  <p style={{marginTop:'7px'}}>
                    Don't have a account?<Link to="/signUp"> Register Here</Link>
                  </p>
                  {/* <Form.Text className="text-muted">
        Don't have a account?<Link to="/signUp"> Register Here</Link>
       </Form.Text> */}
                </Form>
              </Card>
            </Container>

          </Col>
        </Row>
      )}
    </Formik>
  );
};
export default Login;
