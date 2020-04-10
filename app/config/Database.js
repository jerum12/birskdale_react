
//Set up mongoose connection
console.log('in db config');
const config = require('./Config')
const mongoose = require('mongoose');
const dbUrl = config.DATABASE

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true , 
      useNewUrlParser: true
    });
     console.log('Database connected:', dbUrl)
  } catch (e) {
    console.log(e);
    console.error('connection error:', dbUrl)
    throw e;
  }
};



// mongoose.connect(dbUrl, { useUnifiedTopology: true , useNewUrlParser: true })
// mongoose.Promise = global.Promise

// //DB CONNECTION
// const dbConnection = mongoose.connection
// dbConnection.once('open', _ => {
//   console.log('Database connected:', dbUrl)
// })

// dbConnection.on('error', err => {
//   console.error('connection error:', dbUrl)
// })


module.exports = InitiateMongoServer;