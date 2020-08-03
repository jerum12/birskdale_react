
import React, {Component, Fragment} from 'react';


import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import TableReport from './TableReport'

class Example extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data : [],
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
        var test = [];
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
            console.log(response.data.data)
            //console.log(this.groupBy(response.data.data, response.data.data.gender))
            var groupedData = this.groupBy2(response.data.data, 'gender');
            this.setState({ data: groupedData, loading : false })
            
        })
        .catch(err => {
            console.log(err);
            this.setState({ loading : false })
            return null;
        });
 };

    render() {
      const {data,loading } = this.state;
      

      if(loading)
        return  (
                  <Backdrop  style={{color : '#fff'}} open={true}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )
            else{
                console.log(data)
                for (const [key, value] of Object.entries(data)) {
                    console.log(`${key}: ${value}`);
                  }

                return (
                    <Fragment>
                    <TableContainer component={Paper}>
                    {/* <Table aria-label="spanning table">
                   
                         {
                            
                        //    data.map(item => {
                        //     console.log(item)//return  <TableReport item={item}/>
                        //     })
                        }     
                    </Table> */}
        
                    
                    </TableContainer>
        
        
                    </Fragment>
                );
            }
        
        }
}


class Report1 extends React.Component {
    render() {
      return (
        <div>
          <ReactToPrint
            trigger={() => {
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return <button>Print this out!</button>;
            }}
            content={() => this.componentRef}
          />
          <Example ref={el => (this.componentRef = el)} />
        </div>
      );
    }
  }

export default Report1
