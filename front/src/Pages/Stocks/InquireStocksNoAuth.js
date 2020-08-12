import React,{useState, useEffect, forwardRef } from "react";
import MaterialTable, {MTablePagination} from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import {Popup } from 'semantic-ui-react'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import CachedIcon from '@material-ui/icons/Cached';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Moment from 'moment'

import '../../assets/scss/style.scss'
import config from "../../config";

function InquireStocksNoAuth(props) {

    
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        };

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Transaction Date", field: "transaction_date", 
        render: (rowData) => {
          return Moment(rowData.transaction_date).format('MM-DD-YYYY HH:mm:ss')
        }},
      { title: 'Stock Number', field: 'stock_no.description'},
      { title: 'Stock Details', field: 'stock_details',
        render: (rowData) => {
            return  <Popup
                        trigger={<p style={{cursor: 'pointer', color:'blue'}}>Stock Details...</p>}
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
    const [reloadTable,setReloadTable]= useState(false)
    
    useEffect(() => {
        axios({
            method: 'GET',
            url: config.apiStocks+'dataall',
            headers: {
                'Content-Type': 'application/json'
              }
            })
          .then(response => {
             if(response.data.code === '00'){
              setData( response.data.data)
              setLoading(true)
             }else{
              setLoading(false)
             }
            
          })
          .catch(err => {
              //console.log(err);
              setLoading(false)
          });
      }, [reloadTable])

    return (
        <Aux>
            {
              loading ?

            
              <MaterialTable
                title="Inquire Stocks"
                icons={tableIcons}
                style={{padding : '20px'}}
                columns={columns}
                data={data}
                options={{
                    //exportButton: true,
                    headerStyle: {
                        backgroundColor: '#203356',
                        color: '#FFF'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                    pageSize:5
                }}
                actions={[ 
                    {
                    icon: () => <CachedIcon/>,
                    tooltip: 'Refresh',
                    isFreeAction: true,
                    onClick: () => { 
                        setReloadTable(true)
                    }
                    }        
        
                ]}
              />
                :
                  ''
              } 

           
            

        </Aux>
    )
  }

  export default InquireStocksNoAuth;
