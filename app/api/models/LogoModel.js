const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const logoModelSchema = new Schema({
    code : {type: String, required: true,  trim:true},
    description : {type: String, required: true,  trim:true}
  }, {collection : 'tbl_param_logo'});
  

  logoModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('LogoModel', logoModelSchema);