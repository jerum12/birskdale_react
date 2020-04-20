const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const classification2ModelSchema = new Schema({
    code : {type: String, required: true,  trim:true},
    description : {type: String, required: true,  trim:true}
  }, {collection : 'tbl_param_classification_2'});
  

  classification2ModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('Classification2Model', classification2ModelSchema);