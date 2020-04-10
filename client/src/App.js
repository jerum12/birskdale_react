import React, {useReducer} from 'react';
import './App.css';
import Customers from './components/customers';
import Header from './components/Header/Header'
import FetchData from './components/TableResult/FetchData';
import ModalForm from './components/Modals/ModalForm'
import ModalLogin from './components/Modals/ModalLogin'
import Router from './routes/Router'
import RouterBlock from './routes/RouterBlock'
import {GenericContext} from './context/GenericContext'


const initialState = {
    count : 0,
    login : false
  }

const  reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return {
        login : true,
        token : action.payload
      }
    case 'LOGN_FAILED' : 
      return {
        login : false,
        token : ''
      }
    case 'LOGOUT_SUCCESS':
      return {
        login : false,
        token : action.payload
      }
    default:
      return state
  }
}

function App () {

  const [state, dispatch] = useReducer(reducer,initialState)

    return (
      <GenericContext.Provider value={{stateName: state , dispatchName : dispatch}}>
      <div className="App">
        <div className="app-body">
          <RouterBlock/>  
        </div>
      </div>
      </GenericContext.Provider>
    );
  
}

export default App;
