import React,{useState, useEffect} from "react";
import MaterialTable from "material-table";
import axios from 'axios';
import Aux from "../../hoc/_Aux";
import Grid from "@material-ui/core/Grid"
import {handleResponse} from '../Stocks/GenericMethod'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Pic from '../../assets/images/dp2.png'
import UserData from './UserData'

function InquireUsers(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
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
      {title: 'Password', field: 'password'},
      
    ]);
  
    const [data, setData] = useState([]); //table data
    const [loading, setLoading] = useState(false)
    
    const classes = useStyles();

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://192.168.0.27:5000/api/users/data',
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

              <Grid container spacing={2}>

                {data.map(item => {
                      return  <UserData item={item}/>
                    })
                }            
                
              </Grid>
                
                :
                  ''
              }
            

        </Aux>
    )
  }

  export default InquireUsers;
