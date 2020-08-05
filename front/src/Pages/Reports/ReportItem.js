
import React, {Component, Fragment} from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from '@material-ui/core/FormLabel';
import TextField from "@material-ui/core/TextField";


import TableReportHistory from './TableReportHistory'

class GenerateData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data : [],
      originalData : [],
      loading : true

    }
  }
  
    //get stocks onload
   componentDidMount() {
      this.getData();
   }

 
   groupBy = (objectArray, property) => {
      return objectArray.reduce(function (acc, obj) {
        var key = obj[property].description;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        
        
        //console.log("-----------------")
        return acc;
      }, {});
   }

   groupBy2 = (array, key) => {
    return array.reduce((result, currentValue) => {
        
      (result[currentValue.stocks_id._id] = result[currentValue.stocks_id._id] || []).push(
        currentValue
      );
      //console.log(result);
      return result;
    }, {});
  };

   getData = () => {
      axios({
        method: 'GET',
        url: 'http://192.168.0.27:5000/api/stocks/history/data',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : sessionStorage.getItem('jwtTokenKey')
        }
      })
        .then(response => {
            //console.log(response.data.data)
            //console.log(this.groupBy(response.data.data, response.data.data.gender))
            var groupedData = this.groupBy2(response.data.data, 'stocks_id');
            this.setState({ data: groupedData, originalData: response.data.data, loading : false })
            
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading : false })
            return null;
        });
 };


    render() {
      const {data,originalData,loading } = this.state;
      

      if(loading)
        return  (
                  <Backdrop  style={{color : '#fff'}} open={true}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )
            else{
                const items = []
                const length =  Object.entries(data).length;
                
                  for (const [index, [key, value]] of Object.entries(Object.entries(data))) {  
                    items.push(<TableReportHistory key={key} index={index} category={key} length={length} value={value} originalData={originalData}/>);
                  }

                return (
                    <Fragment>
                    <TableContainer component={Paper}>
      
                         {items}     
                   
                    </TableContainer>
                    </Fragment>
                );
            }
        
        }
}


class ReportItem extends React.Component {

    handleChange = (input) => (event,value) => {
        console.log(input)
        console.log(event.target.value)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.date_from.value)        
        console.log(event.target.date_to.value)    
        
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              },
            params: {
                date_from : event.target.date_from.value, date_to : event.target.date_to.value
            },
          }
          axios.get('http://192.168.0.27:5000/api/stocks/history/data', config)
            .then(function (response) {
    
                    console.log(response.data.data)
                // if(response.status === 201 || response.status === 200){
                //     if(response.data.code === '00'){
                //         setAlertSuccess(true)   
                //     }else{
                //         setMessage(response.data.message)
                //         setAlertFailed(true);
                //     }
                // }else{
                //     setAlertFailed(true);
                //     setMessage(response.data.message)
                // }
                
            })
            .catch(function (error) {
                // setAlertFailed(true);
                // console.log( Object.assign({}, error).response)
                // setMessage(Object.assign({}, error).response)
            });
      }

    render() {
      return (
        <div>
         

          <Card>
              <Card.Header>
                <Card.Title as="h5">Stocks History Report</Card.Title>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth required margin="normal">
                            <FormLabel component="legend" className='date_from'>Date From</FormLabel>
                            <TextField
                                id="date"
                                name="date_from"
                                type="date"
                                defaultValue="2017-05-24"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                //onChange={this.handleChange('date_from')}
                            />
                                
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <FormControl fullWidth required margin="normal">
                            <FormLabel component="legend" className='date_from'>Date To</FormLabel>
                            <TextField
                                id="date"
                                name="date_to"
                                type="date"
                                defaultValue="2017-05-24"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                                
                            </FormControl>
                        </Grid>
                    </Grid>
                    <button className="btn btn-primary shadow-2 mb-4">Submit</button>

                </form>

                <div  style={{ display: "flex",justifyContent: "flex-end" }}>
                  <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                      {({ handlePrint }) => (
                        <button onClick={handlePrint}  className="btn btn-primary shadow-2 mb-4">Print this out!</button>
                      )}
                    </PrintContextConsumer>
                </ReactToPrint>
              </div>
              </Card.Header>
              <Card.Body>
                  <GenerateData ref={el => (this.componentRef = el)} />
              </Card.Body>
          </Card>
       
        </div>
      );
    }
  }

export default ReportItem
