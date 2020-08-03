import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import { Label,Message } from 'semantic-ui-react'
import Alert from '@material-ui/lab/Alert';
import {Row, Col, Card, Form} from 'react-bootstrap';


 function ModifyStocks() {

  const [stockArray, setStockArray] = useState({})
  const [class1Array, setClass1Array] = useState({})
  const [class2Array, setClass2Array] = useState({})
  const [colorArray, setColorArray] = useState({})
  const [genderArray, setGenderArray] = useState({})
  const [leatherArray, setLeatherArray] = useState({})
  const [liningArray, setLiningArray] = useState({})
  const [logoArray, setLogoArray] = useState({})
  const [stitchArray, setStitchArray] = useState({})
  const [subLogoArray, setSubLogoArray] = useState({})

  
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTable, setReloadTable] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);
//  const getParameters = () => {
//   axios({
//     method: 'GET',
//     url: 'http://localhost:5000/api/parameter/data',
//     headers: {
//         'Content-Type': 'application/json',
//         'authorization' : sessionStorage.getItem('jwtTokenKey')
//       }
//     })
//     .then(response => {
        
//         console.log('data----------')
//         console.log(response.data)

//         if(response.data.code === '99'){
//             //setshowTimeout(true)
//             console.log('error')
//         }else{
//             inputOptions(response)
//         }
        
     
//     })
//     .catch(err => {
//         console.log(err);
//     });
//  }

 
//  const inputOptions = (response) => {
//   var a = {}

//   for(var i=0 ; i < response.data.data.stock.length ; i++){
//     a[response.data.data.stock[i].code] = response.data.data.stock[i].description
//   }

//     setstockArray(() => {
//       return a
//     });
  
