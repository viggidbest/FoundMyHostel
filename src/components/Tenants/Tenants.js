import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Tenants.scss'
import { useState,useEffect } from 'react';
import { useLocation} from 'react-router-dom'
import axios from 'axios'

function Tenants() {
    const [tenantName,setTenantName] = useState("")
    const [checkedIn, setCheckedIn] = useState();
    const [complaint,setComplaint] = useState("")
    const [mess,setMess] = useState()
    const {state} = useLocation();
    const email = state.email
    console.log(email);
   
    useEffect(()=>{
        axios.get(`http://localhost:3001/tenant?email=${email}`).then(res=>{
                  if(res.data[0].checkOut){
                    setCheckedIn(false)
                  }
                setTenantName(res.data[0].name)
        })
    },[])
    function handleCheckInOut ()  {
        if(checkedIn){
            setCheckedIn(false)
            const dateTime = new Date().toLocaleString();
            const data = {dateTime:dateTime,email:email}
            axios.post("http://localhost:3001/tenant/checkOut",{data}).then(res=>console.log(res))
        }
        else{
        setCheckedIn(true)
        const dateTime = new Date().toLocaleString();
        const data = {dateTime:dateTime,email:email}
        axios.post("http://localhost:3001/tenant/checkIn",{data})
        }
    }

    function handleChange (e) {
        setComplaint(e.target.value)
    }
    async function  handleSubmit (e) {
        e.preventDefault()
        const data = {email:email,complaint:complaint}
        await axios.post("http://localhost:3001/tenant/complaint",{data}).then(res=>setComplaint(""))
    }
    function handleattendance () {
      const attendancedate = new Date().toLocaleDateString()
      console.log(attendancedate);
        const data = {email:email,date:attendancedate,status:"present"}
        axios.post("http://localhost:3001/attendace",{data})
    }
    
  return (
    <div>
        <div className='options'>
          <h1>FoundMyHostel </h1>
          <div>
          <button onClick={handleCheckInOut} className='check-button'>
          {checkedIn ? 'Check Out' : 'Check In'}
          </button>
          <button onClick={handleattendance} >
                Attendance
          </button>
          </div>
        </div>
        <div style={{
          background: 'white',
          textAlign: 'center',
          padding: '50px'
        }}>
       {checkedIn ?  <h3>{tenantName}! mess is available, Go Fuel UP!! </h3> : ""}
         </div>
        {checkedIn ?  <div><label for="story"><h4>Give us your complaints</h4></label>
        <textarea onChange={handleChange} id="story" value={complaint} name="story" rows="5" cols="33">...</textarea>
        <button type='submit' onClick={handleSubmit}>Submit</button>
        </div>
        
        :
          <div className='thank-text'><h1>Thank your for using our service feel free to come back again</h1></div>}
          </div>
  )
}

export default Tenants