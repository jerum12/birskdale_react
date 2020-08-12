import React, {useState, useEffect, forwardRef} from 'react';
import {Redirect} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './../assets/scss/style.scss'
import Aux from '../hoc/_Aux'
import axios from 'axios';
import { Label,Message } from 'semantic-ui-react'
import {connect} from 'react-redux';
import * as actionTypes from "../store/actions";
import config from '../config';
import './Stocks/Stocks.css'


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {Popup } from 'semantic-ui-react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Moment from 'moment'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import InquireStocksNoAuth from './Stocks/InquireStocksNoAuth'
import ReportStocks from './Reports/ReportStocks'
import ReportStocksPDF from './Reports/ReportStocksPDF'
import ReportItem from './Reports/ReportItem'
import ReportItemPDF from './Reports/ReportItemPDF'
import ReportStocks2 from './Reports/ReportStocks2'
import ReportStocks2PDF from './Reports/ReportStocks2PDF'



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
        width: '100%'
    },

  }));

function Login(props){

    const classes = useStyles();
    const { handleSubmit, register,  reset, errors } = useForm();
    const [userNameValid, setUserNameValid] = useState(false);
    const [toDashboard,setToDashboard] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [value, setValue] = useState(0);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };

      

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Transaction Date", field: "transaction_date", 
        render: (rowData) => {
          return Moment(rowData.transaction_date).format('MM-DD-YYYY HH:mm:ss')
        }},
      { title: 'Stock Number', field: 'stock_no.description'},
      { title: 'Stock Details', field: 'stock_details',
        render: (rowData) => {
            return  <Popup
                        trigger={<p style={{cursor: 'pointer', color:'blue'}}>Stock Details...</p>}
                        content= {rowData.stock_details}
                        inverted
                    />
            }, 
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
      { title: 'Total Size Run', field: 'total_size_run', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      }
    ]);
  
    //const [data, setData] = useState([]); //table data
    //const [loading, setLoading] = useState(false)
    //const [reloadTable,setReloadTable]= useState(false)
    const [selectData, setSelectData] = useState('')
    
    
    useEffect(() => {
     sessionStorage.clear();
    }, []);


    // useEffect(() => {
    //     let id = setInterval(() => {
    //         //console.log(props.hasStocksUpdate)
    //     }, 1000);
    //     return () => clearInterval(id);
    //   }, []);
    
    // useEffect(() => {
    //     //console.log("test111111111111111111111111")
    //     axios({
    //         method: 'GET',
    //         url: config.apiStocks+'dataall',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(response => {
    //             if(response.data.code === '00'){
    //                 setData( response.data.data)
    //                 setLoading(true)
    //             }else{
    //                 setLoading(false)
    //             }
            
    //         })
    //         .catch(err => {
    //             //console.log(err);
    //             setLoading(false)
    //         });
    //         setReloadTable(false)
    // }, [reloadTable])
 
    const handleChange = (event, newValue) => {
        setSelectData('Stocks')
        setValue(newValue);
    }
    

      
    const onSubmit = data => {

        const userObject = {
            user_name: data.user_name,
            password: data.password
        };

        axios({
            method: 'POST',
            url: config.apiUsers+'login',
            headers: {
                'Content-Type': 'application/json'
              },
            data: userObject
            })
            .then(function (response) {
                //handle success
                //console.log(response)
                if(response.status === 201 || response.status === 200){
                    if(response.data.code === '00'){
                        sessionStorage.setItem('jwtTokenKey',  'Bearer ' + response.data.data.token)
                        sessionStorage.setItem('login',  true)
                        //genContext.dispatchName({type: 'LOGIN_SUCCESS', payload: response.data.data.token, login : true})
                        setToDashboard(true)
                        props.successfulLogin(response.data.data);
                    }else{
                        setToDashboard(false)
                        setErrorMessage(response.data.message)
                        props.failedLogin(response);
                    }
                }else{
                    //genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                    setToDashboard(false)
                    setErrorMessage(response.data.message)
                    props.failedLogin(response);
                }
                
            })
            .catch(function (error) {
                //handle error
                //genContext.dispatchName({type: 'LOGIN_FAILED', payload: '', login : false})
                setToDashboard(false)
                //console.log( Object.assign({}, error).response)
                ////console.log('error', Object.assign({}, error).response.data.message);
                props.failedLogin( Object.assign({}, error).response);
            });
    };

    const handleChangeStocks = (event) => setSelectData(event.target.value)
      

    const errorClass = (error) => {
        return(!error ? '' : 'has-error');
      }
    
    let renderComponent;
    if(selectData === 'Report_Stock_Details'){
        renderComponent = <ReportStocks2/>
    }else if(selectData === 'Report_Stock_Details_PDF'){
        renderComponent = <ReportStocks2PDF/>
    }else if(selectData === 'Report_Item'){
        renderComponent = <ReportItem/>
    }else if(selectData === 'Report_Item_PDF'){
        renderComponent = <ReportItemPDF/>
    }else{
        renderComponent = <InquireStocksNoAuth/>
    }
    
    if (toDashboard) 
       // props.history.push('/about')
        return <Redirect to='/stocks/inquire' />
    else{

        return(
            <Aux>
                {/* {  loading 
                    ?   */}
                    
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r"/>
                                <span className="r s"/>
                                <span className="r s"/>
                                <span className="r"/>
                            </div>
                            <div className="card">
                                

                                    <div className={classes.root}>
                                        <AppBar position="static" color="default">
                                            <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                variant="fullWidth"
                                                scrollButtons="on"
                                                indicatorColor="primary"
                                                textColor="primary"
                                                aria-label="scrollable force tabs example"
                                            >
                                                 <Tab label="Login"  style={{minWidth : '50%'}} icon={<LockOpenIcon />} {...a11yProps(0)} />
                                                 <Tab label="Stocks" style={{minWidth : '50%'}} icon={<TrendingUpIcon />} {...a11yProps(1)} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={value} index={0}>
                                            <div className="card-body text-center"
                                            style ={{
                                                boxShadow: '0 1px 20px 0 rgba(69, 90, 100, 0.08)',
                                                border: 'none',
                                                marginBottom: '30px',
                                                transition: 'all 0.5s ease-in-out',
                                                width: '60%',
                                                margin : '0px auto'
                                            }}
                                            >
                                                <div className="mb-4">
                                                    <i className="feather icon-unlock auth-icon"/>
                                                </div>
                                                <form onSubmit={handleSubmit(onSubmit)} className='form-group' autoComplete="off">
                                                    <h3 className="mb-4">BIRKSDALE</h3>

                                                    { errorMessage.length > 0 ? 
                                                        <Message negative>
                                                            <Message.Header>{errorMessage}</Message.Header>
                                                        </Message>
                                                    :
                                                        ''   
                                                    }

                                                    {errors.user_name && 
                                                        <Label basic color='red' pointing="below" style={{float : 'left'}}>
                                                        {errors.user_name.message}
                                                    </Label>                                    
                                                    }
                                                    <div className="input-group mb-3">
                                                        <input type="text" 
                                                        placeholder="Username..." 
                                                        ref={register({ required: "Username is mandatory" })}
                                                        aria-invalid={errors.user_name ? 'true' : 'false'}
                                                        name="user_name"
                                                        className={`form-control ${errors.user_name  && errorClass('hasError')}`}
                                                        onChange={() => {
                                                            setErrorMessage('')
                                                        }}
                                                        />
                                                    </div>
                                                    
                                                    {errors.password && 
                                                        <Label basic color='red' pointing="below" style={{float : 'left'}}>
                                                        {errors.password.message}
                                                    </Label>                                    
                                                    }
                                                    <div className="input-group mb-4">
                                                        <input type="password" 
                                                        placeholder="Password..." 
                                                        ref={register({ required: "Password is mandatory" })}
                                                        aria-invalid={errors.password ? 'true' : 'false'}
                                                        name="password"
                                                        className={`form-control ${errors.password  && errorClass('hasError')}`}
                                                        onChange={() => {
                                                            setErrorMessage('')
                                                        }}
                                                        />
                                                    </div>
                                                
                                                    {/* <div className="form-group text-left">
                                                        <div className="checkbox checkbox-fill d-inline">
                                                            <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                                                <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                                        </div>
                                                    </div> */}
                                                    <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                                    {/* <p className="mb-2 text-muted"><NavLink to="/stocks">Inquire Stocks</NavLink></p> */}
                                                    {/* <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
                                                </form>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>

                                            <FormControlLabel
                                                control={
                                                    <Select
                                                        style={{paddingLeft : '10px'}}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        defaultValue={'Stocks'}
                                                        onChange={handleChangeStocks}
                                                        >
                                                            <MenuItem value={'Stocks'}>Inquire Stocks</MenuItem>
                                                            <MenuItem value={'Report_Stock_Details'}>Stock Details Report</MenuItem>
                                                            <MenuItem value={'Report_Stock_Details_PDF'}>Stock Details PDF Report</MenuItem>
                                                            <MenuItem value={'Report_Item'}>Stock History Report</MenuItem>
                                                            <MenuItem value={'Report_Item_PDF'}>Stock History PDF Report</MenuItem>
                                                        </Select>
                                                }
                                                label="Select Type :"
                                                labelPlacement="start"
                                            />

                                                {renderComponent}
                                            
                                        </TabPanel>
                                        
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                {/* : ''} */}
            </Aux>
        );
        
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogin: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
//     }
// };

// const mapStateToProps = state => {
//     return {
//         collapseMenu: state.collapseMenu
//     }
// };

const mapStateToProps = state => {
    return { hasStocksUpdate: state.hasStocksUpdate };
  };

const mapDispatchToProps = dispatch => {
    return {
        successfulLogin: (data) =>  dispatch(actionTypes.receiveLogin(data)),
        failedLogin: (response) =>  dispatch(actionTypes.loginError(response.data.message))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;