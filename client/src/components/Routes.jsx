import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import Employee from '../pages/Employee'
import Trash from '../pages/Trash'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/employee' component={Employee}/>
            <Route path='/trash' component={Trash}/>
        </Switch>
    )
}

export default Routes
