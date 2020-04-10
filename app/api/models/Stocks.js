const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const stocksSchema = new Schema({
    stock_no : {type: String, required: true},
    transaction_date : {type: Date, default: Date.now},
    stock_details : {type: String, trim:true, default:''},
    leather_type : {type: String, trim:true, default:''},
    gender : {type: String, trim:true, default:''},
    color : {type: String, trim:true, default:''},
    classification_1 : {type: String, trim:true}, default:'',
    classification_2 :  {type: String, trim:true, default:''},
    logo : {type: String, trim:true, default:''},
    sub_logo : {type: String, trim:true, default:''},
    stitch : {type: String, trim:true, default:''},
    lining : {type: String, trim:true, default:''},
    spercial_instruction : {type: String, trim:true, default:''},
    size_run_3 : { type: Number, default: 0 },
    size_run_4 : { type: Number, default: 0 },
    size_run_5 : { type: Number, default: 0 },
    size_run_6 : { type: Number, default: 0 },
    size_run_7 : { type: Number, default: 0 },
    size_run_8 : { type: Number, default: 0 },
    size_run_9 : { type: Number, default: 0 },
    size_run_10 : { type: Number, default: 0 },
    size_run_11 : { type: Number, default: 0 },
    size_run_12 : { type: Number, default: 0 },
    size_run_13 : { type: Number, default: 0 },
    size_run_14 : { type: Number, default: 0 },
    total_size_run : { type: Number, default: 0 }
  }, {collection : 'tbl_stocks'});
  

  stocksSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('Stocks', stocksSchema);