import React, {useReducer,useState} from 'react';
import './App.css';
import Customers from './components/customers';
import Header from './components/Header/Header'
import FetchData from './components/TableResult/FetchData';
import ModalForm from './components/Modals/ModalForm'
import ModalLogin from './components/Modals/ModalLogin'
import Router from './routes/Router'
import RouterBlock from './routes/RouterBlock'
import {GenericContext} from './context/GenericContext'
import { Button } from 'antd';
import { DatePicker, message } from 'antd';

const initialState = {
    count : 0,
    login : localStorage.getItem("login")
  }

const  reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return {
        login : action.login,
        token : action.payload
      }
    case 'LOGN_FAILED' : 
      return {
        login :  action.login,
        token : ''
      }
    case 'LOGOUT_SUCCESS':
      return {
        login :  action.login,
        token : ''
      }
    default:
      return state
  }
}



function App () {

  const [state, dispatch] = useReducer(reducer,initialState)

  //   const [date, setdate] = useState(null)
  // const handleChange = date => {
  //   message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
  //   setdate(date)
  // };

    return (
      <GenericContext.Provider value={{stateName: state , dispatchName : dispatch}}>
      <div className="App">
          {/*
          <DatePicker onChange={handleChange} />
          <div style={{ marginTop: 20 }}>
            Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
          </div> */}
          <RouterBlock/>  
      </div>
      </GenericContext.Provider>
    );
  
}

export default App;
