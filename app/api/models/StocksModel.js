const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const stocksSchema = new Schema({
    stock_no : { type: Schema.Types.ObjectId, required: true, ref: 'StockModel' },
    transaction_date : {type: Date, default: Date.now},
    stock_details : {type: String},
    leather_type :  { type: Schema.Types.ObjectId, required: true, ref: 'LeatherTypeModel' },
    gender : { type: Schema.Types.ObjectId, required: true, ref: 'GenderModel' },
    color : { type: Schema.Types.ObjectId, required: true, ref: 'ColorModel' },
    classification_1 : { type: Schema.Types.ObjectId, required: true, ref: 'Classification1Model' },
    classification_2 :  { type: Schema.Types.ObjectId, required: true, ref: 'Classification2Model' },
    logo : { type: Schema.Types.ObjectId, required: true, ref: 'LogoModel' },
    sub_logo : { type: Schema.Types.ObjectId, required: true, ref: 'SubLogoModel' },
    stitch :{ type: Schema.Types.ObjectId, required: true, ref: 'StitchModel' },
    lining : { type: Schema.Types.ObjectId, required: true, ref: 'LiningModel' },
    sock_liner : { type: Schema.Types.ObjectId, required: true, ref: 'SockLinerModel' },
    canvass : { type: Schema.Types.ObjectId, required: true, ref: 'CanvassModel' },
    midsole : { type: Schema.Types.ObjectId, required: true, ref: 'MidsoleModel' },
    outsole : { type: Schema.Types.ObjectId, required: true, ref: 'OutsoleModel' },
    special_instruction : {type: String, trim:true, uppercase: true, default:''},
    size_run_2 : { type: Number, default: 0 },
    size_run_2_5 : { type: Number, default: 0 },
    size_run_3 : { type: Number, default: 0 },
    size_run_3_5 : { type: Number, default: 0 },
    size_run_4 : { type: Number, default: 0 },
    size_run_4_5 : { type: Number, default: 0 },
    size_run_5 : { type: Number, default: 0 },
    size_run_5_5 : { type: Number, default: 0 },
    size_run_6 : { type: Number, default: 0 },
    size_run_6_5 : { type: Number, default: 0 },
    size_run_7 : { type: Number, default: 0 },
    size_run_7_5 : { type: Number, default: 0 },
    size_run_8 : { type: Number, default: 0 },
    size_run_8_5 : { type: Number, default: 0 },
    size_run_9 : { type: Number, default: 0 },
    size_run_9_5 : { type: Number, default: 0 },
    size_run_10 : { type: Number, default: 0 },
    size_run_10_5 : { type: Number, default: 0 },
    size_run_11 : { type: Number, default: 0 },
    size_run_11_5 : { type: Number, default: 0 },
    size_run_12 : { type: Number, default: 0 },
    size_run_13 : { type: Number, default: 0 },
    total_size_run : { type: Number, default: 0 }
  }, {collection : 'tbl_stocks'});
  

  stocksSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('StocksModel', stocksSchema);