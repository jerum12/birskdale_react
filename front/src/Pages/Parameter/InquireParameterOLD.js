import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {Card} from 'react-bootstrap';
import {handleResponse} from '../Stocks/GenericMethod'
import config from '../../config';

function InquireParameter(props) {

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Code", field: "code"},
      {title: 'Description', field: 'description'}
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios({
            method: 'GET',
            url: config.apiParameter+'/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
             handleResponse(response,props)

             if(response.data.code === '00'){
              console.log( response.data.data)
              setData( response.data.data)
              setLoading(true)
             }else{
               alert('2')
              setLoading(false)
             }
            
          })
          .catch(err => {
              console.log(err);
              setLoading(false)
          });
      }, [])

    return (
        <Aux>
            {
              loading ?
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Inquire Parameters</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Stock Number"
                                    columns={columns}
                                    data={data.stock}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Color"
                                    columns={columns}
                                    data={data.color}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Gender"
                                    columns={columns}
                                    data={data.gender}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Leather Type"
                                    columns={columns}
                                    data={data.leather}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Class 1"
                                    columns={columns}
                                    data={data.class1}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Class 2"
                                    columns={columns}
                                    data={data.class2}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Logo"
                                    columns={columns}
                                    data={data.logo}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Sub Logo"
                                    columns={columns}
                                    data={data.sublogo}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Lining"
                                    columns={columns}
                                    data={data.lining}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <MaterialTable
                                    title="Stitch"
                                    columns={columns}
                                    data={data.stitch}
                                    options={{
                                        exportButton: true,
                                        headerStyle: {
                                            backgroundColor: '#203356',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            backgroundColor: '#EEE',
                                        }
                                    }}
                                    
                                    />
                            </Grid>
                        </Grid>
                        

                    </Card.Body>
                  </Card>
                 
                :
                  ''
              }
            

        </Aux>
    )
  }

  export default InquireParameter;
