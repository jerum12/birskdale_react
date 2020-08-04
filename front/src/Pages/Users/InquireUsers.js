import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {Card} from 'react-bootstrap';
import {handleResponse} from '../Stocks/GenericMethod'
import { makeStyles } from '@material-ui/core/styles';



function InquireUsers(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
        },
        secondaryHeading: {
          fontSize: theme.typography.pxToRem(15),
          color: theme.palette.text.secondary,
        },
      }));

    const [columns, setColumns] = useState([
      {title: "id", field: "_id", hidden: true},
      {title: "Date Created", field: "date_created", type: 'datetime'},
      {title: 'Full Name', field: 'full_name'},
      {title: 'User Name', field: 'user_name'},
      
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false)
    
    const classes = useStyles();

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/users/data',
            headers: {
                'Content-Type': 'application/json',
                'authorization' : sessionStorage.getItem('jwtTokenKey')
              }
            })
          .then(response => {
              console.log(response)
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
                      <Card.Title as="h5">Inquire Users</Card.Title>
                    </Card.Header>
                    <Card.Body>
 
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                        <MaterialTable
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
                                                
                                                />   
                            </Grid>
                         
                        </Grid>
                        

                    </Card.Body>
                  </Card>
                 
                :
                  ''
              }
            

        </Aux>
    )
  }

  export default InquireUsers;
