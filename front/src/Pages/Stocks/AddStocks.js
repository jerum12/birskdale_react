import React,{useState, useEffect} from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import  Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import './Stocks.css';
import StepFormAdd from './StepFormAdd'
import config from '../../config';
import ScaleLoader from "react-spinners/ScaleLoader";

function AddStocks(props){ 

    const [paramArray, setParamArray] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
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
                                            
                                        <div style={{textAlign: 'center'}}>
                                                                <div className="spinner">LOADING...</div>
                                                            <ScaleLoader color="rgb(34, 144, 119)" loading={true} size={20} height={30} />
                                                        </div>
                                    }
                                 
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
}

export default AddStocks;
