import React,{useState, useEffect, Fragment} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {Card} from 'react-bootstrap';
import {handleResponse} from '../Stocks/GenericMethod'

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import SweetAlert from 'react-bootstrap-sweetalert';
import QueueIcon from '@material-ui/icons/Queue';
import config from "../../config";

function UpdateParameter(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        }
      }));

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Code", field: "code", 
        validate: rowData => 
            rowData.code === '' || rowData.code === undefined || rowData.code === null 
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
      {title: 'Description', field: 'description',
        validate: rowData => 
                rowData.description === '' || rowData.description === undefined || rowData.description === null 
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
    const [loading, setLoading] = useState(false)
    const [reloadTable, setReloadTable] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertFailed, setAlertFailed] = useState(false)
    const [message, setMessage] = useState('')

    const classes = useStyles();
    
    const hideAlert = () => {
        setAlertSuccess(false)
        setAlertFailed(false);
        //setReloadTable(true);
    }

    const onSuccess = () => {
        setAlertSuccess(false);
        setAlertFailed(false);      
        //props.history.push('/stocks/add')
        //window.location.reload(false);
        //setReloadTable(true);
    }

    const handleAdd = async (type,newData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    
                ////console.log('here-----promise')
                if (newData.code === "" || newData.description === "") {
                    ////console.log('here-----reject')
                    reject();
                    return;
                  }

                  let parameterObject = '';
                  if(type === 'color'){
                    parameterObject = {
                        code: newData.code.replace(/\s/g,''),
                        description: newData.description.replace(/\s/g,''),
                        type : type,
                        transaction_date : new Date()
                    };
                  }else{
                    parameterObject = {
                        code: newData.code,
                        description: newData.description,
                        type : type,
                        transaction_date : new Date()
                    };
                  }
                 
                
                    axios({
                        method: 'POST',
                        url: config.apiParameter+'data/',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization' : sessionStorage.getItem('jwtTokenKey')
                          },
                        data: parameterObject
                    }).then(function (response) {
                            ////console.log(response)
                        if(response.status === 201 || response.status === 200){
                            if(response.data.code === '00'){
                                setMessage(response.data.message)
                                setAlertSuccess(true)   
                                //setReloadTable(true)    
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

    const handleUpdate = async (type,newData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    
                ////console.log('here-----promise')
                if (newData.code === "" || newData.description === "") {
                    ////console.log('here-----reject')
                    reject();
                    return;
                  }

                  let parameterObject = '';
                  if(type === 'color'){
                    parameterObject = {
                        _id : newData._id,
                        code: newData.code.replace(/\s/g,''),
                        description: newData.description.replace(/\s/g,''),
                        type : type
                    };
                  }else{
                    parameterObject = {
                        _id : newData._id,
                        code: newData.code,
                        description: newData.description,
                        type : type
                    };
                 }
                
                    axios({
                        method: 'PUT',
                        url: config.apiParameter+'data/'+ parameterObject._id,
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization' : sessionStorage.getItem('jwtTokenKey')
                          },
                        data: parameterObject
                    }).then(function (response) {
                            ////console.log(response)
                        if(response.status === 201 || response.status === 200){
                            if(response.data.code === '00'){
                                setMessage(response.data.message)
                                setAlertSuccess(true)   
                                //setReloadTable(true)    
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
            url: config.apiParameter+'data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
             handleResponse(response,props)
            
             if(response.data.code === '00'){
              //////console.log( response.data.data)
              setData( response.data.data)
              setLoading(true)
             }else{
               //alert('2')
              setLoading(false)
             }
            
          })
          .catch(err => {
              ////console.log(err);
              setLoading(false)
          });
          setReloadTable(false)
      }, [])

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
                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Stock Number Parameter </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.root}>
                                                <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.stock}
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
                                                    onRowAdd: newData =>
                                                        handleAdd('stock number',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('stock number',newData),                                                
                                                }}
                                                
                                                />
                                            </div>
                                        </AccordionDetails>
                                </Accordion>    
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Color Parameter </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.root}>
                                                <MaterialTable
                                                    title=""
                                                    columns={columns}
                                                    icons={{Add: () => <QueueIcon/>}}
                                                    data={data.color}
                                                    options={{
                                                        actionsColumnIndex: -1,
                                                        exportButton: true,
                                                        headerStyle: {
                                                            backgroundColor: '#203356',
                                                            color: '#FFF'
                                                        },
                                                        rowStyle: {
                                                            backgroundColor: '#EEE',
                                                        }
                                                    }}
                                                    editable={{
                                                        onRowAdd: newData =>
                                                            handleAdd('color',newData),
                                                          onRowUpdate: (newData, oldData) =>
                                                            handleUpdate('color',newData),                                                
                                                    }}
                                                    
                                                    />
                                            </div>
                                        </AccordionDetails>
                                </Accordion>    
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Gender Parameter </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                           <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.gender}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('gender',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('gender',newData),                                                
                                                }}
                                                
                                                />
                                            </div>
                                        </AccordionDetails>
                                </Accordion>             
                                
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Leather Type Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.leather}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('leather type',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('leather type',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Classification 1 Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.class1}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('classification 1',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('classification 1',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Classification 2 Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.class2}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('classification 2',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('classification 2',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Logo Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.logo}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('logo',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('logo',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Sub Logo Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.sublogo}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('sub logo',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('sub logo',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            {/* <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Lining Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                icons={{Add: () => <QueueIcon/>}}
                                                data={data.lining}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('lining',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('lining',newData),                                                
                                                }}
                                                
                                                />

                                         </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Stitch Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.stitch}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('stitch',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('stitch',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>



                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Lining Mesh Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.mesh}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('lining mesh',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('lining mesh',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Sockliner Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.sockliner}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('sock liner',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('sock liner',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>



                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Canvass Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.canvass}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('canvass',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('canvass',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Midsole Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.midsole}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('midsole',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('midsole',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Outsole Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.outsole}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('outsole',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('outsole',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid> 


                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Cambrelle Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data.cambrelle}
                                                icons={{Add: () => <QueueIcon/>}}
                                                options={{
                                                    actionsColumnIndex: -1,
                                                    exportButton: true,
                                                    headerStyle: {
                                                        backgroundColor: '#203356',
                                                        color: '#FFF'
                                                    },
                                                    rowStyle: {
                                                        backgroundColor: '#EEE',
                                                    }
                                                }}
                                                editable={{
                                                    onRowAdd: newData =>
                                                        handleAdd('cambrelle',newData),
                                                      onRowUpdate: (newData, oldData) =>
                                                        handleUpdate('cambrelle',newData),                                                
                                                }}
                                                
                                                />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid> */}
                         
                        </Grid>
                        

                    </Card.Body>
                  </Card>
                 

                    { alertSuccess
                        ?
                        <SweetAlert
                        success
                        // confirmBtnText = "Okay"
                        title=''
                        confirmBtnBsStyle= "success"
                        onConfirm={onSuccess}
                        //timeout={800}
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
                        //timeout={2000}
                        >
                        <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>{message}</p>
                        </SweetAlert>
                        
                        : ''
                    }
                </Fragment>
                :
                  'LOADING'
              }
            

        </Aux>
    )
  }

  export default UpdateParameter;
