import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './topnav.css';
import { Link } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import ThemeMenu from '../thememenu/ThemeMenu';
import user_image from '../../assets/images/tuat.png';
import user_menu from '../../assets/JsonData/user_menus.json';
import Typewriter from 'typewriter-effect';



const Topnav = () => {


    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: "LOGOUT" })

        setUser(null)

        window.location.reload(false)
    }

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <img src={user.image} alt="" />
            </div>
            <div className="topnav__right-user__name">
                {user.display_name}
            </div>
        </div>
    )

    const renderUserMenu = (item, index) => (
        <div key={index}>
            <div className="notification-item" onClick={() => logout() }>
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </div>
    )

    // login
    const userLogin = JSON.parse(localStorage.getItem('profile'));

    return (
        <div className='topnav'>
            <div className="welcome">
                <Typewriter
                    options={{
                        strings: ['Hi there!👋', 'Keep it up!🔥', 'You can do it!💪', "Don't forget to drink!🥤"],
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(
                            {
                                display_name: userLogin.result.user_username,
                                image: user_image
                            }
                        )}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>

                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav
