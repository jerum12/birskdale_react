import React, { Fragment, useState } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import config from '../../config';
import axios from 'axios';

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
      color : '#000',
      "& span": {
          fontSize : '11px',
          fontWeight : 'bold'
        },
      "& p": {
      fontSize : '18px',
      color : 'rgb(32, 51, 86)'
      }
  }
  }));

  
// Destructure props
const ConfirmAdd = ({
  props,
  handleBack,
  values: { stock_no,
    gender,
    color,
    leather_type,
    classification_1,
    classification_2,
    logo,
    sub_logo,
    lining,
    stitch,
    canvass,
    midsole,
    outsole,
    sock_liner,
    special_instruction,
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
    size_run_14 }
}) => {

const classes = useStyles();
const [alertSuccess, setAlertSuccess] = useState(false)
const [alertFailed, setAlertFailed] = useState(false)
const [message, setMessage] = useState('')

const handleSubmit = () => {

    const parameterObject = {
        stock_no: stock_no._id,
        gender: gender._id,
        color: color._id,
        leather_type: leather_type._id,
        classification_1: classification_1._id,
        classification_2: classification_2._id,
        lining: lining._id,
        stitch: stitch._id,
        canvass: canvass._id,
        midsole: midsole._id,
        outsole: outsole._id,
        sock_liner: sock_liner._id,
        logo: logo._id,
        sub_logo: sub_logo._id,
        special_instruction: special_instruction,
        size_run_2 : size_run_2,
        size_run_2_5 : size_run_2_5,
        size_run_3 : size_run_3,
        size_run_3_5 : size_run_3_5,
        size_run_4 : size_run_4,
        size_run_4_5 : size_run_4_5,
        size_run_5 : size_run_5,
        size_run_5_5 : size_run_5_5,
        size_run_6 : size_run_6,
        size_run_6_5 : size_run_6_5,
        size_run_7 : size_run_7,
        size_run_7_5 : size_run_7_5,
        size_run_8 : size_run_8,
        size_run_8_5 : size_run_8_5,
        size_run_9 : size_run_9,
        size_run_9_5 : size_run_9_5,
        size_run_10 : size_run_10,
        size_run_10_5 : size_run_10_5,
        size_run_11 : size_run_11,
        size_run_11_5 : size_run_11_5,
        size_run_12 : size_run_12,
        size_run_13 : size_run_13,
        size_run_14 : size_run_14,
    };

    //console.log(parameterObject);

    axios({
        method: 'POST',
        url: config.apiStocks+'data',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : sessionStorage.getItem('jwtTokenKey')
          },
        data: parameterObject
        })
        .then(function (response) {

            if(response.status === 201 || response.status === 200){
                if(response.data.code === '00'){
                    setAlertSuccess(true)   
                }else{
                    setMessage(response.data.message)
                    setAlertFailed(true);
                }
            }else{
                setAlertFailed(true);
                setMessage(response.data.message)
            }
            
        })
        .catch(function (error) {
            setAlertFailed(true);
            //console.log( Object.assign({}, error).response)
            setMessage(Object.assign({}, error).response)
        });
      
}

const onSuccess = () => {
    setAlertSuccess(false);
    setAlertFailed(false);      
    //props.history.push('/stocks/add')
    window.location.reload(false);
}

const hideAlert = () => {
    setAlertSuccess(false)
    setAlertFailed(false);
}

  return (
    <Fragment>

    {/* { message.length > 0 
       ? 
        <Alert variant="filled" severity="error">
            {message}
        </Alert>
      :
        ''   
    } */}
    <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={classes.title}>
            Stock Details
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Stock Number"
                    secondary={stock_no.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Gender"
                    secondary={gender.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Color"
                    secondary={color.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Leather Type"
                    secondary={leather_type.description}
                  />
                </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>

                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Classification 1"
                    secondary={classification_1.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Classification 2"
                    secondary={classification_2.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Logo"
                    secondary={logo.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Sub Logo"
                    secondary={sub_logo.description}
                  />
                </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Lining"
                    secondary={lining.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Stitch"
                    secondary={stitch.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Canvass"
                    secondary={canvass.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Midsole"
                    secondary={midsole.description}
                  />
                </ListItem>
               
            </List>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Outsole"
                    secondary={outsole.description}
                  />
                </ListItem>
              <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Sockliner"
                    secondary={sock_liner.description}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText className={classes.primary}
                    primary="Special Instruction"
                    secondary={special_instruction.length > 0 ? special_instruction : "Not Provided"}
                  />
                </ListItem>
 
           
            </List>
          </div>
        </Grid>
    </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
            Size Run
          </Typography>
          
          <Divider/>

          <div className={classes.demo}>
            <List>
              <ListItem>
              <ListItemText className={classes.primary}
                  primary="Size Run 2"
                  secondary={size_run_2}
              />
              </ListItem>
              <ListItem>
              <ListItemText className={classes.primary}
                  primary="Size Run 5"
                  secondary={size_run_5_5}
              />
              </ListItem>
              <ListItem>
              <ListItemText className={classes.primary}
                  primary="Size Run 8"
                  secondary={size_run_8}
              />
              </ListItem>
              <ListItem>
              <ListItemText className={classes.primary}
                  primary="Size Run 11"
                  secondary={size_run_11}
              />
              </ListItem>
            
          </List>
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
              &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 2.5"
                    secondary={size_run_2_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 5.5"
                    secondary={size_run_5_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 8.5"
                    secondary={size_run_8_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 11.5"
                    secondary={size_run_11_5}
                />
                </ListItem>
            </List>
          </div>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
              &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 3"
                    secondary={size_run_3}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 6"
                    secondary={size_run_6}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 9"
                    secondary={size_run_9}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 12"
                    secondary={size_run_12}
                />
                </ListItem>
            </List>
          </div>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                    <ListItemText className={classes.primary}
                    primary="Size Run 3.5"
                    secondary={size_run_3_5}
                    />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 6.5"
                    secondary={size_run_6_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 9.5"
                    secondary={size_run_9_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 13"
                    secondary={size_run_13}
                />
                </ListItem>
            </List>
          </div>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 4"
                    secondary={size_run_4}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 7"
                    secondary={size_run_7}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 10"
                    secondary={size_run_10}
                />
                </ListItem>
            </List>
          </div>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" className={classes.title}>
                &nbsp;
          </Typography>
          <Divider/>
          <div className={classes.demo}>
            <List>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 4.5"
                    secondary={size_run_4_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 7.5"
                    secondary={size_run_7_5}
                />
                </ListItem>
                <ListItem>
                <ListItemText className={classes.primary}
                    primary="Size Run 10.5"
                    secondary={size_run_10_5}
                />
                </ListItem>
            </List>
          </div>
        </Grid>

      </Grid>
  

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
     

        { alertSuccess
            ?
            <SweetAlert
            success
            confirmBtnText = "Okay"
            title=''
            confirmBtnBsStyle= "success"
            onConfirm={onSuccess}
            >
             <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>Stocks Successfully Added!</p>
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
            >
             <p style={{color : 'black', fontSize : '20px', fontWeight : 'bold'}}>{message}</p>
            </SweetAlert>
            
        : ''
        }
       
        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleBack}
        >
            <ArrowBackOutlinedIcon/>
        </button>

        <button className="btn btn-primary shadow-2 mb-4"
            onClick={handleSubmit}
            style={{ marginLeft: 20 }}
        >
            Confirm & Continue
        </button>

        {/* <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={handleNext}
        >
          Confirm & Continue
        </Button> */}
      </div>
    </Fragment>
  )
}

export default ConfirmAdd
