import React from 'react'
import '../LoginForm/LoginForm.css'
import {Link} from "react-router-dom"
import { useState } from "react";
import md5 from "md5";
import axios from 'axios'

export default function SignupForm({setUser}) {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        pwdHash: "",
        cpwdHash: "",
    })

    const handleChange = (e) => {
        setUserInput({
          ...userInput,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userInput.cpwdHash !== userInput.pwdHash) {
            alert('Password and Confirm Password are not the same');
        }
        else {
            try {
                const response = await axios.post('/users/signup', {
                    name: userInput.name,
                    email: userInput.email,
                    pwdHash: md5(userInput.pwdHash),
                })
                if(response.status === 223) {
                    alert(response.data)
                }
                else {
                    setUser(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
            } catch(error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="login-form">
          <div className="content-area">
           <div className="title">Signup</div>
           <div className="subtitle">To explore a world of <br/>mouth-watering recipes!!</div>
           <div className="fields">
                <form id="signupForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                            <label>Name</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="signup-name" name="name" value={userInput.name} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <div className="input-group">
                                <input type="text" className="form-control" id="signup-email" name="email" value={userInput.email} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control" id="signup-password" name="pwdHash" value={userInput.pwdHash} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control" id="signup-confirm-password" name="cpwdHash" value={userInput.cpwdHash} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="mb-3">
                        <button type="submit" className="btn btn-success">Signup</button>
                        </div>
                        <p>Already have an account? <Link to="/login"><span style={{color: "blue", textDecoration: "underline"}}>Login</span></Link></p>
                </form>
            </div>
          </div>
        </div>
    )
}