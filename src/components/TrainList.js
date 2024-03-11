import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import Card from 'react-bootstrap/Card';

const Train = props => (
  <tr>
    <td> {props.train.trainid} </td>
    <td> {props.train.trainName} </td>
    <td> {props.train.startStation} </td>
    <td> {props.train.endStation} </td>
    <td> {props.train.startTime} </td>
    <td> {props.train.endTime} </td>
    </tr>
  
  
);
class TrainList extends Component {
  constructor(props) {
    super(props);
    this.state = { traintickets: [] ,searchResults: [],};
  }

  //Get the train ticket details from the database
  componentDidMount() {
    axios
      .get("http://localhost:9030/search/findAllTrains")
      .then(response => {
        this.setState({ traintickets: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  trainList() {
    return this.state.traintickets.map(function(currentTrain, i) {
      return <Train train={currentTrain} key={i} />;
    });
  }


  handleSubmit = event => {
    event.preventDefault();
  
    const trainNumber = event.target.trainNumber.value;
  
    axios
      .get(`http://localhost:9030/trains/${trainNumber}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ searchResults: [response.data] });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'No Train exists with the given Train number!',
          showConfirmButton: true,
           timer: 20000
        })
      });
  };
  


  render() {
    return (
      <div className="p-5">
        <center>
        <Card className= "mb-3" style={{ width: '45%' }}>
        <h5 className="card-header info-color white-text text-center"
                  style={{ backgroundColor: " #F1EFF1 " }}>
             <strong style={{ color: "black" }}>
                 {" "}
                 Search Train by Train Number{" "}
             </strong>
         </h5>
        <form onSubmit={this.handleSubmit}>
                  <input required className="mt-3" name="trainNumber" placeholder="Enter train number"  />
                  <br />
                  <button className="mt-3 mb-3" type="submit" style={{ backgroundColor: 'black', color: 'white', borderRadius: '3px', fontWeight: '10px', border: 'none', width: '120px', height: '40px' }}>search</button>
          </form>
          </Card>
          </center>
          <br/>
          
          {this.state.searchResults.length > 0 && (
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr style={{ border: '1px solid black' }}>
                <th> TrainID </th>
                <th> Train Name </th>
                <th> Source </th>
                <th> Destination </th>
                <th> Start Time </th>
                <th> End Time </th>
              </tr>
            </thead>
            <tbody>
              {this.state.searchResults.map((currentTrain, i) => (
                <Train train={currentTrain} key={i} />
              ))}
            </tbody>
          </table>
        )}
        
        <h3 style={{ marginTop: 80 }}> Trains Available</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr style={{border:'1px solid black'}}>
              <th> TrainID </th>
              <th> Train Name </th>
              <th> Source </th>
              <th> Destination </th>
              <th> Start Time </th>
              <th> End Time </th>
            </tr>
          </thead>
          <tbody>{this.trainList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TrainList;
