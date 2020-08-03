import React,{useState, useEffect} from 'react';
import {Row, Col, Card, Form} from 'react-bootstrap';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import { TextArea,Message,Button } from 'semantic-ui-react'
import { useForm,Controller } from 'react-hook-form';
import {NavLink,Redirect} from 'react-router-dom';
import  Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import ReactSelect from "react-select";
import './Stocks.css';
import Alert from '@material-ui/lab/Alert';

function AddStocks(props){ 

    const { register, handleSubmit, reset, errors, control } = useForm();
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState(true)
    const [vertical, setVertical] = useState('top')
    const [horizontal, setHorizontal] = useState('center')

    const [stockArray, setstockArray] = useState([])
    const [class1Array, setClass1Array] = useState([])
    const [class2Array, setClass2Array] = useState([])
    const [colorArray, setColorArray] = useState([])
    const [genderArray, setGenderArray] = useState([])
    const [leatherArray, setLeatherArray] = useState([])
    const [liningArray, setLiningArray] = useState([])
    const [logoArray, setLogoArray] = useState([])
    const [stitchArray, setStitchArray] = useState([])
    const [subLogoArray, setSubLogoArray] = useState([])
    

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/parameter/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
            .then(response => {
                
                console.log('data----------')
                console.log(response.data)

                if(response.data.code === '99'){
                    //setshowTimeout(true)
                    console.log('error')
                }else{
                    inputOptions(response)
                }
                
             
            })
            .catch(err => {
                console.log(err);
            });

    },[]);

    const errorClass = (error) => {
        //console.log(error)
        return(!error ? '' : 'has-error');
      }

    const inputOptions = (response) => {
        setstockArray(response.data.data.stock.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setClass1Array(response.data.data.class1.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setClass2Array(response.data.data.class2.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setColorArray(response.data.data.color.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setGenderArray(response.data.data.gender.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLeatherArray(response.data.data.leather.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLiningArray(response.data.data.lining.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setStitchArray(response.data.data.stitch.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setLogoArray(response.data.data.logo.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))

          setSubLogoArray(response.data.data.sublogo.map((item) => {
            return { "id" : item._id, "label" : item.description,  "value" : item.code  }
          }))


    }


    const defaultValues = {
        "stock_no": "",
        "gender": "",
        "color": "",
        "leather_type": "",
        "classification_1": "",
        "classification_2": "",
        "lining": "",
        "stitch": "",
        "logo": "",
        "sub_logo": "",
        "special_instruction": "",
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      };
    const onSubmit = (data,e) => {

        const parameterObject = {
            stock_no: data.stock_no.id,
            gender: data.gender.id,
            color: data.color.id,
            leather_type: data.leather_type.id,
            classification_1: data.classification_1.id,
            classification_2: data.classification_2.id,
            lining: data.lining.id,
            stitch: data.stitch.id,
            logo: data.logo.id,
            sub_logo: data.sub_logo.id,
            special_instruction: data.special_instruction,
        };

        axios({
            method: 'POST',
            url: 'http://192.168.0.15:5000/api/stocks/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              },
            data: parameterObject
            })
            .then(function (response) {
                //handle success
                console.log(response.status)
                console.log(response.data.code)

                if(response.status === 201 || response.status === 200){
                    if(response.data.code === '00'){
                        console.log(response.data.message)
                        let a = message
                        a = response.data.message
                        setMessage(a)
                        setSuccess(true)
                        console.log(message +'successssss')
                      //  sessionStorage.setItem('jwtTokenKey',  'Bearer ' + response.data.data.token)
                      //  sessionStorage.setItem('login',  true)
                        //genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: response.data.data.token, login : true})
                       // setToDashboard(true)
                       // props.successfulLogin(response.data.data);
                       e.target.reset();
                    }else{
                        setSuccess(false)
                        setMessage(response.data.message)
                    }
                }else{
                    setSuccess(false)
                    setMessage(response.data.message)
                    //genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                    //setToDashboard(false)
                    //setErrorMessage(response.data.message)
                    //props.failedLogin(response);
                }
                
            })
            .catch(function (error) {
                setSuccess(false)
                console.log( Object.assign({}, error).response)
                //console.log('error', Object.assign({}, error).response.data.message);
                //props.failedLogin( Object.assign({}, error).response);
            });
    };

    const handleChange = () => {
        console.log(`Option selected:`);
      };

        return (
            <Aux>
                 <Breadcrumb/>
                <Row>
                    <Col>
                    
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h5">Add Stocks</Card.Title>
                                </Card.Header>
                                <Card.Body>    
                                           
                                            { message.length > 0 ? 
                                                    success ? 
                                                    <Alert variant="filled" severity="success">
                                                        {message}
                                                    </Alert>
                                                :
                                                <Alert variant="filled" severity="error">
                                                    {message}
                                                </Alert>
                                            :
                                                ''   
                                            }

                                <form onSubmit={handleSubmit(onSubmit)} 
                                onReset={event => {
                                    event.preventDefault();
                                    setMessage('');
                                    reset(defaultValues);
                                }} 
                                       
                              className='form-group' autoComplete="off">   
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formGroup1">
                                                        <label className = 'required'>Stock Number</label>
                                                        <Controller
                                                            as={<ReactSelect isClearable />}
                                                            placeholder='Select Stock'
                                                            theme={theme => ({  
                                                                ...theme,
                                                                borderRadius: 0,
                                                                colors: {
                                                                ...theme.colors,
                                                                primary25: '#131a27',
                                                                primary: '#131a27',
                                                                },
                                                            })}
                                                            onChange={handleChange}
                                                            options={stockArray}
                                                            name="stock_no"
                                                            control={control}
                                                            rules={{ required: "This is required" }}
                                                            className={`${errors.stock_no  && errorClass('hasError')}`}
                                                        />
                                                        {errors.stock_no && <div className="ui red pointing basic label">{errors.stock_no.message}</div>}        
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group controlId="formGroup2">
                                                        <label className = 'required'>Gender</label>
                                                        <Controller
                                                            as={<ReactSelect isClearable/>}
                                                            placeholder='Select Gender'
                                                            theme={theme => ({
                                                                ...theme,
                                                                borderRadius: 0,
                                                                colors: {
                                                                ...theme.colors,
                                                                primary25: '#131a27',
                                                                primary: '#131a27',
                                                                },
                                                            })}
                                                            options={genderArray}
                                                            name="gender"
                                                            control={control}
                                                            rules={{ required: "This is required" }}
                                                            className={`${errors.gender  && errorClass('hasError')}`}
                                                        />
                                                        {errors.gender && <div className="ui red pointing basic label">{errors.gender.message}</div>}
                                                    </Form.Group> 
                                                </Col>
                                            </Row>
                                            <Row>       
                                                <Col md={6}>
                                                    <Form.Group controlId="formGroup3">
                                                     <label className = 'required'>Color</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Color'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={colorArray}
                                                        name="color"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.color  && errorClass('hasError')}`}
                                                        />
                                                        {errors.color && <div className="ui red pointing basic label">{errors.color.message}</div>}        
                                                  
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formGroup4">
                                                        <label className = 'required'>Leather Type</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Leather Type'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={leatherArray}
                                                        name="leather_type"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.leather_type  && errorClass('hasError')}`}
                                                        />
                                                        {errors.leather_type && <div className="ui red pointing basic label">{errors.leather_type.message}</div>}
                                                    </Form.Group>
                                                </Col>    
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Group controlId="formGroup5">
                                                        <label className = 'required'>Classification 1</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Classification 1'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27'
                                                            },
                                                        })}
                                                        options={class1Array}
                                                        name="classification_1"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.classification_1  && errorClass('hasError')}`}
                                                        />
                                                        {errors.classification_1 && <div className="ui red pointing basic label">{errors.classification_1.message}</div>}        
                                                    </Form.Group>
                                                </Col> 

                                                <Col md={4}>
                                                    <Form.Group controlId="formGroup6">
                                                        <label className = 'required'>Classification 2</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Classification 2'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={class2Array}
                                                        name="classification_2"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.classification_2  && errorClass('hasError')}`}
                                                        />
                                                        {errors.classification_2 && <div className="ui red pointing basic label">{errors.classification_2.message}</div>}
                                                    </Form.Group>
                                                </Col>   

                                                <Col md={4}>
                                                    <Form.Group controlId="formGroup7">
                                                        <label className = 'required'>Lining</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Lining'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={liningArray}
                                                        name="lining"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.lining  && errorClass('hasError')}`}
                                                        />
                                                        {errors.lining && <div className="ui red pointing basic label">{errors.lining.message}</div>}
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Group controlId="formGroup8">
                                                        <label className = 'required'>Stitch</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Stitch'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                             primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={stitchArray}
                                                        name="stitch"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.stitch  && errorClass('hasError')}`}
                                                        />
                                                        {errors.stitch && <div className="ui red pointing basic label">{errors.stitch.message}</div>}
                                                    </Form.Group>
                                                </Col>

                                                <Col md={4}>
                                                    <Form.Group controlId="formGroup9">
                                                        <label className = 'required'>Logo</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Logo'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={logoArray}
                                                        name="logo"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.logo  && errorClass('hasError')}`}
                                                        />
                                                        {errors.logo && <div className="ui red pointing basic label">{errors.logo.message}</div>}
                                                    </Form.Group>
                                                </Col>

                                                <Col md={4}>
                                                     <Form.Group controlId="formGroup10">
                                                        <label className = 'required'>Sub Logo</label>
                                                        <Controller
                                                        as={<ReactSelect isClearable/>}
                                                        placeholder='Select Sub Logo'
                                                        theme={theme => ({
                                                            ...theme,
                                                            borderRadius: 0,
                                                            colors: {
                                                            ...theme.colors,
                                                            primary25: '#131a27',
                                                            primary: '#131a27',
                                                            },
                                                        })}
                                                        options={subLogoArray}
                                                        name="sub_logo"
                                                        control={control}
                                                        rules={{ required: "This is required" }}
                                                        className={`${errors.sub_logo  && errorClass('hasError')}`}
                                                        />
                                                        {errors.sub_logo && <div className="ui red pointing basic label">{errors.sub_logo.message}</div>}
                                                    </Form.Group>
                                                </Col>
                                            </Row> 
                                    <Row>
                                        <Col md={12}>
                                        
                                            <Form.Group controlId="textareaform" >
                                                <Form.Label>Special Instruction</Form.Label>
                                                <Form.Control as="textarea" rows="3" 
                                                style={{background : 'none'}}
                                                ref={register()}
                                                name="special_instruction"
                                                />
                                            </Form.Group>
                                            
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="button" style={{float : 'right'}}>
                                        <button className="btn btn-primary shadow-2 mb-4" type="reset">Reset</button>
                                        <button className="btn btn-success shadow-2 mb-4" >Submit</button>
                                    </Form.Group>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
}

export default AddStocks;
