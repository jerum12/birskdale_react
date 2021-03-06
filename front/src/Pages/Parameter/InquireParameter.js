import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {Card} from 'react-bootstrap';
import {handleResponse} from '../Stocks/GenericMethod'

import ScaleLoader from "react-spinners/ScaleLoader";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import config from "../../config";



function InquireParameter(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.secondary,
        },
      }));

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Code", field: "code"},
      {title: 'Description', field: 'description'}
      
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false)
    
    const classes = useStyles();

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
              //console.log( response.data.data)
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
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Stock Number Parameter </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className={classes.root}>
                                                <MaterialTable
                                                title=""
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
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Lining Parameter</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                       <div className={classes.root}>
                                            <MaterialTable
                                                title=""
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
                                                data={data.sock_liner}
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
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>


                           

                       
                         
                        </Grid>
                        

                    </Card.Body>
                  </Card>
                 
                :
                  
                  <div style={{textAlign: 'center'}}>
                        <div className="spinner">LOADING...</div>
                    <ScaleLoader color="rgb(34, 144, 119)" loading={true} size={20} height={30} />
                 </div>
              }
            

        </Aux>
    )
  }

  export default InquireParameter;
