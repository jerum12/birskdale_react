import React,{useState, useEffect, Fragment} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {Card} from 'react-bootstrap';
import {handleResponse} from '../Stocks/GenericMethod'

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import SweetAlert from 'react-bootstrap-sweetalert';
import QueueIcon from '@material-ui/icons/Queue';
import {AddUserModal} from './AddUserModal';
import config from "../../config";

function UpdateUsers(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        }
      }));

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Date Created", field: "date_created", type: 'datetime', editable : 'never'},
      {title: "Full Name", field: "full_name", 
        validate: rowData => 
            rowData.full_name === '' || rowData.full_name === undefined || rowData.full_name === null 
            ? 
                { isValid: false, helperText: 'Mandatory' } 
            : 
                true
            ,
            editComponent: (props) => (   
                <Fragment>
                    <TextField
                        multiline
                        error={
                            !props.value 
                            ? true
                            : false
                        }
                        helperText={
                            !props.value
                            ? "Mandatory"
                            : ""
                        }
                        required
                        value={props.value ? props.value : ""}
                        onChange={e => {
                            props.onChange(e.target.value);
                         }}
                    />

                </Fragment>
              )
      },
      {title: 'User Name', field: 'user_name',
        validate: rowData => 
                rowData.user_name === '' || rowData.user_name === undefined || rowData.user_name === null 
                ? 
                { isValid: false, helperText: 'Mandatory' } 
                : 
                true
                ,
                editComponent: (props) => (   
                    <Fragment>
                        <TextField
                            multiline
                            error={
                                !props.value 
                                ? true
                                : false
                            }
                            helperText={
                                !props.value
                                ? "Mandatory"
                                : ""
                            }
                            required
                            value={props.value ? props.value : ""}
                            onChange={e => {

                                props.onChange(e.target.value);
                             }}
                        />
    
                    </Fragment>
                  )
      }
      
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertFailed, setAlertFailed] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false)

    const classes = useStyles();
    
    const handleClose = () => {
        setShowModal(false)
        setReloadTable(true)
    };

    const hideAlert = () => {
        setAlertSuccess(false)
        setAlertFailed(false);
    }

    const handleAdd = async (type,newData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    
                //console.log('here-----promise')
                if (newData.code === "" || newData.description === "") {
                    //console.log('here-----reject')
                    reject();
                    return;
                  }

                  const parameterObject = {
                        code: newData.code,
                        description: newData.description,
                        type : type,
                        transaction_date : new Date()
                    };
                
                    axios({
                        method: 'POST',
                        url: config.apiParameter+'data/',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization' : sessionStorage.getItem('jwtTokenKey')
                          },
                        data: parameterObject
                    }).then(function (response) {
                            //console.log(response)
                        if(response.status === 201 || response.status === 200){
                            if(response.data.code === '00'){
                                setMessage(response.data.message)
                                setAlertSuccess(true)   
                                setReloadTable(true)    
                                resolve();
                            }else{
                                setMessage(response.data.message)
                                setAlertFailed(true);
                                reject();
                                return;
                            }
                        }else{
                            setAlertFailed(true);
                            setMessage(response.data.message)
                            reject();
                            return;
                        }
                        
                    })
                    .catch(function (error) {
                        setAlertFailed(true);
                        setMessage(Object.assign({}, error).response)
                        reject();
                        return;
                    });
            }, 1000)
          })
    }

    const handleUpdate = async (newData,oldData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    
                let hasChanges = false;

                if(newData.full_name === oldData.full_name && newData.user_name === oldData.user_name){
                    setMessage("No changes made!")
                    setAlertFailed(true);
                    reject();
                    return
                }
                if (newData.full_name === "" || newData.user_name === "") {
                    //console.log('here-----reject')
                    reject();
                    return;
                }

                if(newData.user_name !== oldData.user_name ){
                    hasChanges = true
                }

                  const parameterObject = {
                        _id : newData._id,
                        full_name: newData.full_name,
                        user_name: newData.user_name,
                        hasChanges: hasChanges
                    };
                
                    console.log(parameterObject)
                    axios({
                        method: 'PUT',
                        url: config.apiUsers+'data/'+ parameterObject._id,
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization' : sessionStorage.getItem('jwtTokenKey')
                          },
                        data: parameterObject
                    }).then(function (response) {
                            //console.log(response)
                        if(response.status === 201 || response.status === 200){
                            if(response.data.code === '00'){
                                setMessage(response.data.message)
                                setAlertSuccess(true)   
                                setReloadTable(true)    
                                resolve();
                            }else{
                                setMessage(response.data.message)
                                setAlertFailed(true);
                                reject();
                                return;
                            }
                        }else{
                            setAlertFailed(true);
                            setMessage(response.data.message)
                            reject();
                            return;
                        }
                        
                    })
                    .catch(function (error) {
                        setAlertFailed(true);
                        setMessage(Object.assign({}, error).response)
                        reject();
                        return;
                    });
            }, 1000)
          })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: config.apiUsers+'data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
             handleResponse(response,props)

             if(response.data.code === '00'){
              ////console.log( response.data.data)
              setData( response.data.data)
              setLoading(true)
             }else{
               alert('2')
              setLoading(false)
             }
            
          })
          .catch(err => {
              //console.log(err);
              setLoading(false)
          });
          setReloadTable(false)
      }, [reloadTable])

    return (
        <Aux>
            {
              loading ?
                <Fragment>
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Update Parameters</Card.Title>
                    </Card.Header>
                    <Card.Body>
 
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                    <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    // onRowAdd: newData =>
                                                    //     handleAdd('stock number',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate(newData,oldData),                                                
                                                }}
                                                actions={[ 
                                                    {
                                                      icon: () => <QueueIcon/>,
                                                      tooltip: 'Add Users',
                                                      isFreeAction: true,
                                                      onClick: () => { 
                                                        setShowModal(true)
                                                      }
                                                    }        
                                          
                                                  ]}
                                                
                                                />
                            </Grid>
                         
                        </Grid>
                        

                    </Card.Body>
                  </Card>
                 

                    { alertSuccess
                        ?
                        <SweetAlert
                        success
                        confirmBtnText = "Okay"
                        title=''
                        confirmBtnBsStyle= "success"
                        onCancel ={hideAlert}
                        onConfirm ={hideAlert}
                        timeout={2000}
                        >
                        <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>{message}</p>
                        </SweetAlert>
                        
                        : ''
                    }
            
                    { alertFailed
                        ?
                        <SweetAlert
                        danger
                        title=''
                        confirmBtnText = "Okay"
                        confirmBtnBsStyle= "danger"
                        onCancel ={hideAlert}
                        onConfirm ={hideAlert}
                        timeout={2000}
                        >
                        <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>{message}</p>
                        </SweetAlert>
                        
                        : ''
                    }

                    <AddUserModal
                        showModal={showModal} 
                        handleClose={handleClose}
                        props={props}
                    />
                </Fragment>
                :
                  ''
              }
            

        </Aux>
    )
  }

  export default UpdateUsers;
