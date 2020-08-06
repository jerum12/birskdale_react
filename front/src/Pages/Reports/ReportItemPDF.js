
import React, {Component, Fragment} from 'react';

import axios from 'axios';
import config from '../../config';

import ReportItemDataPDF from './ReportItemDataPDF'

class ReportItemPDF extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

     let date_less_7 = new Date();
    date_less_7.setDate(date_less_7.getDate() - 7)
    
    let date_today = new Date()
    //date_today.setDate(date_today.getDate())
    

    this.state = {
      data : [],
      originalData : [],
      loading : true,
      date_from_state :  date_less_7.toISOString().substring(0,10),
      date_to_state : date_today.toISOString().substring(0,10)
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.groupBy2 = this.groupBy2.bind(this);
    this.handleChange = this.handleChange.bind(this) 
  }
  
    //get stocks onload
   componentDidMount() {
    this._isMounted = true;

    
    // let date_from = new Date();
    // date_from.setDate(date_from.getDate() - 6)
    
    // let date_to = new Date()
    // date_to.setDate(date_to.getDate() + 1)

   

    // this.setState({date_from_state : date_less_7.toISOString().substring(0,10), 
    //               date_to_state : date_today.toISOString().substring(0,10)})
  
      this.getData(this.state.date_from_state,this.state.date_to_state);
   }

   componentWillUnmount() {
    this._isMounted = false;
  }
 
   groupBy = (objectArray, property) => {
      return objectArray.reduce(function (acc, obj) {
        var key = obj[property].description;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);

        return acc;
      }, {});
   }

   groupBy2 = (array, key) => {
    return array.reduce((result, currentValue) => {
        
      (result[currentValue.stocks_id._id] = result[currentValue.stocks_id._id] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

   getData = (date_from,date_to) => {

        //this.setState({loading :true })
        let configParam = {
        headers: {
            'Content-Type': 'application/json',
            'authorization' : sessionStorage.getItem('jwtTokenKey')
          },
        params: {
            date_from : date_from, date_to : date_to
        },
      }
      
      axios.get(config.apiHistory+'data', configParam)
        .then(response => {
            //console.log(response.data.data)
            //console.log(this.groupBy(response.data.data, response.data.data.gender))
            if (this._isMounted) {
              var groupedData = this.groupBy2(response.data.data, 'stocks_id');
              this.setState({ data: groupedData, originalData: response.data.data, loading : false })
            }       
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading : false })
            return null;
        });
 };

    handleChange = (input) => (event,value) => {
      
      if(input === 'date_from_state')
        this.setState({ date_from_state : event.target.value })
      else
        this.setState({ date_to_state : event.target.value })
    }

    handleSubmit = (event) => {
        //console.log(event.target.date_from_state.value)
        this.getData( event.target.date_from_state.value, event.target.date_to_state.value);
        event.preventDefault();
      }

    render() {
      //console.log(data)

      return(
            <ReportItemDataPDF 
            loading={this.state.loading}
            data={this.state.data}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            originalData={this.state.originalData}
            // date_less_7={date_less_7} 
            // date_today={date_today}
            date_from_state={this.state.date_from_state}
            date_to_state={this.state.date_to_state}/>
          );
      
    }
  }

export default ReportItemPDF
