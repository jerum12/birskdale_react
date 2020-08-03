// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// var Schema = mongoose.Schema;

// const usersSchema = new Schema({
//     full_name : {type: String, trim:true, required: true},
//     user_name : {type: String, trim:true, required: true},
//     password : {type: String, trim:true, default:''},
//     role : {type: String, trim:true, default:''},
//     date_created : {type: Date, default: Date.now}
//   }, {collection : 'tbl_users'});


// // hash user password before saving into database
// usersSchema.pre('save', function(next){
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     next();
// });

// module.exports = mongoose.model('Users', usersSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./../../config/Config')

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	full_name: {
		type: String,
    trim: true,
    required: true
	},
	user_name: {
		type: String,
		trim: true,
    required: true
	},
	password: {
		type: String,
		trim: true,
    required: true,
    minlength: 6
  },
  date_created : {
    type : Date,
    default : new Date()
  },
  isAdmin: {
    type: Boolean
  }
},{collection : 'tbl_users'});

UserSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, config.saltRounds);
  next();
});

module.exports = mongoose.model('User', UserSchema);