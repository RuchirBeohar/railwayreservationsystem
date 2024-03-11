import React, { Component } from "react";
import AdminNavigationBar from "../components/adminNavigationBar";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import add from "../resources/create.png";
import Swal from 'sweetalert2';

export default class CreateTrain extends Component {
  state = {
    trainid: "",
    trainName: "",
    startStation: "",
    endStation: "",
    startTime: "",
    endTime: "",
    isTrainCreated: false,
  };

  handleTrainid = (event) => {
    const { value } = event.target;
    if (value != null) {
      this.setState({ trainid: value.toUpperCase() });
    }
  };

  handleTrainName = (event) => {
    const { value } = event.target;
    if (value != null) {
      this.setState({ trainName: value.toUpperCase() });
    }
  };

  handlestartStation = (event) => {
    const { value } = event.target;
    this.setState({ startStation: value.toUpperCase() });
  };

  handleendStation = (event) => {
    const { value } = event.target;
    this.setState({ endStation: value.toUpperCase() });
  };

  handlestartTime = (event) => {
    const { value } = event.target;
    this.setState({ startTime: value.toUpperCase() });
  };

  handleendTime = (event) => {
    const { value } = event.target;
    this.setState({ endTime: value.toUpperCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newTrain = {
      trainid: this.state.trainid,
      trainName: this.state.trainName,
      startStation: this.state.startStation,
      endStation: this.state.endStation,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    };
    if (this.state.startStation === this.state.endStation) {
      Swal.fire({
        icon: 'info',
        title: 'Source and destination cannot be the same',
        showConfirmButton: true,
        timer: 20000
      });
      return;
    }

    if (this.state.startTime === this.state.endTime) {
      Swal.fire({
        icon: 'info',
        title: 'Start time and end time cannot be the same',
        showConfirmButton: true,
        timer: 20000
      });
      return;
    }

    axios
      .post("http://localhost:9030/trains/addTrain", newTrain)
      .then((response) => {
       if (response.status === 200) {
        Swal.fire({
        icon: 'success',
        title: 'New Train Route Created Successfully',
        showConfirmButton: true,
         timer: 20000
        });
       this.setState({
        trainid: "",
        trainName: "",
        startStation: "",
        endStation: "",
        startTime: "",
        endTime: "",
  
        isTrainCreated: true,
      }); 
    }
  })
  .catch((error) => {
    // Error occurred
    Swal.fire({
      icon: 'error',
      title: 'Train already exists',
      showConfirmButton: true,
      timer: 20000
    });
  });
};

  render() {
    if (this.state.isTrainCreated) {
      return <Navigate to="/trainlist" />;
    }
    console.log(this.props.adminId === "");
    if (this.props.adminId === "") {
      return <Navigate to="/adminSignIn" />;
    }

    return (
      <div className="mb-5">
        <AdminNavigationBar />
        <Container fluid >
        <Row xs={1} md={2}>
        <Col>
        <img src={add} className="img-fluid p-3" alt="Sample image" style={{
            width:'95%' ,marginLeft:'50px' ,marginTop:'100px' 
          }} />
        </Col>
        <Col>
        <div className="d-flex justify-content-center">
          <div className="card mb-3" style={{width:'75%'}}>
            <div className="card-header">
              <h3 className="d-flex justify-content-center">Create New Train Route</h3>
            </div>
            <div className="card-body p-4">
              <h5 className="card-title">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="col">
                      <label className="mb-2" htmlFor="trainNumber">Train Id</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        id="trainid"
                        placeholder="Provide Train ID(only digits)"
                        onChange={this.handleTrainid}
                        value={this.state.trainid}
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="mb-2" htmlFor="trainName">Train Name</label>
                      <input
                        type="name"
                        className="form-control mb-3"
                        id="trainName"
                        placeholder="Provide Train Name"
                        onChange={this.handleTrainName}
                        value={this.state.trainName}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <label className="mb-2" htmlFor="inputState">Source</label>
                      <input
                        id="from"
                        className="form-control mb-3"
                        placeholder="Provide Train Source"
                        onChange={this.handlestartStation}
                        value={this.state.startStation}
                        required
                      />
                    </div>

                    <div className="col">
                      <label className="mb-2" htmlFor="inputState">Destination</label>
                      <input
                        id="to"
                        className="form-control mb-3"
                        placeholder="Provide Train Destination"
                        onChange={this.handleendStation}
                        value={this.state.endStation}
                        required
                      />
                    </div>

                    <div className="col">
                      <label className="mb-2" htmlFor="startTime">Train Start time</label>
                      <input
                        type="time"
                        className="form-control mb-3"
                        id="startTime"
                        placeholder="Provide Train starting Time"
                        onChange={this.handlestartTime}
                        value={this.state.startTime}
                        required
                      />
                    </div>
                    <div className="col">
                      <label className="mb-2" htmlFor="endTime">Train End Time</label>
                      <input
                        type="time"
                        className="form-control mb-3"
                        id="endTime"
                        placeholder="Provide Train ending time"
                        onChange={this.handleendTime}
                        value={this.state.endTime}
                        required
                      />
                    </div>
                  </div>
                  <br/>
                  <div>
                    <button
                    style={{backgroundColor:'black',color:'white' ,borderRadius:'3px' , fontWeight: '10px' ,border:'none' ,width:'150px' ,height:'50px'}}
                      type="submit"
                      value="createTicket"
                    >
                      Create Route
                    </button>

                    <p className="mt-3">
                      Delete Route?<Link to="/delTrain"> Click Here</Link>
                    </p>
                  </div>
                </form>
              </h5>
            </div>
          </div>
        </div>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}