//     createColumn(a);
// }

    const createColumn = () => {

      setColumns([

        {title: "id", field: "_id", hidden: true},
        { title: 'Stock Number', field: 'stock_no._id', 
          render: (rowData) => {
          return  <div>{rowData.stock_no.description}</div>;
          },  
          lookup: stockArray
        },{ title: 'Color', field: 'color._id',
            render: (rowData) => {
            return  <div>{rowData.color.description}</div>;
            },  
            lookup: colorArray
        },
        { title: 'Gender', field: 'gender._id',
            render: (rowData) => {
            return  <div>{rowData.gender.description}</div>;
            },  
            lookup: genderArray
        },
        { title: 'Leather Type', field: 'leather_type._id',
            render: (rowData) => {
            return  <div>{rowData.leather_type.description}</div>;
            },  
            lookup: leatherArray
        },
        { title: 'Classification 1', field: 'classification_1._id',
            render: (rowData) => {
            return  <div>{rowData.classification_1.description}</div>;
            },  
            lookup: class1Array
        },
        { title: 'Classification 2', field: 'classification_2._id',
            render: (rowData) => {
            return  <div>{rowData.classification_2.description}</div>;
            },  
            lookup: class2Array
        },
        { title: 'Logo', field: 'logo._id',
            render: (rowData) => {
            return  <div>{rowData.logo.description}</div>;
            },  
            lookup: logoArray
        },
        { title: 'Sub Logo', field: 'sub_logo._id',
            render: (rowData) => {
            return  <div>{rowData.sub_logo.description}</div>;
            },  
            lookup: subLogoArray
        },
        { title: 'Lining', field: 'lining._id',
            render: (rowData) => {
            return  <div>{rowData.lining.description}</div>;
            },  
            lookup: liningArray
        },
        { title: 'Stitch', field: 'stitch._id',
            render: (rowData) => {
            return  <div>{rowData.stitch.description}</div>;
            },  
            lookup: stitchArray
        },
        { title: 'Special Instruction', field: 'special_instruction'
        },
    
      ]);
    }



    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/stocks/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
              let json = response.data.data;
              setData(json)
         
          })
          .catch(err => {
              console.log(err);
              return null;
          });
          console.log('load')
          setReloadTable(false)
      }, [reloadTable])



      useEffect(() => {
        axios({
          method: 'GET',
          url: 'http://localhost:5000/api/parameter/data',
          headers: {
              'Content-Type': 'application/json',
              'authorization' : sessionStorage.getItem('jwtTokenKey')
            }
          })
          .then(response => {
              
              console.log('data----------')
              console.log(response.data)
      
              if(response.data.code === '99'){
                  //setshowTimeout(true)
                  console.log('error')
              }else{

                let a = stockArray;
                let b = colorArray;
                let c = genderArray;
                let d = leatherArray;
                let e = class1Array;
                let f = class2Array;
                let g = logoArray;
                let h = subLogoArray;
                let ii = liningArray;
                let j = stitchArray;

                for(var i=0 ; i < response.data.data.stock.length ; i++){
                  a[response.data.data.stock[i]._id] = response.data.data.stock[i].description
                }

                for(var i=0 ; i < response.data.data.color.length ; i++){
                  b[response.data.data.color[i]._id] = response.data.data.color[i].description
                }

                for(var i=0 ; i < response.data.data.gender.length ; i++){
                  c[response.data.data.gender[i]._id] = response.data.data.gender[i].description
                }

                for(var i=0 ; i < response.data.data.leather.length ; i++){
                  d[response.data.data.leather[i]._id] = response.data.data.leather[i].description
                }

                for(var i=0 ; i < response.data.data.class1.length ; i++){
                  e[response.data.data.class1[i]._id] = response.data.data.class1[i].description
                }

                for(var i=0 ; i < response.data.data.class2.length ; i++){
                  f[response.data.data.class2[i]._id] = response.data.data.class2[i].description
                }
                
                for(var i=0 ; i < response.data.data.logo.length ; i++){
                  g[response.data.data.logo[i]._id] = response.data.data.logo[i].description
                }

                for(var i=0 ; i < response.data.data.sublogo.length ; i++){
                  h[response.data.data.sublogo[i]._id] = response.data.data.sublogo[i].description
                }

                for(var i=0 ; i < response.data.data.lining.length ; i++){
                  ii[response.data.data.lining[i]._id] = response.data.data.lining[i].description
                }

                for(var i=0 ; i < response.data.data.stitch.length ; i++){
                  j[response.data.data.stitch[i]._id] = response.data.data.stitch[i].description
                }

                createColumn();
                setLoading(false)
              }
              
           
          })
          .catch(err => {
              console.log(err);
          });
      },[])

    return (
        <Aux>
             <Card>
                <Card.Header>
                    <Card.Title as="h5">Modify Stocks</Card.Title>
                </Card.Header>
                <Card.Body>  
                  { message.length > 0 ? 
                        status ?
                              <Alert variant="filled" severity="success">
                                {message}
                              </Alert>
                        :
                            <Alert variant="filled" severity="error">
                            {message}
                            </Alert>
                    :
                        ''   
                    }
                    <MaterialTable
                        isLoading={loading}
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
                        editable={{
                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              //console.log(newData.color.code)


                              setTimeout(() => {
                                //  const dataUpdate = [...data];
                                // const index = oldData.tableData.id;
                                //   console.log(newData)
                                //  dataUpdate[index] = newData;
                                // setData([...dataUpdate]);
                                //console.log(newData.color._id)
                                console.log(newData._id)

                                axios({
                                  method: 'PUT',
                                  url: 'http://localhost:5000/api/stocks/data/' + newData._id,
                                  headers: {
                                    'Content-Type': 'application/json',
                                    'authorization' : sessionStorage.getItem('jwtTokenKey')
                                  },
                                  data: newData
                                  })
                                  .then((res) => {
                                    console.log(res.data)

                                      if(res.data.code === '00')
                                        setStatus(true)
                                      else
                                        setStatus(false)

                                      setMessage(res.data.message)
                                  }).catch((error) => {
                                    console.log(error)
                                    setStatus(false)
                                    setMessage(error.message)
                                  })
                                  setReloadTable(true)
                                  resolve();
                              }, 1000)
                            })
                        }}
                      
                        // actions={[
                        //   {
                        //     icon: 'edit',
                        //     tooltip: 'Edit User',
                        //     onClick: (event, rowData) => {
                        //       getParameters();
                        //       alert('You are editing ' + rowData.nam)
                        //     }
                        //   }
                        // ]}
                    />
                </Card.Body>
              </Card> 
                  

        </Aux>
    )
  }

  export default ModifyStocks;
