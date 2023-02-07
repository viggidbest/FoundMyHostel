import React, { useState, useEffect } from 'react'
import './Dashboard.scss'
import {useTable} from 'react-table'
import { useMemo } from 'react'
import Table from 'react-bootstrap/Table';

import axios from 'axios'
import Attendance from './Attendance'

function Owner() {
  const [data,setData] = useState([])
  const[table,setTable] = useState(true)
  const[buttonText,setButtonText] = useState("Attendance Report")
  const [isAvailable, setIsAvailable] = useState(true);
  useEffect( () =>  {
      axios("http://localhost:3001/owner").then(res=>{setData(res.data)})
     
   
   
  },[])


function handleAttendance () {
  if(table){
    setButtonText("Hostlers Details")
    setTable(false)
  }
  else{ 
    setButtonText("Attendance Report")
    setTable(true)}
}


const handleToggle = () => {
  setIsAvailable(!isAvailable);
};

  return (
    <div>
    <div className='navbar'>
        <div><h1>FoundMyHostel</h1></div>
        <button onClick={handleAttendance}>{buttonText}</button>   
    </div>
    
    <div className='mess'>
    <div>
      <button 
        className={`food-availability-button ${isAvailable ? 'available' : 'unavailable'}`} 
        onClick={handleToggle}>
        {isAvailable ? 'Mess Available' : 'Mess Unavailable'}
      </button>
    </div>
    </div>
    

    { table ?
       <Table striped bordered hover size="sm">
       <thead>
         <tr>
           <th>Email</th>
           <th>Name</th>
           <th>Check-in</th>
           <th>Check-out</th>
           <th>Complaint</th>
         </tr>
       </thead>
       <tbody>
       {data.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.checkIn}</td>
              <td>{user.checkOut}</td>
              <td>{user.complaint}</td>
             </tr>
           ))}
       </tbody>
     </Table>

      :<Attendance />}    
        
    </div> 
   
  )
}

export default Owner