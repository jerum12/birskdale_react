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
              console.log(err);
              return null;
          });
         
          
      }, [])



      // useEffect(() => {
      //   axios({
      //     method: 'GET',
      //     url: 'http://localhost:5000/api/parameter/data',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'authorization' : sessionStorage.getItem('jwtTokenKey')
      //       }
      //     })
      //     .then(response => {
              
      //         if(response.data.code === '99'){
      //             //setshowTimeout(true)
      //             console.log('error')
      //         }else{

      //           let a = [];
      //           let b = [];
      //           let c = [];
      //           let d = [];
      //           let e = [];
      //           let f = [];
      //           let g = [];
      //           let h = [];
      //           let iii = [];
      //           let j = [];

      //           for(var i=0 ; i < response.data.data.stock.length ; i++){
      //             a[response.data.data.stock[i]._id] = response.data.data.stock[i].description
      //           }

      //           for(var ii=0 ; ii < response.data.data.color.length ; ii++){
      //             b[response.data.data.color[ii]._id] = response.data.data.color[ii].description
      //           }

      //           for(var q=0 ; q < response.data.data.gender.length ; q++){
      //             c[response.data.data.gender[q]._id] = response.data.data.gender[q].description
      //           }

      //           for(var qq=0 ; qq < response.data.data.leather.length ; qq++){
      //             d[response.data.data.leather[qq]._id] = response.data.data.leather[qq].description
      //           }

      //           for(var w=0 ; w < response.data.data.class1.length ; w++){
      //             e[response.data.data.class1[w]._id] = response.data.data.class1[w].description
      //           }

      //           for(var ww=0 ; ww < response.data.data.class2.length ; ww++){
      //             f[response.data.data.class2[ww]._id] = response.data.data.class2[ww].description
      //           }
                
      //           for(var t=0 ; t < response.data.data.logo.length ; t++){
      //             g[response.data.data.logo[t]._id] = response.data.data.logo[t].description
      //           }

      //           for(var tt=0 ; tt < response.data.data.sublogo.length ; tt++){
      //             h[response.data.data.sublogo[tt]._id] = response.data.data.sublogo[tt].description
      //           }

      //           for(var y=0 ; y < response.data.data.lining.length ; y++){
      //             iii[response.data.data.lining[y]._id] = response.data.data.lining[y].description
      //           }

      //           for(var yy=0 ; yy < response.data.data.stitch.length ; yy++){
      //             j[response.data.data.stitch[yy]._id] = response.data.data.stitch[yy].description
      //           }

      //           createColumn();
      //           setLoading(true)
      //         }
              
           
      //     })
      //     .catch(err => {
      //         console.log(err);
      //     });
      // },[])

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
                            //         //   console.log(newData)
                            //         //  dataUpdate[index] = newData;
                            //         // setData([...dataUpdate]);
                            //         //console.log(newData.color._id)
                            //         console.log(newData._id)

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
                            //             console.log(res.data)

                            //               if(res.data.code === '00')
                            //                 setStatus(true)
                            //               else
                            //                 setStatus(false)

                            //               setMessage(res.data.message)
                            //           }).catch((error) => {
                            //             console.log(error)
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
