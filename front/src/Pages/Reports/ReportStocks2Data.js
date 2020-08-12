
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

import TableReport from './TableReport'


import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


class ReportStocks2Data extends React.Component {


    render() {
        const {loading,data,handleSubmit,originalData,
              date_from_state,date_to_state,
              handleChange} = this.props

      if(loading)
        return  (
                  <Backdrop  style={{color : '#fff'}} open={true}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )
      else{

        const items = []
        const length =  Object.entries(data).length;
        let date_today = new Date()
        date_today.setDate(date_today.getDate())    
        date_today = date_today.toISOString().substring(0,10)

        let date_min = new Date(date_from_state)
        date_min.setDate(date_min.getDate())    
        date_min = date_min.toISOString().substring(0,10)
        
          for (const [index, [key, value]] of Object.entries(Object.entries(data))) {  
            items.push(<TableReport key={key} index={index} category={key} length={length} value={value} originalData={originalData}/>);
          }
          return (
              <Card>
                  <Card.Header>
                    <Card.Title as="h5">Stocks Details Report</Card.Title>
                    <form onSubmit={handleSubmit}  style={{display : 'inline'}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth required margin="normal">
                                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                          autoOk
                                          disableToolbar
                                          label="Date From"
                                          variant="inline"
                                          value={date_from_state}
                                          onChange={handleChange('date_from_state')}
                                          format="MM/dd/yyyy"
                                          disableFuture={true}
                                          name="date_from_state"
                                        />
                                      </MuiPickersUtilsProvider>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth required margin="normal">
                                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                          autoOk
                                          disableToolbar
                                          label="Date To"
                                          variant="inline"
                                          value={date_to_state}
                                          onChange={handleChange('date_to_state')}
                                          format="MM/dd/yyyy"
                                          disableFuture={true}
                                          name="date_to_state"
                                        />
                                      </MuiPickersUtilsProvider>
                                    
                                </FormControl>
                            </Grid>
                        </Grid>
                        <button className="btn btn-primary shadow-2 mb-4" 
                        disabled={date_from_state === "" || date_to_state === ""}>Submit</button>

                    </form>

                    <div  style={{ display: "inline"}}>
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
                      {/* <GenerateData ref={el => (this.componentRef = el)} /> */}
                      <TableContainer component={Paper}  ref={el => (this.componentRef = el)}>                    
                          {items}     
                    </TableContainer>
                  </Card.Body>
              </Card>
          );
      }
    }
  }

export default ReportStocks2Data