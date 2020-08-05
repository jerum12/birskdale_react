import React,{useState, useEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import  Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import './Stocks.css';
import StepFormAdd from './StepFormAdd'

function AddStocks(props){ 

    const [paramArray, setParamArray] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://192.168.0.27:5000/api/parameter/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
            .then(response => {
                
                //console.log('data----------')
                //console.log(response.data)

                if(response.data.code === '99'){
                    //setshowTimeout(true)
                    console.log('error')
               
                }else{
                    setParamArray(response.data.data)
                    setloading(true)
                }
            })
            .catch(err => {
                console.log(err);
            });

    },[]);



   

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
                                    {
                                        loading ?
                                        <StepFormAdd param={paramArray} props={props}/>
                                        :
                                            ''
                                    }
                                 
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
}

export default AddStocks;
