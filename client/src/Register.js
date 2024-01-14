import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const navigate = useNavigate()
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [emailReg, setEmailReg] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
      const carousel = document.querySelector('.carousel');
      const carouselItems = document.querySelectorAll('.carousel-item');
      const carouselButtons = document.querySelectorAll('.carousel_button');
  
      let currentIndex = 0;
  
      function showItem(index) {
        carouselItems.forEach((item, i) => {
          item.style.display = i === index ? 'block' : 'none';
        });
      }
  
      function updateCarousel() {
        carouselButtons.forEach((button, i) => {
          button.addEventListener('click', () => {
            currentIndex = i;
            showItem(currentIndex);
            updateButtonStyles();
          });
        });
      }
  
      function updateButtonStyles() {
        carouselButtons.forEach((button, i) => {
          button.classList.toggle('carousel_button--selected', i === currentIndex);
        });
      }
  
      function startCarousel() {
        setInterval(() => {
          currentIndex = (currentIndex + 1) % carouselItems.length;
          showItem(currentIndex);
          updateButtonStyles();
        }, 3000); // Adjust the interval for the desired speed (in milliseconds)
      }
  
      showItem(currentIndex);
      updateCarousel();
      startCarousel();
    }, [])
    
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
      }
    }

    return (
      <body>
        <div class='container'>
          <div class='carousel'>
            <div class='carousel-item'>
              <img src="/images/login1.png" alt=""/>
              <div class="carousel-text">Enter your ingredients</div>
            </div>
            <div class='carousel-item'>
              <img src="/images/login2.png" alt=""/>
              <div class="carousel-text">Find a recipe and start cooking</div>
            </div>
            <div class='carousel-item'>
              <img src="/images/login3.png" alt=""/>
              <div class="carousel-text">Then start eating your delicious meal</div>
            </div>
            <div class='carousel_nav'>
              <span class='carousel_button'></span>
              <span class='carousel_button'></span>
              <span class='carousel_button'></span>
            </div>            
          </div>
          <div class="registration">
            <h1>Registration</h1>
            <label class="username-label">Username</label>
              <input 
                type="text"
                onChange={(e)=> {
                  setUsernameReg(e.target.value)
                }}
              />
            <label class="password-label">Password</label>
              <input
                type="text" 
                onChange={(e)=> {
                  setPasswordReg(e.target.value)
                }}
              />
            <label class="email-label">Email</label>
              <input
                type="text" 
                onChange={(e)=> {
                  setEmailReg(e.target.value)
                }}
              />
            <button class="register-button" onClick={handleRegistration}>Register</button>      
            <div class='login'>
              <Link to="/">
                <button> Login </button>
              </Link>
            </div>
            {error && <p class='error-message'>{error}</p>}
          </div>
        </div>
      </body>
    )
}

export default Register