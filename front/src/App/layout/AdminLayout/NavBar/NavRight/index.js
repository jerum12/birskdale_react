import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import {NavLink,Redirect} from 'react-router-dom';
import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';
import * as actionTypes from "../../../../../store/actions";
import {connect} from 'react-redux';
import { history } from '../../../../../util/History';
import jwt_decode from 'jwt-decode'


// const redirect = () => {
//     history.push('/birksdale/login')
// }

class NavRight extends Component {    

    state = {
        listOpen: false,
        logValue : false
    };

    logoutHandler =(e) => {
        console.log('logout')
        sessionStorage.clear();
        this.props.loggedOut();
        this.setState({
            logValue: true
         });
    }

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        if (this.state.logValue) {
            return <Redirect to='/login' />
        }

        
        const token = sessionStorage.getItem("jwtTokenKey")
        const decoded = token != null ? jwt_decode(token) : '';
        
        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    {/* <li>
                        <Dropdown alignRight={!this.props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-bell"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                        <a href={DEMO.BLANK_LINK}>clear all</a>
                                    </div>
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>John Doe</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>New ticket Added</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href={DEMO.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => {this.setState({listOpen: true});}}><i className="icon feather icon-mail"/></a>
                    </li> */}
                    
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{
                                    decoded != ''
                                    ? decoded.details.full_name
                                    : ''}</span>
                                    {/* <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"/>
                                    </a> */}
                                </div>
                                <ul className="pro-body">
                                    {/* <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="feather icon-lock"/> Lock Screen</a></li> */}
                                    <li style={{color : '#252b2f', cursor : 'pointer'}}><a onClick={e=>this.logoutHandler(e)} className="dropdown-item"><i className="feather icon-log-out"/> Logged Out</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loggedOut: () =>  dispatch(actionTypes.receiveLogout())
    }
};


export default connect(null, mapDispatchToProps)(NavRight);
