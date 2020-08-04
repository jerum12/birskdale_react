import React,{useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import {Card} from 'react-bootstrap';

import {SizeRunModal} from './SizeRunModal'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
      fontWeight : 'bold'
    },
    primary : {
        color : '#63a940',
        "& span": {
            fontSize : '12px',
            fontWeight : 'bold'
          },
        "& p": {
        fontSize : '15px',
        color : '#000'
        }
    }
  }));

function StocksHistory(props) {

    const classes = useStyles();

    const [loading, setloading] = useState(false);
    const [details, setdetails] = useState('')
    const [showModal, setshowModal] = useState(false)
    var det = ''

    const handleClose = () => setshowModal(false);

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Transaction Date", field: "transaction_date", type: 'datetime'},
      {title: "Transaction By", field: "transaction_by",
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '3', field: 'size_run_3', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '4', field: 'size_run_4', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '5', field: 'size_run_5', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '6', field: 'size_run_6', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '7', field: 'size_run_7', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },  
      },
      { title: '8', field: 'size_run_8', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '9', field: 'size_run_9', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '10', field: 'size_run_10', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '11', field: 'size_run_11', type: 'numeric',  
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '12', field: 'size_run_12', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '13', field: 'size_run_13', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '14', field: 'size_run_14', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: 'Total', field: 'total', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      }
    ]);
  
    const [data, setData] = useState([]); //table data


    useEffect(() => {

        console.log(props.location)

        if(props.location.state !== undefined){
            det = props.location.state.details;
          }
          
          props.history.replace({
              pathname: props.location.pathname,
              state: {}
          });
          
        if (det === '' || det === undefined ){
            props.history.push("/stocks/inquire")
        }else{
            axios({
                method: 'GET',
                url: 'http://localhost:5000/api/stocks/history/data/' + det._id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : sessionStorage.getItem('jwtTokenKey')
                  }
                })
              .then(response => {
                  //let json = response.data.data;
                  //console.log(json)
                  setdetails(det)
                  setData(response.data.data)
                  setloading(true)
              })
              .catch(err => {
                  console.log(err);
                  return null;
              });
        }

      }, [])

    return (
        <Aux>
            {
                loading ?
                <Fragment>
                
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Stocks Details & History</Card.Title>

                                <div
                                    style={{ display: "flex",justifyContent: "flex-end" }}
                                >
                                <button className="btn btn-primary shadow-2 mb-4"
                                        onClick={()=>{
                                    props.history.goBack()
                                }}>Back</button>

                                <button className="btn btn-primary shadow-2 mb-4"
                                        onClick={()=>setshowModal(true)}>Increase / Decrease</button>
                            </div>
                             
                        </Card.Header>
                        <Card.Body>   
                                <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                    &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Stock Number"
                                            secondary={details.stock_no.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Gender"
                                            secondary={details.gender.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Color"
                                            secondary={details.color.description}
                                        />
                                        </ListItem>
                                    </List>
                                </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Leather Type"
                                            secondary={details.leather_type.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Classification 1"
                                            secondary={details.classification_1.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Classification 2"
                                            secondary={details.classification_2.description}
                                        />
                                        </ListItem>
                                
                                    </List>
                                </div>
                                </Grid>
                        
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Logo"
                                            secondary={details.logo.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Sub Logo"
                                            secondary={details.sub_logo.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Lining"
                                            secondary={details.lining.description}
                                        />
                                        </ListItem>
                                
                                    </List>
                                </div>
                                </Grid>
                        
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Stitch"
                                            secondary={details.stitch.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Special Instruction"
                                            //secondary={details.special_instruction.length > 0 ? details.special_instruction : "Not Provided"}
                                            secondary={details.special_instruction}
                                        />
                                        </ListItem>
                        
                                
                                    </List>
                                </div>
                                </Grid>
                        
                            </Grid>
                        
                    

                        <MaterialTable
                                title="History"
                                //style={{padding : '20px'}}
                                columns={columns}
                                data={data}
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
                                // actions={[
                                //     {
                                //     icon: 'exposure',
                                //     tooltip: 'Increase / Decrease',
                                //     isFreeAction: true,
                                //     //   iconProps : {
                                //     //     color : 'primary',
                                //     //     fontSize : 'large'
                                //     //   },
                                //     onClick: (event) => {
                                //         setshowModal(true)
                                //     }
                                //     }
                                // ]}
                                //   detailPanel={rowData => {
                                //     return (
                                //       <iframe
                                //         width="100%"
                                //         height="315"
                                //         src="https://www.youtube.com/embed/C0DPdy98e4c"
                                //         frameborder="0"
                                //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                //         allowfullscreen
                                //       />
                                //     )
                                //   }}
                                //   onRowClick={(event, rowData, togglePanel) => togglePanel()}

                            />
                        </Card.Body>
                    </Card>

                    <SizeRunModal
                        showModal={showModal} 
                        handleClose={handleClose}
                        props={props}
                        data={details}
                    />
                </Fragment>
                :
                        ''
            }
                        

        </Aux>
    )
  }

  export default StocksHistory;
