import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminNavigationBar from "../components/adminNavigationBar";

const ContactDetails = () =>{
 const [state, setState] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9050/contacts/findAllContacts')
      .then(response => {
        setState(response.data);
      })
      .catch(error => {
        console.error('Error retrieving contact details:', error);
      });
  }, []);



   return(
    <div>
      <AdminNavigationBar />
     <div className='p-5 m-5'>
        <center>
        <h3> Contact Details</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr style={{border:'1px solid black'}}>
              <th style={{textAlign:'center'}}> Name </th>
              <th style={{textAlign:'center'}}> Phone Number</th>
              <th style={{textAlign:'center'}}> Query </th>
            </tr>
          </thead>
          <tbody>
            {
             state.map(e=> 
            <tr key={e.id}>
             <th style={{textAlign:'center'}}>
                 {e.name}
             </th>
              <th style={{textAlign:'center'}}>
              {e.phoneNumber}
            </th>
             <th style={{textAlign:'center'}}>
           {e.query}
           </th>
           </tr>
          )}
          </tbody>
        </table>
        </center>
     </div>
     </div>
   )    
}
export default ContactDetails;
