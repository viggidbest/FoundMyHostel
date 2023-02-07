import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState,useEffect } from 'react';
import axios from 'axios'

function Attendance() {
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/attandance-table').then(res=>setData(res.data))
    },[])
  return (
    <div>
        

    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Email</th>
          <th> Name</th>
          <th>4/1/2023</th>
          <th>5/1/2023</th>
          <th>6/1/2023</th>
          <th>7/1/2023</th>
          <th>8/1/2023</th>
          <th>9/1/2023</th>
          <th>10/1/2023</th>  
        </tr>
      </thead>
      <tbody>
      {data.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              {user.attendance.map((p)=>
                    <td>{p.status }</td>
              )}
             
             </tr>
           ))}
      </tbody>
    </Table>
    </div>
  )
}

export default Attendance