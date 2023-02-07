
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
  function Signup () {
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate()
  const [data,setData] = useState({name:"", email:"", password:""})

  const changeAuthMode = () => {
    navigate('/')
  }
  function handleEmail (e) {
      setData({...data,email:e.target.value})
      console.log(data);
  }

  function handleName (e) {
    console.log(e.target.value)
    setData({...data,name:e.target.value})
}

function handlePassword (e) {
  
  setData({...data,password:e.target.value})
  console.log(data);
}

async function handleSubmit (e) {
  e.preventDefault();
      axios.post('http://localhost:3001/signup',{data}).then(response => {
      console.log(response.data);
      if (response.data === true) {
        alert("Email id already in use Please try Signing in");
      } else {
        setAlertMessage('');
      }
    })
    
  
   
     

}
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={handleName}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}
export default Signup