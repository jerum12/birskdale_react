import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"

import FormControl from "@material-ui/core/FormControl"
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import FormLabel from '@material-ui/core/FormLabel';
import './Stocks.css'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import config from '../../config';

// Destructure props
const SizeRunForm = ({
    data: { 
            size_run_2,
            size_run_2_5,
            size_run_3,
            size_run_3_5,
            size_run_4,
            size_run_4_5,
            size_run_5,
            size_run_5_5,
            size_run_6,
            size_run_6_5,
            size_run_7,
            size_run_7_5,
            size_run_8,
            size_run_8_5,
            size_run_9,
            size_run_9_5,
            size_run_10,
            size_run_10_5,
            size_run_11,
            size_run_11_5,
            size_run_12,
            size_run_13,
            _id
        },
    props
}) => {

const [s2_state, sets2_state] = useState(size_run_2)
const [s2_5_state, sets2_5_state] = useState(size_run_2_5)
const [s3_state, sets3_state] = useState(size_run_3)
const [s3_5_state, sets3_5_state] = useState(size_run_3_5)
const [s4_state, sets4_state] = useState(size_run_4)
const [s4_5_state, sets4_5_state] = useState(size_run_4_5)
const [s5_state, sets5_state] = useState(size_run_5)
const [s5_5_state, sets5_5_state] = useState(size_run_5_5)
const [s6_state, sets6_state] = useState(size_run_6)
const [s6_5_state, sets6_5_state] = useState(size_run_6_5)
const [s7_state, sets7_state] = useState(size_run_7)
const [s7_5_state, sets7_5_state] = useState(size_run_7_5)
const [s8_state, sets8_state] = useState(size_run_8)
const [s8_5_state, sets8_5_state] = useState(size_run_8_5)
const [s9_state, sets9_state] = useState(size_run_9)
const [s9_5_state, sets9_5_state] = useState(size_run_9_5)
const [s10_state, sets10_state] = useState(size_run_10)
const [s10_5_state, sets10_5_state] = useState(size_run_10_5)
const [s11_state, sets11_state] = useState(size_run_11)
const [s11_5_state, sets11_5_state] = useState(size_run_11_5)
const [s12_state, sets12_state] = useState(size_run_12)
const [s13_state, sets13_state] = useState(size_run_13)

const [alertSuccess, setAlertSuccess] = useState(false)
const [alertFailed, setAlertFailed] = useState(false)
const [message, setMessage] = useState('')
const [isError, setIsError] = useState(false)

const token = sessionStorage.getItem("jwtTokenKey")
const decoded = jwt_decode(token)

const [fields, setFields] = useState({
    size_run_2 : "",
    size_run_2_5 : "",
    size_run_3 : "",
    size_run_3_5 : "",
    size_run_4 : "",
    size_run_4_5 : "",
    size_run_5 : "",
    size_run_5_5 : "",
    size_run_6 : "",
    size_run_6_5 : "",
    size_run_7 : "",
    size_run_7_5 : "",
    size_run_8 : "",
    size_run_8_5 : "",
    size_run_9 : "",
    size_run_9_5 : "",
    size_run_10 : "",
    size_run_10_5 : "",
    size_run_11 : "",
    size_run_11_5 : "",
    size_run_12 : "",
    size_run_13 : ""
  })
  
  // Copy fields as they all have the same name
const [filedError, setFieldError] = useState({
    ...fields
  })


const onSuccess = () => {
    setAlertSuccess(false);
    setAlertFailed(false);      
    props.history.push('/stocks/inquire')
    //window.location.reload(false);
}

const hideAlert = () => {
    setAlertSuccess(false)
    setAlertFailed(false);
}

const handleSubmit = () => {

    const parameterObject = {
        size_run_2 : fields.size_run_2 === "" ? 0 : fields.size_run_2,
        size_run_2_5 : fields.size_run_2_5 === "" ? 0 : fields.size_run_2_5,
        size_run_3 : fields.size_run_3 === "" ? 0 : fields.size_run_3,
        size_run_3_5 : fields.size_run_3_5 === "" ? 0 : fields.size_run_3_5,
        size_run_4 : fields.size_run_4 === "" ? 0 : fields.size_run_4,
        size_run_4_5 : fields.size_run_4_5 === "" ? 0 : fields.size_run_4_5,
        size_run_5 : fields.size_run_5 === "" ? 0 : fields.size_run_5,
        size_run_5_5 : fields.size_run_5_5 === "" ? 0 : fields.size_run_5_5,
        size_run_6 : fields.size_run_6 === "" ? 0 : fields.size_run_6,
        size_run_6_5 : fields.size_run_6_5 === "" ? 0 : fields.size_run_6_5,
        size_run_7 : fields.size_run_7 === "" ? 0 : fields.size_run_7,
        size_run_7_5 : fields.size_run_7_5 === "" ? 0 : fields.size_run_7_5,
        size_run_8 : fields.size_run_8 === "" ? 0 : fields.size_run_8,
        size_run_8_5 : fields.size_run_8_5 === "" ? 0 : fields.size_run_8_5,
        size_run_9 : fields.size_run_9 === "" ? 0 : fields.size_run_9,
        size_run_9_5 : fields.size_run_9_5 === "" ? 0 : fields.size_run_9_5,
        size_run_10 : fields.size_run_10 === "" ? 0 : fields.size_run_10,
        size_run_10_5 : fields.size_run_10_5 === "" ? 0 : fields.size_run_10_5,
        size_run_11 : fields.size_run_11 === "" ? 0 : fields.size_run_11,
        size_run_11_5 : fields.size_run_11_5 === "" ? 0 : fields.size_run_11_5,
        size_run_12 : fields.size_run_12 === "" ? 0 : fields.size_run_12,
        size_run_13 : fields.size_run_13 === "" ? 0 : fields.size_run_13,
        
        size_run_2_new : s2_state === "" ? 0 : s2_state,
        size_run_2_5_new : s2_5_state === "" ? 0 : s2_5_state,
        size_run_3_new : s3_state === "" ? 0 : s3_state,
        size_run_3_5_new : s3_5_state === "" ? 0 : s3_5_state,
        size_run_4_new : s4_state === "" ? 0 : s4_state,
        size_run_4_5_new : s4_5_state === "" ? 0 : s4_5_state,
        size_run_5_new : s5_state === "" ? 0 : s5_state,
        size_run_5_5_new : s5_5_state === "" ? 0 : s5_5_state,
        size_run_6_new : s6_state === "" ? 0 : s6_state,
        size_run_6_5_new : s6_5_state === "" ? 0 : s6_5_state,
        size_run_7_new : s7_state === "" ? 0 : s7_state,
        size_run_7_5_new : s7_5_state === "" ? 0 : s7_5_state,
        size_run_8_new : s8_state === "" ? 0 : s8_state,
        size_run_8_5_new : s8_5_state === "" ? 0 : s8_5_state,
        size_run_9_new : s9_state === "" ? 0 : s9_state,
        size_run_9_5_new : s9_5_state === "" ? 0 : s9_5_state,
        size_run_10_new : s10_state === "" ? 0 : s10_state,
        size_run_10_5_new : s10_5_state === "" ? 0 : s10_5_state,
        size_run_11_new : s11_state === "" ? 0 : s11_state,
        size_run_11_5_new : s11_5_state === "" ? 0 : s11_5_state,
        size_run_12_new : s12_state === "" ? 0 : s12_state,
        size_run_13_new : s13_state === "" ? 0 : s13_state,
        
        transaction_date : new Date(),
        transaction_by : decoded.id,
        stocks_id : _id
    };

    //console.log(parameterObject);

    axios({
        method: 'POST',
        url: config.apiHistory+'data/',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : sessionStorage.getItem('jwtTokenKey')
        },
        data: parameterObject
        })
        .then((response) => {
          //console.log(response.data)

            if(response.data.code === '00'){
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

const handleChange = (input) => (value) => {
      
const formErrors = { ...filedError }
const mandatory = value === null
    
    switch (input) {
        case "size_run_2":
          formErrors.size_run_2 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets2_state(size_run_2)
              : sets2_state(size_run_2 + value)
          break
        case "size_run_2_5":
          formErrors.size_run_2_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets2_5_state(size_run_2_5)
              : sets2_5_state(size_run_2_5 + value)
          break
        case "size_run_3":
            formErrors.size_run_3 = mandatory
                ? "Mandatory"
                : ""
             value === null 
                ?  sets3_state(size_run_3)
                : sets3_state(size_run_3 + value)
            break
        case "size_run_3_5":
          formErrors.size_run_3_5 = mandatory
              ? "Mandatory"
              : ""
            value === null 
              ?  sets3_5_state(size_run_3_5)
              : sets3_5_state(size_run_3_5 + value)
          break
        case "size_run_4":
            formErrors.size_run_4 = mandatory
                ? "Mandatory"
                : ""
              value === null 
                ?  sets4_state(size_run_4)
                : sets4_state(size_run_4 + value)
            break
        case "size_run_4_5":
          formErrors.size_run_4_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets4_5_state(size_run_4_5)
              : sets4_5_state(size_run_4_5 + value)
          break
        case "size_run_5":
            formErrors.size_run_5 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets5_state(size_run_5)
                : sets5_state(size_run_5 + value)
            break
        case "size_run_5_5":
          formErrors.size_run_5_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets5_5_state(size_run_5_5)
              : sets5_5_state(size_run_5_5 + value)
          break
        case "size_run_6":
            formErrors.size_run_6 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets6_state(size_run_6)
                : sets6_state(size_run_6 + value)
            break  
        case "size_run_6_5":
          formErrors.size_run_6_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets6_5_state(size_run_6_5)
              : sets6_5_state(size_run_6_5 + value)
          break
        case "size_run_7":
            formErrors.size_run_7 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets7_state(size_run_7)
                : sets7_state(size_run_7 + value)
            break  
        case "size_run_7_5":
          formErrors.size_run_7_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets7_5_state(size_run_7_5)
              : sets7_5_state(size_run_7_5 + value)
          break
        case "size_run_8":
            formErrors.size_run_8 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets8_state(size_run_8)
                : sets8_state(size_run_8 + value)
            break  
        case "size_run_8_5":
          formErrors.size_run_8_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets8_5_state(size_run_8_5)
              : sets8_5_state(size_run_8_5 + value)
          break
        case "size_run_9":
            formErrors.size_run_9 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets9_state(size_run_9)
                : sets9_state(size_run_9 + value)
            break  
        case "size_run_9_5":
          formErrors.size_run_9_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets9_5_state(size_run_9_5)
              : sets9_5_state(size_run_9_5 + value)
          break 
        case "size_run_10":
            formErrors.size_run_10 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets10_state(size_run_10)
                : sets10_state(size_run_10 + value)
            break   
        case "size_run_10_5":
          formErrors.size_run_10_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets10_5_state(size_run_10_5)
              : sets10_5_state(size_run_10_5 + value)
          break    
        case "size_run_11":
            formErrors.size_run_11 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets11_state(size_run_11)
                : sets11_state(size_run_11 + value)
            break     
        case "size_run_11_5":
          formErrors.size_run_11_5 = mandatory
              ? "Mandatory"
              : ""
           value === null 
              ?  sets11_5_state(size_run_11_5)
              : sets11_5_state(size_run_11_5 + value)
          break  
        case "size_run_12":
            formErrors.size_run_12 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets12_state(size_run_12)
                : sets12_state(size_run_12 + value)
            break       
        case "size_run_13":
            formErrors.size_run_13 = mandatory
                ? "Mandatory"
                : ""
                value === null 
                ?  sets13_state(size_run_13)
                : sets13_state(size_run_13 + value)
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
      
    //   if(input === 'size_run_3'){
    //     let processValue = size_run_3 + value

    //     if(value === null){
    //         sets3_state(size_run_3)
    //         //console.log('error')
    //     }else{
    //         sets3_state(processValue)
    //     }
    //   }
  }


  const upHandler = (<div className="increaseBtn"><AddIcon/></div>);
  const downHandler = (<div className="decreaseBtn"><RemoveIcon/></div>);

  const noChange = size_run_2 !== null && size_run_2 === s2_state &&
                   size_run_2_5 !== null && size_run_2_5 === s2_5_state &&
                   size_run_3 !== null && size_run_3 === s3_state &&
                   size_run_3_5 !== null && size_run_3_5 === s3_5_state &&
                   size_run_4 !== null && size_run_4 === s4_state &&
                   size_run_4_5 !== null && size_run_4_5 === s4_5_state &&
                   size_run_5 !== null && size_run_5 === s5_state &&
                   size_run_5_5 !== null && size_run_5_5 === s5_5_state &&
                   size_run_6 !== null && size_run_6 === s6_state &&
                   size_run_6_5 !== null && size_run_6_5 === s6_5_state &&
                   size_run_7 !== null && size_run_7 === s7_state &&
                   size_run_7_5 !== null && size_run_7_5 === s7_5_state &&
                   size_run_8 !== null && size_run_8 === s8_state &&
                   size_run_8_5 !== null && size_run_8_5 === s8_5_state &&
                   size_run_9 !== null && size_run_9 === s9_state &&
                   size_run_9_5 !== null && size_run_9_5 === s9_5_state &&
                   size_run_10 !== null && size_run_10 === s10_state &&
                   size_run_10_5 !== null && size_run_10_5 === s10_5_state &&
                   size_run_11 !== null && size_run_11 === s11_state &&
                   size_run_11_5 !== null && size_run_11_5 === s11_5_state &&
                   size_run_12 !== null && size_run_12 === s12_state &&
                   size_run_13 !== null && size_run_13 === s13_state
  return (
    <Fragment>
      <Grid container spacing={1}>

        <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 2</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_2")}
                  required={true}
                  min={-size_run_2}
                  name="size_run_2"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_2 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_2 !== ""  && <p className="p-error">{filedError.size_run_2 }</p>}
              </FormControl>
              <div>
                  <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                    <Chip variant="outlined" color="primary" label={s2_state}/>
                </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 2.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_2_5")}
                  required={true}
                  min={-size_run_2_5}
                  name="size_run_2_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_2_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_2_5 !== ""  && <p className="p-error">{filedError.size_run_2_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s2_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

            <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 3</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_3")}
                  required={true}
                  min={-size_run_3}
                  name="size_run_3"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_3 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_3 !== ""  && <p className="p-error">{filedError.size_run_3 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s3_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 3.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_3_5")}
                  required={true}
                  min={-size_run_3_5}
                  name="size_run_3_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_3_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_3_5 !== ""  && <p className="p-error">{filedError.size_run_3_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s3_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 4</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_4")}
                  required={true}
                  min={-size_run_4}
                  name="size_run_4"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_4 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_4 !== ""  && <p className="p-error">{filedError.size_run_4 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s4_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 4.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_4_5")}
                  required={true}
                  min={-size_run_4_5}
                  name="size_run_4_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_4_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_4_5 !== ""  && <p className="p-error">{filedError.size_run_4_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s4_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_5")}
                  required={true}
                  min={-size_run_5}
                  name="size_run_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_5 !== ""  && <p className="p-error">{filedError.size_run_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 5.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_5_5")}
                  required={true}
                  min={-size_run_5_5}
                  name="size_run_5_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_5_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_5_5 !== ""  && <p className="p-error">{filedError.size_run_5_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s5_5_state}/>
              </div>
          </Grid>

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 6</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_6")}
                  required={true}
                  min={-size_run_6}
                  name="size_run_6"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_6 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_6 !== ""  && <p className="p-error">{filedError.size_run_6 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s6_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 6.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_6_5")}
                  required={true}
                  min={-size_run_6_5}
                  name="size_run_6_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_6_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_6_5 !== ""  && <p className="p-error">{filedError.size_run_6_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s6_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

            <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 7</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_7")}
                  required={true}
                  min={-size_run_7}
                  name="size_run_7"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_7 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_7 !== ""  && <p className="p-error">{filedError.size_run_7 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s7_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 7.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_7_5")}
                  required={true}
                  min={-size_run_7_5}
                  name="size_run_7_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_7_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_7_5 !== ""  && <p className="p-error">{filedError.size_run_7_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s7_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 8</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_8")}
                  required={true}
                  min={-size_run_8}
                  name="size_run_8"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_8 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_8 !== ""  && <p className="p-error">{filedError.size_run_8 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s8_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 8.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_8_5")}
                  required={true}
                  min={-size_run_8_5}
                  name="size_run_8_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_8_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_8_5 !== ""  && <p className="p-error">{filedError.size_run_8_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s8_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 9</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_9")}
                  required={true}
                  min={-size_run_9}
                  name="size_run_9"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_9 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_9 !== ""  && <p className="p-error">{filedError.size_run_9 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s9_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 9.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_9_5")}
                  required={true}
                  min={-size_run_9_5}
                  name="size_run_9_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_9_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_9_5 !== ""  && <p className="p-error">{filedError.size_run_9_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s9_5_state}/>
              </div>
          </Grid>

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 10</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_10")}
                  required={true}
                  min={-size_run_10}
                  name="size_run_10"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_10 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_10 !== ""  && <p className="p-error">{filedError.size_run_10 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s10_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 10.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_10_5")}
                  required={true}
                  min={-size_run_10_5}
                  name="size_run_10_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_10_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_10_5 !== ""  && <p className="p-error">{filedError.size_run_10_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s10_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

            <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 11</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_11")}
                  required={true}
                  min={-size_run_11}
                  name="size_run_11"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_11 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_11 !== ""  && <p className="p-error">{filedError.size_run_11 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s11_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 11.5</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_11_5")}
                  required={true}
                  min={-size_run_11_5}
                  name="size_run_11_5"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_11_5 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_11_5 !== ""  && <p className="p-error">{filedError.size_run_11_5 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s11_5_state}/>
              </div>
          </Grid>

          {/* <Divider orientation="vertical" flexItem /> */}

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal" >
                  <FormLabel component="legend" className='size_run_label'>Size Run 12</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_12")}
                  required={true}
                  min={-size_run_12}
                  name="size_run_12"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_12 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_12 !== ""  && <p className="p-error">{filedError.size_run_12 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s12_state}/>
              </div>
          </Grid>

          <Grid item xs={12} sm={2} className="gridSizeForm">
              <FormControl fullWidth required margin="normal">
                  <FormLabel component="legend" className='size_run_label'>Size Run 13</FormLabel>
                  <InputNumber 
                  defaultValue={0} onChange={handleChange("size_run_13")}
                  required={true}
                  min={-size_run_13}
                  name="size_run_13"
                  max={ 999 } 
                  step={ 1 } 
                  precision={ 0 } 
                  size={ 5 } 
                  maxLength={ 4 }
                  style={{ width: 100, height : 40 , color: 'black'}}
                  upHandler={upHandler}
                  downHandler={downHandler}
                  className={filedError.size_run_13 !== "" ? "has-error" : ""}
                  />
                 {filedError.size_run_13 !== ""  && <p className="p-error">{filedError.size_run_13 }</p>}
              </FormControl>
              <div>
                <FormLabel component="legend" className='size_run_label'>Value</FormLabel>
                  <Chip variant="outlined" color="primary" label={s13_state}/>
              </div>
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
             <p style={{color : 'black', fontWeight : 'bold'}}>Size Run Successfully Modified!</p>
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
            disabled={ isError || noChange}
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

export default SizeRunForm
