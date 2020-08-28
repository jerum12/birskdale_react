const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const colorModelSchema = new Schema({
    transaction_date : {type: Date, default: Date.now},
    code : {type: String, required: true,  trim:true, uppercase: true},
    description : {type: String, required: true,  trim:true, uppercase: true}
  }, {collection : 'tbl_param_color'});
  

  colorModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('ColorModel', colorModelSchema);