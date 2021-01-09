
import React, {Component, Fragment} from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import TableReport from './TableReport'
import config from '../../config';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

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
        
      (result[currentValue.gender.description] = result[currentValue.gender.description] || []).push(
        currentValue
      );
      ////console.log(result);
      return result;
    }, {});
  };

   getData = () => {
      axios({
        method: 'GET',
        url: config.apiStocks+'/data/report',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : sessionStorage.getItem('jwtTokenKey')
        }
      })
        .then(response => {
            ////console.log(response.data.data)
            ////console.log(this.groupBy(response.data.data, response.data.data.gender))
            var groupedData = this.groupBy2(response.data.data, 'gender');
            this.setState({ data: groupedData, originalData: response.data.data, loading : false })
            
        })
        .catch(err => {
            //console.log(err);
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
                    items.push(<TableReport key={key} index={index} category={key} length={length} value={value} originalData={originalData}/>);
                  }

                  if(items.length > 0){
                    return (
                        <Fragment>
                        <TableContainer component={Paper}>
          
                            {items}     
                      
                        </TableContainer>
                        </Fragment>
                    )
                  }else{
                    return (
                      <Table aria-label="spanning table"  id="table_0">
                        <TableHead>
                              <TableRow>
                                  <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Transaction Date</TableCell>
                                  <TableCell style={{backgroundColor: '#203356', color: '#FFF'}}>Stock Details</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>2</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>2.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>3</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>3.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>4</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>4.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>5.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>6</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>6.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>7</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>7.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>8</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>8.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>9</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>9.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>10</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>10.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>11</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>11.5</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>12</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>13</TableCell>
                                  <TableCell align="right" style={{backgroundColor: '#203356', color: '#FFF'}}>Total</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                  <TableCell style={{textAlign : 'center'}} colSpan={25}>No records to display</TableCell>
                              </TableRow>
                            </TableBody>
                      </Table>
                    )
                  }                
            }
        
        }
}


class ReportStocks extends React.Component {
    render() {
      return (
        <div>
         
          <Card>
              <Card.Header>
                <Card.Title as="h5">Stock Details Report</Card.Title>
                <div  style={{ marginTop: "15px"}}>
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

export default ReportStocks
