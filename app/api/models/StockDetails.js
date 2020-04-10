const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const stockDetailsSchema = new Schema({
    leather_type : {type: String},
    gender : {type: String},
    color : {type: String},
    classification_1 : {type: String},
    classification_2 :  {type: String},
    logo : {type: String},
    sub_logo : {type: String},
    stitch : {type: String},
    lining : {type: String},
    spercial_instruction : {type: String}
});

  module.exports = StockDetails = mongoose.model('stockDetails', stockDetailsSchema);