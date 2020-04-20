const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const genderModelSchema = new Schema({
    code : {type: String, required: true,  trim:true},
    description : {type: String, required: true,  trim:true}
  }, {collection : 'tbl_param_gender'});
  

  genderModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('GenderModel', genderModelSchema);