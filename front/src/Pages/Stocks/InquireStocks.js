import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import {Popup } from 'semantic-ui-react'
import {Card} from 'react-bootstrap';
import {handleResponse} from './GenericMethod'
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
            return  <Popup
                        trigger={<p style={{cursor: 'pointer'}}>Stock Details...</p>}
                        content= {rowData.stock_details}
                        inverted
                    />
            }, 
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
      { title: '4', field: 'size_run_4', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '5', field: 'size_run_5', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '6', field: 'size_run_6', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '7', field: 'size_run_7', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },  
      },
      { title: '8', field: 'size_run_8', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '9', field: 'size_run_9', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '10', field: 'size_run_10', type: 'numeric',   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '11', field: 'size_run_11', type: 'numeric',  
        cellStyle: {
            width: 10,
            minWidth : 10
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
      { title: '14', field: 'size_run_14', type: 'numeric',   
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
             handleResponse(response,props)

             if(response.data.code === '00'){
              setData( response.data.data)
              setLoading(true)
             }else{
               alert('2')
              setLoading(false)
             }
            
          })
          .catch(err => {
              console.log(err);
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
                          // detailPanel={[
                          //     {
                          //       tooltip: 'Show Stock Details',
                          //       render: rowData => {
                          //         return (
                          //             <MaterialTable
                          //                 title="Stock Details"
                          //                 columns={[
                          //                     { title: 'Color', field: 'color',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.color.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Gender', field: 'gender',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.gender.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Leather Type', field: 'leather_type',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.leather_type.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Classification 1', field: 'classification_1',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.classification_1.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Classification 2', field: 'classification_2',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.classification_2.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'logo', field: 'logo',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.logo.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Sub Logo', field: 'sub_logo',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.sub_logo.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Lining', field: 'lining',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.lining.description}</div>;
                          //                         }
                          //                     },
                          //                     { title: 'Stitch', field: 'stitch',
                          //                         render: (rowData) => {
                          //                         return  <div>{rowData.stitch.description}</div>;
                          //                         }
                          //                     },
                          //                 ]}
                          //                 data={data}     
                          //                 options={{
                          //                     exportButton: true,
                          //                     headerStyle: {
                          //                         backgroundColor: '#203356',
                          //                         color: '#FFF'
                          //                       },
                          //                       rowStyle: {
                          //                         backgroundColor: '#EEE',
                          //                       }
                          //                 }}
                          //                 />
                          //         )
                          //       },
                          //     }
                          //   ]}
                          
                          // editable={{
                          //   onRowAdd: newData =>
                          //     new Promise((resolve, reject) => {
                          //       setTimeout(() => {
                          //         setData([...data, newData]);
                                  
                          //         resolve();
                          //       }, 1000)
                          //     }),
                          //   onRowUpdate: (newData, oldData) =>
                          //     new Promise((resolve, reject) => {
                          //       setTimeout(() => {
                          //         const dataUpdate = [...data];
                          //         const index = oldData.tableData.id;
                          //         dataUpdate[index] = newData;
                          //         setData([...dataUpdate]);
                  
                          //         resolve();
                          //       }, 1000)
                          //     }),
                          //   onRowDelete: oldData =>
                          //     new Promise((resolve, reject) => {
                          //       setTimeout(() => {
                          //         const dataDelete = [...data];
                          //         const index = oldData.tableData.id;
                          //         dataDelete.splice(index, 1);
                          //         setData([...dataDelete]);
                                  
                          //         resolve()
                          //       }, 1000)
                          //     }),
                          // }}
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
