const InitiateMongoServer  = require('./app/config/Database'); //database configuration
const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const app = express();

const PORT = process.env.PORT || 5000;

//Initiate Mongo Server
InitiateMongoServer();

//For Route
const stocksRoute2 = require('./app/api/routes/StocksRoute')
const stocksRoute = require('./app/api/routes/Stocks')
const moviesRoute = require('./app/api/routes/Movies') ;
const usersRoute = require('./app/api/routes/Users');
//FOR MODELS
// const Stocks = require('./models/Stocks')
// const Users = require('./models/Users')


app.use(logger('dev'));
app.use(cors())
//app.set('secretKey', 'nodeRestApi'); // jwt secret token



app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//import routes for stocks
//PUBLIC ROUTE
app.use('/api/stocks', stocksRoute)
app.use('/api/users', usersRoute);


// private route
app.use('/api/movies', moviesRoute);


// function validateUser(req, res, next) {
//   jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
//     if (err) {
//       res.json({status:"error", message: err.message, data:null});
//     }else{
//       // add user id to request
//       req.body.userId = decoded.id;
//       next();
//     }
//   });
  
// }


// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Request API Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something went wrong :( !!!"});

});


app.listen(PORT, () => `Server running on port ${PORT}`);