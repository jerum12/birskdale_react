import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"

import FormControl from "@material-ui/core/FormControl"
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from "@material-ui/core/TextField"
import jwt_decode from 'jwt-decode'

import config from '../../../../../config';

// Destructure props
const ChangePasswordForm = (props) => {

const [alertSuccess, setAlertSuccess] = useState(false)
const [alertFailed, setAlertFailed] = useState(false)
const [message, setMessage] = useState('')
const [isError, setIsError] = useState(false)



const [fields, setFields] = useState({
    current_password : "",
    new_password : "",
    conf_password : ""
  })
  
  // Copy fields as they all have the same name
const [filedError, setFieldError] = useState({
    ...fields
  })


// const onSuccess = () => {
//     setAlertSuccess(false);
//     setAlertFailed(false);      
//    //props.history.push('/users/update')
//   window.location.reload(false);
// }

const hideAlert = () => {
    
    setAlertSuccess(false)
    setAlertFailed(false);
}

const handleSubmit = () => {

    const token = sessionStorage.getItem("jwtTokenKey")
    const decoded = jwt_decode(token)

    const parameterObject = {
        user_id : decoded.id,
        user_name : decoded.details.user_name,
        current_password : fields.current_password,
        new_password : fields.new_password,
        transaction_date : new Date(),
    };

    axios({
        method: 'POST',
        url: config.apiUsers+'validate/',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : sessionStorage.getItem('jwtTokenKey')
        },
        data: parameterObject
        })
        .then((response) => {
        

            if(response.data.code === '00'){
                setMessage(response.data.message)
                setAlertSuccess(true)   
            }else{
                setMessage(response.data.message)
                setAlertFailed(true);
            }
        }).catch((error) => {
          //console.log(error)
            setAlertFailed(true);
                setMessage(error.message)
        })
}

const handleChange = (input) => (event) => {

const value = event.target.value
const formErrors = { ...filedError }
const mandatory = value === null || value === ""


    switch (input) {
          case "current_password":
                if( mandatory){
                    formErrors.current_password = "Mandatory"
                }else{
                    formErrors.current_password = ""
                }
              break
          case "new_password":
            
              if( mandatory){
                formErrors.new_password = "Mandatory"
              }
              else if( fields.conf_password !== '' && value !== fields.conf_password ){
                formErrors.new_password = "Password & Confirm Password did not match"
              }else if( fields.conf_password !== '' && value !== fields.conf_password ){
                formErrors.new_password = "Password & Confirm Password did not match"
              }else{
                formErrors.new_password = ""
              }
              break
          case "conf_password":
              if( mandatory){
                formErrors.conf_password = "Mandatory"
              }
              else if( fields.new_password !== '' && fields.new_password !== value ){
                formErrors.conf_password = "Password & Confirm Password did not match"
              }else if( fields.new_password !== '' && fields.new_password === value ){
                formErrors.conf_password = ""
                formErrors.new_password = ""
              }else{
                formErrors.conf_password = ""
              }
              break  
        default:
          break
      }

      for(var i=0 ; i < Object.values(formErrors).length; i++){

        if(Object.values(formErrors)[i].length  > 0 ){
            setIsError(true)
            break;
        }else{
            setIsError(false)
        }
    }

    setFields({
        ...fields,
        [input]: value
      })

      setFieldError({
        ...formErrors
      })
  
  }

  
const isEmpty =
fields.current_password !== null && fields.current_password !== '' &&
fields.conf_password !== null && fields.conf_password !== '' &&
fields.new_password !== null && fields.new_password !== '' 

  return (
    <Fragment>
      <Grid container spacing={1}>

         
          <Grid item xs={12} sm={12}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="Current Password"
                    name="current_password"
                    defaultValue={fields.current_password}
                    onChange={handleChange("current_password")}
                    margin="normal"
                    type="password"
                    error={filedError.current_password !== ""}
                    helperText={
                        filedError.current_password !== "" ? `${filedError.current_password}` : ""
                    }
                    inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                    required
                />
                </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="New Password"
                    name="new_password"
                    type="password"
                    defaultValue={fields.new_password}
                    onChange={handleChange("new_password")}
                    margin="normal"
                    error={filedError.new_password !== ""}
                    helperText={
                        filedError.new_password !== "" ? `${filedError.new_password}` : ""
                    }
                    inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                    required
                />
                </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="Confirm Password"
                    name="conf_password"
                    type="password"
                    defaultValue={fields.conf_password}
                    onChange={handleChange("conf_password")}
                    margin="normal"
                    error={filedError.conf_password !== ""}
                    helperText={
                        filedError.conf_password !== "" ? `${filedError.conf_password}` : ""
                    }
                    inputProps={{
                        autocomplete: 'new-password',
                        form: {
                          autocomplete: 'off',
                        },
                      }}
                    required
                />
                </FormControl>
          </Grid>


      </Grid>
      <div
        style={{ display: "flex", marginTop: 10, justifyContent: "flex-end" }}
      >

        { alertSuccess
            ?
            <SweetAlert
            success
            confirmBtnText = "Okay"
            confirmBtnBsStyle= "success"
            onConfirm={props.handleClose}
            title=''
            >
             <p style={{color : 'black', fontWeight : 'bold'}}>{message}</p>
            </SweetAlert>
            
        : ''
        }

        { alertFailed
            ?
            <SweetAlert
            danger
            confirmBtnText = "Okay"
            confirmBtnBsStyle= "danger"
            onCancel ={hideAlert}
            onConfirm ={hideAlert}
            title=''
            >
             <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>{message}</p>
            </SweetAlert>
            
        : ''
        }

        {/* <button className="btn btn-primary shadow-2 mb-4"
            //onClick={handleBack}
        >
              <ArrowBackOutlinedIcon/>
        </button> */}
        

        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleSubmit}
            style={{ marginLeft: 20 }}
            disabled={!isEmpty || isError}
        >
            {/* <ArrowForwardOutlinedIcon/> */}
            Submit
        </button>

        {/* <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={ isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button> */}
      </div>
    </Fragment>
  )
}

export default ChangePasswordForm
