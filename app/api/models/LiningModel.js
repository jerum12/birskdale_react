const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const liningModelSchema = new Schema({
    transaction_date : {type: Date, default: Date.now},
    code : {type: String, required: true,  trim:true},
    description : {type: String, required: true,  trim:true}
  }, {collection : 'tbl_param_lining'});
  

  liningModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('LiningModel', liningModelSchema);