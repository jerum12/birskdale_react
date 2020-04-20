import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Homepage from '../components/Page/Homepage';
import Dashboard from './../components/Page/Dashboard';
import Dashboard2 from './../components/Page/Dashboard2';
import Dashboard3 from './../components/Page/Dashboard3';
import Contact from './../components/Page/Contact';
import util from '../util/Utils'

const ProtectedRoute = ({component:Component, ...rest}) => {
    return <Route {...rest} render={(props)=>{
        return localStorage.getItem('jwtTokenKey') ? 
        <Component {...props} /> : <Redirect to="/monitorStocks" />
    }} />
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('jwtTokenKey')
        ? <Component {...props} />
        : <Redirect to='/monitorStocks' />
    )} />
)
const RouterBlock =() => {
   
        return(
            <React.Fragment>
                <Router>
                    <Route exact path="/monitorStocks" component={Homepage} />
                    <PrivateRoute path="/dashboard" component={Dashboard3} />
                    {/* <ProtectedRoute path="/viewall" component={ViewAll} />
                    <ProtectedRoute path="/addedit" component={AddEdit} /> */}
                </Router>
            </React.Fragment>
        )
    
}

export default RouterBlock