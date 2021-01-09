import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import { Header, Button, Popup, Grid } from 'semantic-ui-react'
import {Card} from 'react-bootstrap';
import Moment from 'moment'
import config from "../../config";

function InquireStocks(props) {

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Transaction Date", field: "transaction_date", 
        render: (rowData) => {
          return Moment(rowData.transaction_date).format('MM-DD-YYYY HH:mm:ss')
        }},
      { title: 'Stock Number', field: 'stock_no.description', 
        render: (rowData) => {
          return  <Link  to={{ pathname: "/stocks/history", state: { details: rowData}   }}>{rowData.stock_no.description}</Link>;
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },  
      },
      { title: 'Stock Details', field: 'stock_details',
        render: (rowData) => {
            // let abc = rowData.stock_details.split(";")
            // let d = ``
            // for(var i=0 ; i<abc.length; i++){
            //   d +=  `<div>${abc[i]}</div>`
            // }
            // return  <Popup
            //             position='right'
            //             trigger={<p style={{cursor: 'pointer'}}>Stock Details...</p>}
            //             inverted
            //             content= { <div dangerouslySetInnerHTML={{ __html: rowData.stock_details.split(";").join("<br/>") }} /> }
            //         />
            return <Popup   
                      inverted 
                      trigger={<p style={{cursor: 'pointer'}}>Stock Details...</p>} 
                      offset={[0, 50]}
                      position='right center'
                      flowing 
                      hoverable
                      >
                <Grid>
                  <Grid.Column>
                    <Header as='h4'>Stock Details</Header>
                    <p>
                    <div dangerouslySetInnerHTML={{ __html: rowData.stock_details.split(";").join("<br/>") }} /> 
                    </p>
                  </Grid.Column>
                </Grid>
              </Popup>
            }, 
        cellStyle: {
            width: 5,
            minWidth : 5
        }, 
      },
      { title: '2', field: 'size_run_2', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '2.5', field: 'size_run_2_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '3', field: 'size_run_3', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '3.5', field: 'size_run_3_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '4', field: 'size_run_4', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '4.5', field: 'size_run_4_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '5', field: 'size_run_5', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '5.5', field: 'size_run_5_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '6', field: 'size_run_6', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '6.5', field: 'size_run_6_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '7', field: 'size_run_7', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },  
      },
      { title: '7.5', field: 'size_run_7_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '8', field: 'size_run_8', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '8.5', field: 'size_run_8_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '9', field: 'size_run_9', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '9.5', field: 'size_run_9_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '10', field: 'size_run_10', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '10.5', field: 'size_run_10_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '11', field: 'size_run_11', type: 'numeric',  
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '11.5', field: 'size_run_11_5', type: 'numeric', 
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '12', field: 'size_run_12', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '13', field: 'size_run_13', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: 'Total Size Run', field: 'total_size_run', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      }
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios({
            method: 'GET',
            url: config.apiStocks+'data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
             //handleResponse(response,props)

             if(response.data.code === '00'){
              setData( response.data.data)
              setLoading(true)
             }else{
               //alert('2')
              setLoading(false)
             }
            
          })
          .catch(err => {
              //console.log(err);
              setLoading(false)
          });
      }, [])

    return (
        <Aux>
            {
              loading ?
                  <Card>
                    <Card.Header>
                      <Card.Title as="h5">Inquire Stocks</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <MaterialTable
                          title=""
                          //style={{padding : '20px'}}
                          columns={columns}
                          data={data}
                          options={{
                              exportButton: true,
                              headerStyle: {
                                  backgroundColor: '#203356',
                                  color: '#FFF'
                              },
                              rowStyle: {
                                  backgroundColor: '#EEE',
                              }
                          }} 
                        />

                    </Card.Body>
                  </Card>
                 
                :
                  ''
              }
            

        </Aux>
    )
  }

  export default InquireStocks;
