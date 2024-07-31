import React from 'react'
import './LoginForm.css'
import {Link} from "react-router-dom"
import { useState } from "react";
import md5 from "md5";
import axios from 'axios'

const BACKEND_URL = "https://recipebook-backend-nu2n.onrender.com"

export default function LoginForm({setUser}) {
    const [userInput, setUserInput] = useState({
        email: "",
        pwdHash: "",
    })

    const handleChange = (e) => {
        setUserInput({
          ...userInput,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BACKEND_URL + '/users/login', {
                email: userInput.email,
                pwdHash: md5(userInput.pwdHash),
            })
            if(response.status === 208) {
                alert(response.data)
            }
            else {
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
            }
        } catch(error) {
            console.log(error);
        }
    };
    return (
        <div className="login-form">
          <div className="content-area">
           <div className="title">Login</div>
           <div className="subtitle">To explore a world of <br/>mouth-watering recipes!!</div>
           <div className="fields">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label>Email</label>
                    <div className="input-group">
                        <input type="text" className="form-control" id="login-email" name="email" value={userInput.email} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="mb-3">
                    <label>Password</label>
                    <div className="input-group">
                        <input type="password" className="form-control" id="login-password" name="pwdHash" value={userInput.pwdHash} onChange={handleChange}/>
                    </div>
                    </div>
                    <div className="mb-3">
                    <button type="submit" className="btn btn-success">Login</button>
                    </div>
                    <p>Don't have an account? <Link to="/signup"><span style={{color: "blue", textDecoration: "underline"}}>Sign Up</span></Link></p>
                </form>
            </div>
          </div>
        </div>
    )
}
