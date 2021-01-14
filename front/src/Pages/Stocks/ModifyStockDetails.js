import React,{useState, useEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
//import { useForm,Controller } from 'react-hook-form';
import './Stocks.css';
import StepFormModify from './StepFormModify'
import config from '../../config';
import ScaleLoader from "react-spinners/ScaleLoader";

function ModifyStockDetails(props){ 

    //const { register, handleSubmit, reset, errors, control } = useForm();
    //const [message, setMessage] = useState('')
    // const [success, setSuccess] = useState(true)
    // const [vertical, setVertical] = useState('top')
    // const [horizontal, setHorizontal] = useState('center')

    // const [stockArray, setstockArray] = useState([])
    // const [class1Array, setClass1Array] = useState([])
    // const [class2Array, setClass2Array] = useState([])
    // const [colorArray, setColorArray] = useState([])
    // const [genderArray, setGenderArray] = useState([])
    // const [leatherArray, setLeatherArray] = useState([])
    // const [liningArray, setLiningArray] = useState([])
    // const [logoArray, setLogoArray] = useState([])
    // const [stitchArray, setStitchArray] = useState([])
    // const [subLogoArray, setSubLogoArray] = useState([])

    const [paramArray, setParamArray] = useState([])
    const [loading, setloading] = useState(false)
    const [details, setdetails] = useState('')
    var message = ''
    
    useEffect(() => {
        

        if(props.location.state !== undefined){
          message = props.location.state.details;
        }
        
        props.history.replace({
            pathname: props.location.pathname,
            state: {}
        });
   
        if (message === '' || message === undefined ){
            props.history.push("/stocks/modify")
        }else{
            
            axios({
                method: 'GET',
                url: config.apiParameter+'data',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : sessionStorage.getItem('jwtTokenKey')
                  }
                })
                .then(response => {
                    
                    ////console.log('data----------')
                    ////console.log(response.data)
    
                    if(response.data.code === '99'){
                        //setshowTimeout(true)
                        //console.log('error')
                   
                    }else{
                        setParamArray(response.data.data)
                        setdetails(message)
                        setloading(true)
                    }
                })
                .catch(err => {
                    //console.log(err);
                });
        }
        ////console.log(details)
    },[]);

        return (
            <Aux>
                {
                    loading ?
                    <Row>
                        <Col>
                        
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h5">Modify Stock Details</Card.Title>
                                    </Card.Header>
                                    <Card.Body>    
                                            <StepFormModify param={paramArray} props={props} details={details}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <div style={{textAlign: 'center'}}>
                        <div className="spinner">LOADING...</div>
                        <ScaleLoader color="rgb(34, 144, 119)" loading={true} size={20} height={30} />
                    </div>
                }
                
            </Aux>
        );
}

export default ModifyStockDetails;
