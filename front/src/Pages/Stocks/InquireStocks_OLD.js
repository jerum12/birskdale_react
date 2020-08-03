import React, {Fragment} from 'react';

import axios from 'axios';
import Aux from "../../hoc/_Aux";
import MUIDataTable from "mui-datatables";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './Stocks.css';
import {Row, Col, Card} from 'react-bootstrap';

let dataValue = [];

const columns = [
    {
      name: "Stock Number",
      options: {
        filter: true,
      }
    },
    {
      name: "Color",
      options: {
        filter: true,
      }
    },
    {
      name: "Gender",
      options: {
        filter: true,
      }
    },
    {
      name: "Leather Type",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Classification 1",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Classification 2",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Logo",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Sub Logo",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Lining",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Stitch",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Total Size Run",
      options:{
        filter: true,
        sort: true
      }
    },
    {
      name: "ID",
      options:{
        viewColumns : false,
        display: 'false',
        filter: false,
        sort: false
      }
    }

  ];



  const options = {
    filter: true,
    selectableRows : 'none',
    filterType: 'dropdown',
    responsive: 'standard',
    expandableRows: true,
    expandableRowsHeader: false,
    expandableRowsOnClick: true,
    isRowExpandable: (dataIndex, expandedRows) => {
      // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
      if (expandedRows.data.length > 4 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      return true;
    },
    onRowsDelete : (row) => {
        console.log(row.data.length )
    },
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      console.log(rowData[11])
      let obj = [];
      for(var i=0 ; i < dataValue.length; i++){
        if(dataValue[i]._id === rowData[11]){
            obj.push(dataValue[i].size_run_3);
            obj.push(dataValue[i].size_run_4);
            obj.push(dataValue[i].size_run_5);
            obj.push(dataValue[i].size_run_6);
            obj.push(dataValue[i].size_run_7);
            obj.push(dataValue[i].size_run_8);
            obj.push(dataValue[i].size_run_9);
            obj.push(dataValue[i].size_run_10);
            obj.push(dataValue[i].size_run_11);
            obj.push(dataValue[i].size_run_12);
            obj.push(dataValue[i].size_run_13);
            obj.push(dataValue[i].size_run_14);
        }
    }
     console.log(obj) 
      return (
       
            <Fragment>
                <TableRow className="size1">
                    <TableCell className="tableHead">Size Run 3</TableCell>
                    <TableCell className="tableHead">Size Run 4</TableCell>
                    <TableCell className="tableHead">Size Run 5</TableCell>
                    <TableCell className="tableHead">Size Run 6</TableCell>
                    <TableCell className="tableHead">Size Run 7</TableCell>
                    <TableCell className="tableHead">Size Run 8</TableCell>
                    <TableCell className="tableHead">Size Run 9</TableCell>
                    <TableCell className="tableHead">Size Run 10</TableCell>
                    <TableCell className="tableHead">Size Run 11</TableCell>
                    <TableCell className="tableHead">Size Run 12</TableCell>
                    <TableCell className="tableHead">Size Run 13</TableCell>
                    <TableCell className="tableHead">Size Run 14</TableCell>
                </TableRow>
                <TableRow className="size2">
                {   
                    obj.map((value, index) => {
                    return <TableCell key={index}>{value}</TableCell>
                })
                }
                </TableRow>
             </Fragment>
      );
    },
    onRowExpansionChange: (curExpanded, allExpanded, rowsExpanded) => console.log(curExpanded, allExpanded, rowsExpanded)
  };

  const theme = createMuiTheme({
    overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: "#FF000"
          },
          paper: {
            boxShadow: "none"
          }
        }, MUIDataTableHeadCell: {
            root: {
              backgroundColor: "#b6b9bd  !important",
              fontWeight: 'bold',
              padding : '5px',
            }
          }
        //   ,
        // MUIDataTableBodyCell: {
        //   root: {
        //     backgroundColor: "#f9efef",
        //     "&:last-child": {
        //       paddingRight: 5
        //     }
        //   }
        // }
      }
  });


class InquireStocks extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          data : [],
          otherData : []
        }
    
      }
    
      //get stocks onload
     componentDidMount() {
        this.getStocks();
     }

     //get Stocks from api
     getStocks = () => {
        axios({
              method: 'GET',
              url: 'http://192.168.0.15:5000/api/stocks/data',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization' : sessionStorage.getItem('jwtTokenKey')
                }
          })
            .then(response => {
                console.log(response.data.data)
                let json = response.data.data;
         
                let newData = [];

                let otherObj = {};
                let otherArray = [];

                for( var i=0 ; i < json.length ; i++){
                    let newObj = [];
                    newObj.push(json[i].stock_no.description)
                    newObj.push(json[i].color.description)
                    newObj.push(json[i].gender.description)
                    newObj.push(json[i].leather_type.description)
                    newObj.push(json[i].classification_1.description)
                    newObj.push(json[i].classification_2.description)
                    newObj.push(json[i].logo.description)
                    newObj.push(json[i].sub_logo.description)
                    newObj.push(json[i].lining.description)
                    newObj.push(json[i].stitch.description)
                    newObj.push(json[i].total_size_run)
                    newObj.push(json[i]._id)
                    newData.push(newObj)
                }
                // json.forEach(function(obj) { 
                //     newObj.push(obj.stock_no.description)
                //     newObj.push(obj.stock_details)
                //     newObj.push(obj.leather_type.description)
                //     newObj.push(obj.color.description)
                //     newObj.push(obj.gender.description)
                //     newObj.push(obj.lining.description)
                // });
                console.log(newData)
                dataValue = json;
                this.setState({ data: newData})
            })
            .catch(err => {
                console.log(err);
                return null;
            });
     };

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Inquire Stocks</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MuiThemeProvider theme={theme}>
                                    <MUIDataTable  data={this.state.data} columns={columns} options={options} />
                                </MuiThemeProvider>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                   
                
            </Aux>
        );
    }
}

export default InquireStocks;