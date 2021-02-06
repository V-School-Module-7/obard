import React from 'react'
//css
import "./landingCSS/landing.css"

export default function Login() {
        return (
            <div>
                <h2 className="returning-customers">Returning Customers</h2>
                <form className="login-form" action="">
                    <h3>Username</h3>
                    <input className='login-username-input' type="text"/>
                    <h3>Password</h3>
                    <input className='login-password-input' type="password"/>
                    <button className="login-button">Sign In</button>
                </form>
            </div>
        )
}
