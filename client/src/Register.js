import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [error, setError] = useState("")
    
    const handleRegistration = async () => {

      const API_BASE_URL = 'https://www.whattocook.cc'
      const API = "http://localhost:3000"

      try {
        const response = await Axios.post(`${API}/users/register`, {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        }, { withCredentials: true })
        console.log(response.data.message)
        navigate('/')
      } catch(error) {
          console.error(error)
          setError(error.response?.data.error || "Registration failed. Please try again.") 
      };
    }

    return (
        <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input 
          type="text" 
          onChange={(e)=> {
            setUsernameReg(e.target.value)
          }}
        />
        <label>Password</label>
        <input
          type="text" 
          onChange={(e)=> {
            setPasswordReg(e.target.value)
          }}
        />  
        <label>Email</label>
        <input
          type="text" 
          onChange={(e)=> {
            setEmailReg(e.target.value)
          }}
        />  
        <button onClick={handleRegistration}>Register</button>      
        {error && <p className='error-message'>{error}</p>}
      </div>
    )
}

export default Register