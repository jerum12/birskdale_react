import React, { Component, Fragment } from 'react'  
import TableContainer from '@material-ui/core/TableContainer';  
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';  
import axios from 'axios';  
import jsPDF from 'jspdf';  
import Button from '@material-ui/core/Button';  
import autoTable  from 'jspdf-autotable'
import {Card} from 'react-bootstrap';
import TableReport from './TableReport'

import config from '../../config';

class ReportItemPDF extends Component {

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

        return acc;
      }, {});
   }

   groupBy2 = (array, key) => {
    return array.reduce((result, currentValue) => {
        
      (result[currentValue.gender.description] = result[currentValue.gender.description] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

   getData = () => {
      axios({
        method: 'GET',
        url: config.apiHistory+'data',
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
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Stock Details Report</Card.Title>
                        <div  style={{ display: "flex",justifyContent: "flex-end" }}>
                            <button onClick={() =>{
                                var pdf = new jsPDF('l', 'pt', "a4");
                  
                                pdf.text("Stocks Summary Report", 40, 50);


                                for(var i=0 ; i < length; i++){
                                    autoTable(pdf, {html: '#table_'+i,margin: {top: 70}})
                                }

                                pdf.save('Stocks Details.pdf');  

                              }} 
                              className="btn btn-primary shadow-2 mb-4">  
                              Generate Pdf  
                            </button>  
                        </div>
                    </Card.Header>
                    <Card.Body>                
                      <TableContainer component={Paper} id="pdfdiv">
                              {items}     
                      </TableContainer>
                    </Card.Body>
                  </Card>

                </Fragment>
            );
        }
        
        }
}

export default ReportItemPDF  