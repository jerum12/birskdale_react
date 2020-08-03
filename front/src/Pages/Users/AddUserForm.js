import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"

import FormControl from "@material-ui/core/FormControl"
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import TextField from "@material-ui/core/TextField"

// Destructure props
const AddUserForm = (props) => {

const [alertSuccess, setAlertSuccess] = useState(false)
const [alertFailed, setAlertFailed] = useState(false)
const [message, setMessage] = useState('')
const [isError, setIsError] = useState(false)



const [fields, setFields] = useState({
    full_name : "",
    user_name : "",
    password : "",
    conf_password : ""
  })
  
  // Copy fields as they all have the same name
const [filedError, setFieldError] = useState({
    ...fields
  })


const onSuccess = () => {
    setAlertSuccess(false);
    setAlertFailed(false);      
   //props.history.push('/users/update')
  window.location.reload(false);
}

const hideAlert = () => {
    
    setAlertSuccess(false)
    setAlertFailed(false);
}

const handleSubmit = () => {

    const parameterObject = {
        full_name : fields.full_name,
        user_name : fields.user_name,
        password : fields.password,
        transaction_date : new Date(),
       
    };

    console.log(parameterObject);

    axios({
        method: 'POST',
        url: 'http://localhost:5000/api/users/data/',
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
          console.log(error)
            setAlertFailed(true);
                setMessage(error.message)
        })
}

const handleChange = (input) => (event) => {

const value = event.target.value
const formErrors = { ...filedError }
const mandatory = value === null || value === ""


    switch (input) {
        case "full_name":
          formErrors.full_name = mandatory
              ? "Mandatory"
              : ""
          break
          case "user_name":
              formErrors.user_name = mandatory
                  ? "Mandatory"
                  : ""
              break
          case "password":
            
              if( mandatory){
                formErrors.password = "Mandatory"
              }
              else if( fields.conf_password !== '' && value !== fields.conf_password ){
                formErrors.password = "Password & Confirm Password did not match"
              }else if( fields.conf_password !== '' && value !== fields.conf_password ){
                formErrors.password = "Password & Confirm Password did not match"
              }else if(value.length < 7){
                formErrors.password = "Password must be greater than 6 characters"
              }else{
                formErrors.password = ""
              }
              break
          case "conf_password":
              if( mandatory){
                formErrors.conf_password = "Mandatory"
              }
              else if( fields.password !== '' && fields.password !== value ){
                formErrors.conf_password = "Password & Confirm Password did not match"
              }else if( fields.password !== '' && fields.password === value ){
                formErrors.conf_password = ""
                formErrors.password = ""
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
fields.full_name !== null && fields.full_name !== '' &&
fields.user_name !== null && fields.user_name !== '' &&
fields.password !== null && fields.password !== '' &&
fields.conf_password !== null && fields.conf_password !== '' 

  return (
    <Fragment>
      <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="Full Name"
                    name="full_name"
                    defaultValue={fields.full_name}
                    onChange={handleChange("full_name")}
                    margin="normal"
                    error={filedError.full_name !== ""}
                    helperText={
                        filedError.full_name !== "" ? `${filedError.full_name}` : ""
                    }
                    required
                />
                </FormControl>
          </Grid>
         
          <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="Username"
                    name="user_name"
                    defaultValue={fields.user_name}
                    onChange={handleChange("user_name")}
                    margin="normal"
                    error={filedError.user_name !== ""}
                    helperText={
                        filedError.user_name !== "" ? `${filedError.user_name}` : ""
                    }
                    required
                />
                </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue={fields.password}
                    onChange={handleChange("password")}
                    margin="normal"
                    error={filedError.password !== ""}
                    helperText={
                        filedError.password !== "" ? `${filedError.password}` : ""
                    }
                    required
                />
                </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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
            onConfirm={onSuccess}
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

export default AddUserForm
