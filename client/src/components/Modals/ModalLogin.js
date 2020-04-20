import React,{ useState,useContext } from "react";
import './Modal.css';
import { Button, Popup, Modal, Icon, Form, Message, Segment,Label } from 'semantic-ui-react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {GenericContext} from '../../context/GenericContext'

function ModalLogin(props){

    
    // const { value:userName, bind:bindUsername, reset:resetUserName } = useInput('');
    // const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
    const [openLogin, setOpenLogin] = useState(false);
    const [dimmerLogin, setDimmerLogin] = useState(true);

    const { handleSubmit, register, setValue, reset, errors } = useForm();
    const [userNameValid, setUserNameValid] = useState(false);
    const [toDashboard,setToDashboard] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const genContext = useContext(GenericContext)

    const showModalLogin = (dimmer) => () => {
        setDimmerLogin(dimmer)
        setOpenLogin(true)
    }
    
    const closeModalLogin = () => {
        setOpenLogin(false)
    }

    const onSubmit = data => {

        //validateField('user_name',data.user_name)

        var bodyFormData = new FormData();
        bodyFormData.set('user_name', data.user_name)
        bodyFormData.set('password', data.password)

        //console.log(data)

        //genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: 'token here 123'})
        //setToDashboard(true)
         
        //props.history.push("/home");

        
        const userObject = {
            user_name: data.user_name,
            password: data.password
        };

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/users/login',
            headers: {
                'Content-Type': 'application/json'
              },
            data: userObject
            })
            .then(function (response) {
                //handle success
                
                if(response.status == '201'){
                    if(response.data.code == '00'){
                        localStorage.setItem('jwtTokenKey',  'Bearer ' + response.data.data.token)
                        localStorage.setItem('login',  true)
                        genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: response.data.data.token, login : true})
                        setToDashboard(true)
                    }
                }else{
                    genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                    setToDashboard(false)
                    setErrorMessage(response.data.data.message)
                    console.log(response);
                }
                
            })
            .catch(function (error) {
                //handle error
                genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                setToDashboard(false)
                //setErrorMessage( Object.assign({}, error).response.data.message)
                //console.log('error', Object.assign({}, error).response.data.message);
                console.log(Object.assign({}, error).response.data.message[0].msg)

            });
    };
    
    // const validateField = (fieldName, value) => {    
    //     let a = false;
    //     switch(fieldName) {
    //       case 'user_name':
    //         a = value.length >= 3 ? true : false 
    //         break;
    //       default:
    //         break;
    //     }
    //     //console.log(a)
    //     setUserNameValid(a);
    //   }

     const errorClass = (error) => {
        //console.log(error)
        return(!error ? '' : 'has-error');
      }

    if (toDashboard) 
       // props.history.push('/about')
        return <Redirect to='/dashboard/stocks/inquire' />
    else{
        return (
            <div>
            
                    <Popup
                    trigger={  <div id="login-png" onClick={showModalLogin('blurring')}></div> }
                    content= {`Login`}
                    position='bottom center'
                    />
                
                    <Modal open={openLogin} dimmer={dimmerLogin} onClose={closeModalLogin} size='mini' >
                   
                        <Modal.Header>
                        <Segment raised>
                            <Label as='a' color='blue' ribbon>
                            <Icon name='angle double right' size='large' />
                            </Label>
                            <p className='modal-p'><span className='modal-s'>Login</span></p>
                        </Segment>
                        </Modal.Header>
                        <form onSubmit={handleSubmit(onSubmit)} className='form-group'>
                        <Modal.Content>
                            <Modal.Description>


                                { errorMessage.length > 0 ? 
                                    <Message negative>
                                        <Message.Header>{errorMessage}</Message.Header>
                                    </Message>
                                :
                                    ''   
                                }
                                <div className='form-group'>
                                    <div>
                                        <label>Username</label>
                                    </div>
                                    {/* <div className={`ui left corner labeled input form-input ${errorClass(userNameValid)}`}> */}
                                    <div className='ui left corner labeled input form-input'>
                                        <div className="ui label label left corner"><i aria-hidden="true" className="users icon"></i></div>
                                         <input type="text" 
                                         placeholder="Username..." 
                                         ref={register({ required: "Username is mandatory" })}
                                         aria-invalid={errors.user_name ? 'true' : 'false'}
                                         name="user_name"
                                         className={`${errorClass(userNameValid)}`}
                                         />
                                    </div>
                                    {errors.user_name && <div className="ui red pointing basic label">{errors.user_name.message}</div>}
                                </div>   
                                <div className='form-control'>
                                    <div>
                                        <label>Password</label>
                                    </div>
                                    <div className="ui left corner labeled input form-input">
                                        <div className="ui label label left corner"><i aria-hidden="true" className="key icon"></i></div>
                                         <input type="password" 
                                         placeholder="Password..." 
                                         ref={register({ required: "Password is mandatory" })}
                                         aria-invalid={errors.password ? 'true' : 'false'}
                                         name="password"
                                         />
                                    </div>
                                    {errors.password && <div className="ui red pointing basic label">{errors.password.message}</div>}
                                </div>                          
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions style={formAction    }>
                            <Button onClick={closeModalLogin}>Cancel</Button>
                            <Button
                                positive
                                icon='checkmark'
                                labelPosition='right'
                                content='Submit'
                                // onClick={handleSubmit(onSubmit)}
                            />
                        </Modal.Actions>
                        </form>
                    </Modal>
                
                {/*                 
                <form onSubmit={handleSubmit}>
                    <label>
                    First Name:
                    <input type="text" {...bindFirstName} />
                    </label>
                    <label>
                    Last Name:
                    <input type="text" {...bindLastName} />
                    </label>
                    <input type="submit" value="Submit" />
                </form> */}
          </div>
        );

      }

    
};



const formAction = {
    height : '50px',
    float: 'right'
}

export default ModalLogin