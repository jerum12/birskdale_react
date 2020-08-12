import React, { Component, Suspense } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';
import IdleTimer from 'react-idle-timer';

import {IdleTimeOutModal} from './IdleModal'
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import disableBrowserBackButton from 'disable-browser-back-navigation';
import {JWTExpiredModal} from '../../../Pages/JWTExpiredModal'
//import SweetAlert from 'react-bootstrap-sweetalert';
import jwt_decode from 'jwt-decode'

import './app.scss';

class AdminLayout extends Component {

    constructor(props){
        super(props)

        this.state = {
            timeout:1000 * 600 * 1,
            showModal: false,
            userLoggedIn: false,
            isTimedOut: false,
            showModalJWT: false,
            expired : false
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)

        this.handleClose = this.handleClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        //this.handleCloseExpired = this.handleCloseExpired.bind(this)
    }

    
    handleClose() {
        this.setState({showModal: false})
    }

    // handleCloseExpired() {
    //     this.setState({expired: false})
    //     this.onLogOut();
    // }
  
    handleLogout() {
        this.setState({expired: false})
        this.setState({showModal: false})
        this.setState({showModalJWT: false})
        this.onLogOut();
    }

    _setExpiredState () {
        const token = sessionStorage.getItem('jwtTokenKey');
        const decoded = jwt_decode(token)
        const dateNow = parseInt(Date.now()/1000);

        if(decoded.exp < dateNow)
            this.setState({showModalJWT : true})
             //this.setState({expired : true})
    }

      onLogOut(){
        //console.log('logout')
        sessionStorage.clear();
        this.props.loggedOut();
        this.props.history.push('/login')  
      }

    _onAction(e) {
       // //console.log('user did something', e)
        this.setState({isTimedOut: false})
      }
     
      _onActive(e) {
       // //console.log('user is active', e)
        this.setState({isTimedOut: false})
      }
     
      _onIdle(e) {
        ////console.log('user is idle', e)
        const isTimedOut = this.state.isTimedOut
         ////console.log(isTimedOut + '-timeout') 
        if (isTimedOut) {
            this.onLogOut();
        } else {
          this.setState({showModal: true})
          this.idleTimer.reset();
          this.setState({isTimedOut: true})
        }
        
      }

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };
      
    //   componentDidUpdate() {
    //     if(sessionStorage.getItem("expired")){
    //         this._setExpiredState();
    //         // return <SweetAlert
    //         //      warning
    //         //      confirmBtnText="Logout"
    //         //      confirmBtnBsStyle="primary"
    //         //      title="Your session has expired! Please login again."
    //         //      onConfirm ={this.handleLogout}
    //         //      onCancel ={this.handleClose}
                 
    //         //      />
    //     }
    //   }

      componentDidMount() {
        this.intervalID = setInterval(
          () => this._setExpiredState(),
          500
        );
      }
      componentWillUnmount() {
        clearInterval(this.intervalID);
      }

    componentWillMount() {
        disableBrowserBackButton();
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {
        ////console.log('admin layout ')
       
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        sessionStorage.getItem('login')
                        ? <route.component {...props} />
                        : <Redirect to='/login' />
                    )} />
            ) : (null);
        });

        return (
            <Aux>
                 <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    element={document}
                    onActive={this.onActive}
                    onIdle={this.onIdle}
                    onAction={this.onAction}
                    debounce={250}
                    timeout={this.state.timeout} />

                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>

                <IdleTimeOutModal 
                    showModal={this.state.showModal} 
                    handleClose={this.handleClose}
                    handleLogout={this.handleLogout}
                />

                <JWTExpiredModal 
                    showModal={this.state.showModalJWT} 
                    handleLogout={this.handleLogout}
                />

                {/* { this.state.expired ?
                    <SweetAlert
                    warning
                    confirmBtnText="Logout"
                    confirmBtnBsStyle="primary"
                    title={<span><div>Your session has expired! </div>Please login again.</span>}
      
                    onConfirm ={this.handleLogout}
                    onCancel ={this.handleLogout}
                    
                    />
                    :
                    ''
                } */}

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        loggedOut: () =>  dispatch(actionTypes.receiveLogout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));