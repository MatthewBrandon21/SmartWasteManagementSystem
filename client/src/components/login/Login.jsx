import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/Login'
import logo from '../../assets/images/logo_txt.png'
import './login.css';

const initialState = { user_email: '', user_pwd: '' }

const Form = () => {

    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="login__item">
                <h1>Login</h1>
                <div className="login__input">
                    <input name="user_email" type="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div className="login__input">
                    <input name="user_pwd" type="password" placeholder="Password" onChange={handleChange} />
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
            <a href="/"><div className="login__logo">
                <img src={logo} alt="company logo" />
            </div></a>
            <Form />
        </div>
    )
}

export default Login