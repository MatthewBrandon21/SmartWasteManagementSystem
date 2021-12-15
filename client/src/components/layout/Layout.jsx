import React, { useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../topnav/TopNav';
import FooterC from '../footer/FooterC';
import Routes from '../Routes';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './layout.css';

// redux
import ThemeAction from '../../redux/actions/ThemeAction';
import { getUser } from '../../redux/actions/User';
import { getTrash } from '../../redux/actions/Trash';


const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        // theme_menu
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light');

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light');

        dispatch(ThemeAction.setMode(themeClass));

        dispatch(ThemeAction.setColor(colorClass));

        // users
        dispatch(getUser());

        // trash
        dispatch(getTrash());
    }, [dispatch])


    return (
        <BrowserRouter>
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
