import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Admin from '../pages/Admin'
import Employee from '../pages/Employee'
import Trash from '../pages/Trash'
import Maps from '../pages/Maps'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/admin' component={Admin} />
            <Route path='/employee' component={Employee} />
            <Route path='/trash' component={Trash} />
            <Route path='/maps' component={Maps} />
        </Switch>
    )
}

export default Routes
