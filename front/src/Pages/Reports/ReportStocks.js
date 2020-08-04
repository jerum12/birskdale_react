
import React, {Component, Fragment} from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import TableReport from './TableReport'

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
        
        
        console.log("-----------------")
        return acc;
      }, {});
   }

   groupBy2 = (array, key) => {
    return array.reduce((result, currentValue) => {
        
      (result[currentValue.gender.description] = result[currentValue.gender.description] || []).push(
        currentValue
      );
      //console.log(result);
      return result;
    }, {});
  };

   getData = () => {
      axios({
        method: 'GET',
        url: 'http://localhost:5000/api/stocks/data',
        headers: {
          'Content-Type': 'application/json',
          'authorization' : sessionStorage.getItem('jwtTokenKey')
        }
      })
        .then(response => {
            //console.log(response.data.data)
            //console.log(this.groupBy(response.data.data, response.data.data.gender))
            var groupedData = this.groupBy2(response.data.data, 'gender');
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
                    items.push(<TableReport key={key} index={index} category={key} length={length} value={value} originalData={originalData}/>);
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


class ReportStocks extends React.Component {
    render() {
      return (
        <div>
         

          <Card>
              <Card.Header>
                <Card.Title as="h5">Stock Details Report</Card.Title>
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

export default ReportStocks
