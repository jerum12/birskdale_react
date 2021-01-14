import React,{useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import {Card} from 'react-bootstrap';
import ScaleLoader from "react-spinners/ScaleLoader";

import {SizeRunModal} from './SizeRunModal'
import config from "../../config";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
      fontWeight : 'bold'
    },
    primary : {
        color : '#000',
        "& span": {
            fontSize : '11px',
            fontWeight : 'bold'
          },
        "& p": {
        fontSize : '18px',
        color : 'rgb(32, 51, 86)'
        }
    }
  }));

function StocksHistory(props) {

    const classes = useStyles();

    const [loading, setloading] = useState(false);
    const [details, setdetails] = useState('')
    const [showModal, setshowModal] = useState(false)
    var det = ''

    const handleClose = () => setshowModal(false);

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Transaction Date", field: "transaction_date", type: 'datetime'},
      {title: "Transaction By", field: "transaction_by.full_name",
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '2', field: 'size_run_2', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_2) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_2}</span>;
            else if(Math.sign(rowData.size_run_2) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_2}</span>;
            else
                return  rowData.size_run_2
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '2.5', field: 'size_run_2_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_2_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_2_5}</span>;
            else if(Math.sign(rowData.size_run_2_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_2_5}</span>;
            else
                return  rowData.size_run_2_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '3', field: 'size_run_3', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_3) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_3}</span>;
            else if(Math.sign(rowData.size_run_3) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_3}</span>;
            else
                return  rowData.size_run_3
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '3.5', field: 'size_run_3_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_3_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_3_5}</span>;
            else if(Math.sign(rowData.size_run_3_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_3_5}</span>;
            else
                return  rowData.size_run_3_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '4', field: 'size_run_4', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.size_run_4) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_4}</span>;
                else if(Math.sign(rowData.size_run_4) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_4}</span>;
                else
                    return  rowData.size_run_4
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '4.5', field: 'size_run_4_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_4_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_4_5}</span>;
            else if(Math.sign(rowData.size_run_4_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_4_5}</span>;
            else
                return  rowData.size_run_4_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '5', field: 'size_run_5', type: 'numeric',
            render: (rowData) => {
                if(Math.sign(rowData.size_run_5) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_5}</span>;
                else if(Math.sign(rowData.size_run_5) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_5}</span>;
                else
                    return  rowData.size_run_5
            },   
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '5.5', field: 'size_run_5_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_5_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_5_5}</span>;
            else if(Math.sign(rowData.size_run_5_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_5_5}</span>;
            else
                return  rowData.size_run_5_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '6', field: 'size_run_6', type: 'numeric',  
            render: (rowData) => {
                if(Math.sign(rowData.size_run_6) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_6}</span>;
                else if(Math.sign(rowData.size_run_6) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_6}</span>;
                else
                    return  rowData.size_run_6
            }, 
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '6.5', field: 'size_run_6_5', type: 'numeric', 
            render: (rowData) => {
                if(Math.sign(rowData.size_run_6_5) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_6_5}</span>;
                else if(Math.sign(rowData.size_run_6_5) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_6_5}</span>;
                else
                    return  rowData.size_run_6_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '7', field: 'size_run_7', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.size_run_7) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_7}</span>;
                else if(Math.sign(rowData.size_run_7) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_7}</span>;
                else
                    return  rowData.size_run_7
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },  
      },
      { title: '7.5', field: 'size_run_7_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_7_5) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_7_5}</span>;
                else if(Math.sign(rowData.size_run_7_5) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_7_5}</span>;
                else
                    return  rowData.size_run_7_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '8', field: 'size_run_8', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.size_run_8) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_8}</span>;
                else if(Math.sign(rowData.size_run_8) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_8}</span>;
                else
                    return  rowData.size_run_8
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '8.5', field: 'size_run_8_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_8_5) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_8_5}</span>;
                else if(Math.sign(rowData.size_run_8_5) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_8_5}</span>;
                else
                    return  rowData.size_run_8_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '9', field: 'size_run_9', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.size_run_9) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_9}</span>;
                else if(Math.sign(rowData.size_run_9) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_9}</span>;
                else
                    return  rowData.size_run_9
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '9.5', field: 'size_run_9_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_9_5) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_9_5}</span>;
                else if(Math.sign(rowData.size_run_9_5) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_9_5}</span>;
                else
                    return  rowData.size_run_9_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '10', field: 'size_run_10', type: 'numeric',  
            render: (rowData) => {
                if(Math.sign(rowData.size_run_10) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_10}</span>;
                else if(Math.sign(rowData.size_run_10) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_10}</span>;
                else
                    return  rowData.size_run_10
            }, 
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '10.5', field: 'size_run_10_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_10_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_10_5}</span>;
            else if(Math.sign(rowData.size_run_10_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_10_5}</span>;
            else
                return  rowData.size_run_10_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '11', field: 'size_run_11', type: 'numeric',  
            render: (rowData) => {
                if(Math.sign(rowData.size_run_11) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_11}</span>;
                else if(Math.sign(rowData.size_run_11) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_11}</span>;
                else
                    return  rowData.size_run_11
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '11.5', field: 'size_run_11_5', type: 'numeric', 
        render: (rowData) => {
            if(Math.sign(rowData.size_run_11_5) === -1)
                return  <span style={{color : 'red'}}>{rowData.size_run_11_5}</span>;
            else if(Math.sign(rowData.size_run_11_5) === 1)
                return  <span style={{color : 'blue'}}>{rowData.size_run_11_5}</span>;
            else
                return  rowData.size_run_11_5
        },
        cellStyle: {
            width: 5,
            minWidth : 5
        },
      },
      { title: '12', field: 'size_run_12', type: 'numeric',  
            render: (rowData) => {
                if(Math.sign(rowData.size_run_12) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_12}</span>;
                else if(Math.sign(rowData.size_run_12) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_12}</span>;
                else
                    return  rowData.size_run_12
            }, 
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: '13', field: 'size_run_13', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.size_run_13) === -1)
                    return  <span style={{color : 'red'}}>{rowData.size_run_13}</span>;
                else if(Math.sign(rowData.size_run_13) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.size_run_13}</span>;
                else
                    return  rowData.size_run_13
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      },
      { title: 'Total', field: 'total', type: 'numeric',   
            render: (rowData) => {
                if(Math.sign(rowData.total) === -1)
                    return  <span style={{color : 'red'}}>{rowData.total}</span>;
                else if(Math.sign(rowData.total) === 1)
                    return  <span style={{color : 'blue'}}>{rowData.total}</span>;
                else
                    return  rowData.total
            },
        cellStyle: {
            width: 10,
            minWidth : 10
        },
      }
    ]);
  

    // const [columnsFemale, setColumnsFemale] = useState([
    //     {title: "id", field: "_id", hidden: true},
    //     {title: "Transaction Date", field: "transaction_date", type: 'datetime'},
    //     {title: "Transaction By", field: "transaction_by.full_name",
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '3', field: 'size_run_3', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_3) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_3}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_3}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '3.5', field: 'size_run_3_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_3_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_3_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_3_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '4', field: 'size_run_4', type: 'numeric',   
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_4) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_4}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_4}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '4.5', field: 'size_run_4_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_4_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_4_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_4_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '5', field: 'size_run_5', type: 'numeric',
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_5) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_5}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_5}</span>;
    //           },   
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '5.5', field: 'size_run_5_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_5_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_5_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_5_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '6', field: 'size_run_6', type: 'numeric',  
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_6) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_6}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_6}</span>;
    //           }, 
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '6.5', field: 'size_run_6_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_6_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_6_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_6_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '7', field: 'size_run_7', type: 'numeric',   
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_7) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_7}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_7}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },  
    //     },
    //     { title: '7.5', field: 'size_run_7_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_7_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_7_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_7_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '8', field: 'size_run_8', type: 'numeric',   
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_8) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_8}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_8}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '8.5', field: 'size_run_8_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_8_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_8_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_8_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '9', field: 'size_run_9', type: 'numeric',   
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_9) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_9}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_9}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '9.5', field: 'size_run_9_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_9_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_9_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_9_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '10', field: 'size_run_10', type: 'numeric',  
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_10) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_10}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_10}</span>;
    //           }, 
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '10.5', field: 'size_run_10_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_10_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_10_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_10_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '11', field: 'size_run_11', type: 'numeric',  
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_11) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_11}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_11}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: '11.5', field: 'size_run_11_5', type: 'numeric', 
    //       render: (rowData) => {
    //           if(Math.sign(rowData.size_run_11_5) === -1)
    //               return  <span style={{color : 'red'}}>{rowData.size_run_11_5}</span>;
    //           else
    //               return  <span style={{color : 'blue'}}>{rowData.size_run_11_5}</span>;
    //       },
    //       cellStyle: {
    //           width: 5,
    //           minWidth : 5
    //       },
    //     },
    //     { title: '12', field: 'size_run_12', type: 'numeric',  
    //           render: (rowData) => {
    //               if(Math.sign(rowData.size_run_12) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.size_run_12}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.size_run_12}</span>;
    //           }, 
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     },
    //     { title: 'Total', field: 'total', type: 'numeric',   
    //           render: (rowData) => {
    //               if(Math.sign(rowData.total) === -1)
    //                   return  <span style={{color : 'red'}}>{rowData.total}</span>;
    //               else
    //                   return  <span style={{color : 'blue'}}>{rowData.total}</span>;
    //           },
    //       cellStyle: {
    //           width: 10,
    //           minWidth : 10
    //       },
    //     }
    //   ]);

    const [data, setData] = useState([]); //table data


    useEffect(() => {

        //console.log(props.location)

        if(props.location.state !== undefined){
            det = props.location.state.details;
          }
          
          props.history.replace({
              pathname: props.location.pathname,
              state: {}
          });
          
        if (det === '' || det === undefined ){
            props.history.push("/stocks/inquire")
        }else{
            axios({
                method: 'GET',
                url: config.apiHistory+'data/' + det._id,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : sessionStorage.getItem('jwtTokenKey')
                  }
                })
              .then(response => {
                  //let json = response.data.data;
                  //console.log(response.data.data)
                  setdetails(det)
                  setData(response.data.data)
                  setloading(true)
              })
              .catch(err => {
                  //console.log(err);
                  return null;
              });
        }

      }, [])

    return (
        <Aux>
            {
                loading ?
                <Fragment>
                
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Stocks Details & History</Card.Title>

                            <div  style={{ marginTop: "15px"}}>
                                <button className="btn btn-primary shadow-2 mb-4"
                                        onClick={()=>{
                                    props.history.goBack()
                                }}>Back</button>

                                <button className="btn btn-primary shadow-2 mb-4"
                                        onClick={()=>setshowModal(true)}>Increase / Decrease</button>
                            </div>
                             
                        </Card.Header>
                        <Card.Body>   
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                    &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Stock Number"
                                            secondary={details.stock_no.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Gender"
                                            secondary={details.gender.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Color"
                                            secondary={details.color.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Leather Type"
                                            secondary={details.leather_type.description}
                                        />
                                        </ListItem>
                                    </List>
                                </div>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Classification 1"
                                            secondary={details.classification_1.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Classification 2"
                                            secondary={details.classification_2.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Logo"
                                            secondary={details.logo.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Sub Logo"
                                            secondary={details.sub_logo.description}
                                        />
                                        </ListItem>
                                    </List>
                                </div>
                                </Grid>                       
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Lining"
                                            secondary={details.lining.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Stitch"
                                            secondary={details.stitch.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Canvass"
                                            //secondary={details.special_instruction.length > 0 ? details.special_instruction : "Not Provided"}
                                            secondary={details.canvass.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Midsole"
                                            secondary={details.midsole.description}
                                        />
                                        </ListItem>
                                    </List>
                                </div>
                                </Grid>                      
                                <Grid item xs={12} md={3}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                <div className={classes.demo}>
                                    <List>
                                        
                                        
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Outsole"
                                            secondary={details.outsole.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Sockliner"
                                            secondary={details.sock_liner.description}
                                        />
                                        </ListItem>
                                        <ListItem>
                                        <ListItemText className={classes.primary}
                                            primary="Special Instruction"
                                            //secondary={details.special_instruction.length > 0 ? details.special_instruction : "Not Provided"}
                                            secondary={details.special_instruction}
                                        />
                                        </ListItem>
                                
                                    </List>
                                </div>
                                </Grid>  








                                
                                                     
                                <Grid item xs={12} md={2}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 2"
                                                secondary={details.size_run_2}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 5"
                                                secondary={details.size_run_5_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 8"
                                                secondary={details.size_run_8}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 11"
                                                secondary={details.size_run_11}
                                            />
                                            </ListItem>
                                            
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 2.5"
                                                secondary={details.size_run_2_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 5.5"
                                                secondary={details.size_run_5_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 8.5"
                                                secondary={details.size_run_8_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 11.5"
                                                secondary={details.size_run_11_5}
                                            />
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 3"
                                                secondary={details.size_run_3}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 6"
                                                secondary={details.size_run_6}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 9"
                                                secondary={details.size_run_9}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 12"
                                                secondary={details.size_run_12}
                                            />
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemText className={classes.primary}
                                                primary="Size Run 3.5"
                                                secondary={details.size_run_3_5}
                                                />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 6.5"
                                                secondary={details.size_run_6_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 9.5"
                                                secondary={details.size_run_9_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 13"
                                                secondary={details.size_run_13}
                                            />
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 4"
                                                secondary={details.size_run_4}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 7"
                                                secondary={details.size_run_7}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 10"
                                                secondary={details.size_run_10}
                                            />
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                {/* <Typography variant="h6" className={classes.title}>
                                        &nbsp;
                                </Typography>
                                <Divider/> */}
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 4.5"
                                                secondary={details.size_run_4_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 7.5"
                                                secondary={details.size_run_7_5}
                                            />
                                            </ListItem>
                                            <ListItem>
                                            <ListItemText className={classes.primary}
                                                primary="Size Run 10.5"
                                                secondary={details.size_run_10_5}
                                            />
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>

                            </Grid>
                        
                    

                        <MaterialTable
                                title="History"
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
                                // actions={[
                                //     {
                                //     icon: 'exposure',
                                //     tooltip: 'Increase / Decrease',
                                //     isFreeAction: true,
                                //     //   iconProps : {
                                //     //     color : 'primary',
                                //     //     fontSize : 'large'
                                //     //   },
                                //     onClick: (event) => {
                                //         setshowModal(true)
                                //     }
                                //     }
                                // ]}
                                //   detailPanel={rowData => {
                                //     return (
                                //       <iframe
                                //         width="100%"
                                //         height="315"
                                //         src="https://www.youtube.com/embed/C0DPdy98e4c"
                                //         frameborder="0"
                                //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                //         allowfullscreen
                                //       />
                                //     )
                                //   }}
                                //   onRowClick={(event, rowData, togglePanel) => togglePanel()}

                            />
                        </Card.Body>
                    </Card>

                    <SizeRunModal
                        showModal={showModal} 
                        handleClose={handleClose}
                        props={props}
                        data={details}
                    />
                </Fragment>
                :
                <div style={{textAlign: 'center'}}>
                    <div className="spinner">LOADING...</div>
                    <ScaleLoader color="rgb(34, 144, 119)" loading={true} size={20} height={30} />
                </div>
            }
                        

        </Aux>
    )
  }

  export default StocksHistory;
