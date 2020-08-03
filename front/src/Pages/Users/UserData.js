import React from 'react'
import Grid from "@material-ui/core/Grid"

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Pic from '../../assets/images/dp2.png'

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
const UserData = ({item : {
    date_created,
    full_name,
    user_name
}}) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={4}>
            <Card  className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={Pic}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {full_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Username: {user_name}
                        <br/>
                        Date Created : {date_created}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
                </Grid>
    )
}

export default UserData