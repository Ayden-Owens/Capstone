import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import 'Login.css'


const Login = () => {
    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        const API_BASE_URL = 'https://www.whattocook.cc'
        const API = "http://localhost:3001"
        console.log(API)

        if (!usernameLog || !passwordLog) {
            setLoginStatus("Please enter both username and password")
            return
        }

        try {
            const response = await Axios.post(API_BASE_URL + "/users/login", {
                username: usernameLog,
                password: passwordLog,
            }, { withCredentials: true })

            console.log(response)
            console.log(response.data.message)
            
            const { token } = response.data
            
            Cookies.set('userToken', token, { expires: 1 })
            
            setLoginStatus(response.data.message)
            navigate('/Home')
        } 
        catch (error){
            console.error(error);
            setLoginStatus("Error during login");
        };
    }

    // useEffect(()=> {
    //     Axios.get("http://localhost:3001/users/check-login")
    //         .then((response) => {
    //             if (response.data.loggedIn === true) {
    //                 setLoginStatus(response.data.user.username)
    //             }    
    //     })
    //     .catch((error) => {
    //         console.error("Error checking login status:", error)
    //         setLoginStatus("Error checking login status")
    //     })
    // }, [])

    return (
        <div className='container'>
            <div className='carousel'>
                <div className='carousel__item'>Content#1</div>
                <div className='carousel__item'>Content#2</div>
                <div className='carousel__item'>Content#3</div>
                <div className='carousel__nav'>
                    <span className='carousel__button'></span>
                    <span className='carousel__button'></span>
                    <span className='carousel__button'></span>
                </div>
            </div>
            <div className="login" style={{textAlign:'center',fontFamily:'cursive'}}>
                <h1>Login</h1>
                <input 
                    type="text" 
                    placeholder="Username ..."
                    onChange={(e) => {
                        setUsernameLog(e.target.value);
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Password ..."
                    onChange={(e) => {
                        setPasswordLog(e.target.value);
                    }}
                />
                <button onClick={handleLogin}>Login</button>
                {/* <div>
                    <Link to="/register">Register</Link>
                </div> */}
                <div> 
                    <Link to="/register">
                        <button style={{fontFamily: 'cursive'}}>
                            Register
                        </button>
                    </Link>
                </div>
                <p className="message">{loginStatus}</p>
            </div>      
        </div> 
    )
}

export default Login;
