
import React, {Component, Fragment} from 'react';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const TAX_RATE = 0.07;


function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;


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
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
   }

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
            var groupedData = this.groupBy(response.data.data, 'gender');
            this.setState({ stocks: groupedData, loading : false })
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
      else
        return (
            <Fragment>
            <TableContainer component={Paper}>
            <Table aria-label="spanning table">
                
            </Table>

            
            </TableContainer>


            </Fragment>
        );
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
