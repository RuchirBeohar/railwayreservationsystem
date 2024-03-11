import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminNavigationBar from "../components/adminNavigationBar";

const BookingDetails = () =>{
    const [state, setState] = useState([]);
   
     useEffect(() => {
       axios.get('http://localhost:9955/orders/findAllOrders')
         .then(response => {
           setState(response.data);
         })
         .catch(error => {
           console.error('Error retrieving contact details:', error);
         });
     }, []);

    return (
      <div>
        <AdminNavigationBar />
      <div className="p-5 m-5">
        <center>
        <h3>Bookings</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr style={{border:'1px solid black'}}>
              <th style={{textAlign:'center'}}> PNR Number </th>
              <th style={{textAlign:'center'}}> Passenger Name </th>
              <th style={{textAlign:'center'}}> Passenger Mobile Number </th>
              <th style={{textAlign:'center'}}> Source </th>
              <th style={{textAlign:'center'}}> Destination </th>
              <th style={{textAlign:'center'}}> Total Tickets</th>
            </tr>
          </thead>
          <tbody>
            {
             state.map(e=> 
            <tr key={e.id}>
             <th style={{textAlign:'center'}}>
                 {e.pnr}
             </th>
             <th style={{textAlign:'center'}}>
                 {e.name}
             </th>
              <th style={{textAlign:'center'}}>
              {e.mobilenum}
            </th>
             <th style={{textAlign:'center'}}>
           {e.startStation}
           </th>
           <th style={{textAlign:'center'}}>
           {e.endStation}
           </th>
           <th style={{textAlign:'center'}}>
           {e.quantity}
           </th>
           </tr>
          )}
          </tbody>
        </table>
        </center>
      </div>
      </div>
    );
  }

export default BookingDetails;
