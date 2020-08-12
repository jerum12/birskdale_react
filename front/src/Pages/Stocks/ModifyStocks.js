import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import {Card} from 'react-bootstrap';
import config from '../../config';

 function ModifyStocks(props) {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const [columns, setColumns] = useState([

        {title: "id", field: "_id", hidden: true},
        {title: "Transaction Date", field: "transaction_date", type: 'datetime'},
        { title: 'Stock Number', field: 'stock_no._id', 
          render: (rowData) => {
            return  <Link  to={{ pathname: '/stocks/modify/details',
                    state: { details: rowData}  }}>{rowData.stock_no.description}</Link>;
            },
            cellStyle: {
                width: 5,
                minWidth : 5
            },   
          //lookup: stockArray
        },{ title: 'Color', field: 'color._id',
            render: (rowData) => {
            return  <div>{rowData.color.description}</div>;
            },  
            //lookup: colorArray
        },
        { title: 'Gender', field: 'gender._id',
            render: (rowData) => {
            return  <div>{rowData.gender.description}</div>;
            },  
            //lookup: genderArray
        },
        { title: 'Leather Type', field: 'leather_type._id',
            render: (rowData) => {
            return  <div>{rowData.leather_type.description}</div>;
            },  
            //lookup: leatherArray
        },
        { title: 'Classification 1', field: 'classification_1._id',
            render: (rowData) => {
            return  <div>{rowData.classification_1.description}</div>;
            },  
            //lookup: class1Array
        },
        { title: 'Classification 2', field: 'classification_2._id',
            render: (rowData) => {
            return  <div>{rowData.classification_2.description}</div>;
            },  
            //lookup: class2Array
        },
        { title: 'Logo', field: 'logo._id',
            render: (rowData) => {
            return  <div>{rowData.logo.description}</div>;
            },  
            //lookup: logoArray
        },
        { title: 'Sub Logo', field: 'sub_logo._id',
            render: (rowData) => {
            return  <div>{rowData.sub_logo.description}</div>;
            },  
            //lookup: subLogoArray
        },
        { title: 'Lining', field: 'lining._id',
            render: (rowData) => {
            return  <div>{rowData.lining.description}</div>;
            },  
            //lookup: liningArray
        },
        { title: 'Stitch', field: 'stitch._id',
            render: (rowData) => {
            return  <div>{rowData.stitch.description}</div>;
            },  
            //lookup: stitchArray
        },
        { title: 'Special Instruction', field: 'special_instruction'
        },
    
      ]);
    

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
              let json = response.data.data;
              setData(json)
              setLoading(true)
          })
          .catch(err => {
              //console.log(err);
              return null;
          });
         
          
      }, [])



    return (
        <Aux>
              {loading 
              ?
                <Card>
                  <Card.Header>
                    <Card.Title as='h5'>Modify Stocks</Card.Title>
                  </Card.Header>
                  <Card.Body>
                      <MaterialTable
                            //style={{padding : '20px'}}
                            title=""
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
                            // editable={{
                            //   onRowUpdate: (newData, oldData) =>
                            //     new Promise((resolve, reject) => {
                    

                            //       setTimeout(() => {
                            //         //  const dataUpdate = [...data];
                            //         // const index = oldData.tableData.id;
                            //         //   //console.log(newData)
                            //         //  dataUpdate[index] = newData;
                            //         // setData([...dataUpdate]);
                            //         ////console.log(newData.color._id)
                            //         //console.log(newData._id)

                            //         axios({
                            //           method: 'PUT',
                            //           url: 'http://localhost:5000/api/stocks/data/' + newData._id,
                            //           headers: {
                            //             'Content-Type': 'application/json',
                            //             'authorization' : sessionStorage.getItem('jwtTokenKey')
                            //           },
                            //           data: newData
                            //           })
                            //           .then((res) => {
                            //             //console.log(res.data)

                            //               if(res.data.code === '00')
                            //                 setStatus(true)
                            //               else
                            //                 setStatus(false)

                            //               setMessage(res.data.message)
                            //           }).catch((error) => {
                            //             //console.log(error)
                            //             setStatus(false)
                            //             setMessage(error.message)
                            //           })
                            //           setReloadTable(true)
                            //           resolve();
                            //       }, 1000)
                            //     })
                            // }}
                          
                            // actions={[
                            //   {
                            //     icon: 'edit',
                            //     tooltip: 'Edit Stocks',
                            //     onClick: (event, rowData) => {
                            //       props.history.push({
                            //         pathname: '/stocks/modify/details',
                            //         state: { details: rowData}
                            //       })
                            //     }
                            //   }
                            // ]}
                        />
                  </Card.Body>
                </Card>
              :
                ''
              }
                    
        </Aux>
    )
  }

  export default withRouter(ModifyStocks);
