const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const stockModelSchema = new Schema({
    code : {type: String, required: true,  trim:true},
    description : {type: String, required: true,  trim:true}
  }, {collection : 'tbl_param_stocks'});
  

  stockModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('StockModel', stockModelSchema);