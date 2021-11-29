import React, { useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import FooterC from '../footer/FooterC';
import Login from '../login/Login';
import Routes from '../Routes';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './layout.css';

// redux
import ThemeAction from '../../redux/actions/ThemeAction';
import { getPost } from '../../redux/actions/Post';


const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        // theme_menu
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))
        
        dispatch(ThemeAction.setColor(colorClass))

        // post
        dispatch(getPost())
    }, [dispatch])

    return (
        <BrowserRouter>
            {/* <Login /> */}
            <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <TopNav />
                        <div className="layout__content-main">
                            <Routes />
                        </div>
                        <FooterC />

                    </div>
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layout
