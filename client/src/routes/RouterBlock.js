import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import HomePage from './../components/Page/HomePage';
import Dashboard from './../components/Page/Dashboard';
import Contact from './../components/Page/Contact';

const ProtectedRoute = ({component:Component, ...rest}) => {
    return <Route {...rest} render={(props)=>{
        return localStorage.getItem('jwtTokenKey') ? 
        <Component {...props} /> : <Redirect to="/monitorStocks" />
    }} />
}

const RouterBlock =() => {

   
        return(
            <React.Fragment>
                <Router>
                    <Route exact path="/monitorStocks" component={HomePage} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/contact" component={Contact} />

            
                    {/* <ProtectedRoute path="/viewall" component={ViewAll} />
                    <ProtectedRoute path="/addedit" component={AddEdit} /> */}
                </Router>
            </React.Fragment>
        )
    
}

export default RouterBlock