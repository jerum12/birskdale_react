
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
import config from '../../config';

import TableReportHistory from './TableReportHistory'



class ReportItemData extends React.Component {


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
        date_today.setDate(date_today.getDate() + 1)    
        date_today = date_today.toISOString().substring(0,10)

        let date_min = new Date(date_from_state)
        date_min.setDate(date_min.getDate() + 1)    
        date_min = date_min.toISOString().substring(0,10)
        
          for (const [index, [key, value]] of Object.entries(Object.entries(data))) {  
            items.push(<TableReportHistory key={key} index={index} category={key} length={length} value={value} originalData={originalData}/>);
          }
          return (
              <Card>
                  <Card.Header>
                    <Card.Title as="h5">Stocks History Report</Card.Title>
                    <form onSubmit={handleSubmit}  style={{display : 'inline'}}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth required margin="normal">
                                <FormLabel component="legend" className='date_from'>Date From</FormLabel>
                                <TextField
                                    id="date"
                                    name="date_from_state"
                                    type="date"
                                    defaultValue={date_from_state}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    onChange={handleChange('date_from_state')}
                                    error={date_from_state === ""}
                                    helperText={date_from_state === "" ? 'Invalid Date!' : ' '}
                                />
                                    
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth required margin="normal">
                                <FormLabel component="legend" className='date_from'>Date To</FormLabel>
                                <TextField
                                    id="date"
                                    name="date_to_state"
                                    type="date"
                                    defaultValue={date_to_state}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{ min: date_min, max: date_today }}
                                    onChange={handleChange('date_to')}
                                    error={date_to_state === ""}
                                    helperText={date_to_state === "" ? 'Invalid Date!' : ' '}
                                />
                                    
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

export default ReportItemData
