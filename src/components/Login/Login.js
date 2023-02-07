import React from "react"
import './Login.scss'
import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import axios from 'axios'
function App () {
  const [data,setData] = useState({ email:"", password:""})
  const navigate = useNavigate()
  const takeToSignup =()=> {
      navigate('/signup')
  }
  function handleEmail (e) {
    setData({...data,email:e.target.value})
  }
  function handlePassword (e) {
    setData({...data,password:e.target.value})
  }
  function handleSubmit (e) {
    e.preventDefault()
    axios.post('http://localhost:3001/signin',{data}).then(response=>{
        if(response.data.valid==="owner"){
          navigate('/ownerdashboard')
        }
        else{
          if(response.data.valid){
            navigate('/tenant',{state: {
              email:data.email
            }})
        }
        else alert("Email or Password Invalid")
        }

      
    })
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p className="direct-Signup text-right mt-2">
            If you haven't made an account  <a href="#" onClick={takeToSignup}>Sign up here</a>
          </p>
        </div>
      </form>
    </div>
  )
}
export default App;