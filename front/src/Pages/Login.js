import React, {useState, useContext} from 'react';
import {NavLink,Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './../assets/scss/style.scss'
import Aux from '../hoc/_Aux'
import  Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Label,Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actionTypes from "../store/actions";
import './Stocks/Stocks.css'

function Login(props){

    const { handleSubmit, register, setValue, reset, errors } = useForm();
    const [userNameValid, setUserNameValid] = useState(false);
    const [toDashboard,setToDashboard] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
 
    const onSubmit = data => {

        //validateField('user_name',data.user_name)

        //genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: 'token here 123'})
        //setToDashboard(true)
         
        //props.history.push("/home");

        const userObject = {
            user_name: data.user_name,
            password: data.password
        };

        axios({
            method: 'POST',
            url: 'http://192.168.0.27:5000/api/users/login',
            headers: {
                'Content-Type': 'application/json'
              },
            data: userObject
            })
            .then(function (response) {
                //handle success
                console.log(response)
                if(response.status === 201 || response.status === 200){
                    if(response.data.code === '00'){
                        sessionStorage.setItem('jwtTokenKey',  'Bearer ' + response.data.data.token)
                        sessionStorage.setItem('login',  true)
                        //genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: response.data.data.token, login : true})
                        setToDashboard(true)
                        props.successfulLogin(response.data.data);
                    }else{
                        setToDashboard(false)
                        setErrorMessage(response.data.message)
                        props.failedLogin(response);
                    }
                }else{
                    //genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                    setToDashboard(false)
                    setErrorMessage(response.data.message)
                    props.failedLogin(response);
                }
                
            })
            .catch(function (error) {
                //handle error
                //genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                setToDashboard(false)
                console.log( Object.assign({}, error).response)
                //console.log('error', Object.assign({}, error).response.data.message);
                props.failedLogin( Object.assign({}, error).response);
            });
    };
    const errorClass = (error) => {
        //console.log(error)
        return(!error ? '' : 'has-error');
      }

    if (toDashboard) 
       // props.history.push('/about')
        return <Redirect to='/dashboard/default' />
    else{
        return(
            <Aux>
                <Breadcrumb/>
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r"/>
                                <span className="r s"/>
                                <span className="r s"/>
                                <span className="r"/>
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon"/>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className='form-group' autoComplete="off">
                                        <h3 className="mb-4">BIRKSDALE</h3>

                                        { errorMessage.length > 0 ? 
                                            <Message negative>
                                                <Message.Header>{errorMessage}</Message.Header>
                                            </Message>
                                        :
                                            ''   
                                        }

                                        {errors.user_name && 
                                            <Label basic color='red' pointing="below" style={{float : 'left'}}>
                                            {errors.user_name.message}
                                        </Label>                                    
                                        }
                                        <div className="input-group mb-3">
                                            <input type="text" 
                                            placeholder="Username..." 
                                            ref={register({ required: "Username is mandatory" })}
                                            aria-invalid={errors.user_name ? 'true' : 'false'}
                                            name="user_name"
                                            className={`form-control ${errors.user_name  && errorClass('hasError')}`}
                                            onChange={() => {
                                                setErrorMessage('')
                                              }}
                                            />
                                        </div>
                                        
                                        {errors.password && 
                                            <Label basic color='red' pointing="below" style={{float : 'left'}}>
                                            {errors.password.message}
                                        </Label>                                    
                                        }
                                        <div className="input-group mb-4">
                                            <input type="password" 
                                            placeholder="Password..." 
                                            ref={register({ required: "Password is mandatory" })}
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                            name="password"
                                            className={`form-control ${errors.password  && errorClass('hasError')}`}
                                            onChange={() => {
                                                setErrorMessage('')
                                              }}
                                            />
                                        </div>
                                       
                                        {/* <div className="form-group text-left">
                                            <div className="checkbox checkbox-fill d-inline">
                                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                                    <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                            </div>
                                        </div> */}
                                        <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                        {/* <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
                                        <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </Aux>
        );
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogin: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
//     }
// };

// const mapStateToProps = state => {
//     return {
//         collapseMenu: state.collapseMenu
//     }
// };

const mapDispatchToProps = dispatch => {
    return {
        successfulLogin: (data) =>  dispatch(actionTypes.receiveLogin(data)),
        failedLogin: (response) =>  dispatch(actionTypes.loginError(response.data.message))
    }
};


export default connect(null, mapDispatchToProps)(Login);
//export default Login;