import React from 'react'
import FormBg from '../components/FormBg/FormBg'
import LoginForm from '../components/LoginForm/LoginForm'
import SignupForm from '../components/SignupForm/SignupForm'
import './Login.css'

export default function Login({isLoginPage, setUser}) {
    return (
        <div className="login-page">

            <FormBg />
            {
                isLoginPage ? <LoginForm setUser={setUser}/> : <SignupForm setUser={setUser}/>
            }
        </div>
    )
}
