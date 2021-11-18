import React from 'react';
import logo from '../../assets/images/logo_txt.png'
import './login.css';


const Form = () => {

    return (
        <form>
            <div className="login__item">
                <h1>Login</h1>
                <div className="login__input">
                    <input type="text" placeholder="Email" />
                </div>
                <div className="login__input">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="login__input-btn">
                    <input type="submit" value="login" />
                </div>
            </div>
        </form>
    )
}

const Login = () => {
    
    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt="company logo" />
            </div>
            <Form />
        </div>
    )
}

export default Login