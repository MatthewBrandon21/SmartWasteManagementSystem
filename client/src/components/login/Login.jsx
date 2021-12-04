import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/Login'
import logo from '../../assets/images/logo_txt.png'
import './login.css';

const initialState = { email: '', password: '' }

const Form = () => {

    const [formData, setFormData] = useState(initialState)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(formData)
        dispatch(login(formData, history))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="login__item">
                <h1>Login</h1>
                <div className="login__input">
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                </div>
                <div className="login__input">
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} />
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