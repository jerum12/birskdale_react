const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const stocksHistorySchema = new Schema({
    
    transaction_date : {type: Date, default: Date.now},
    transaction_by :  { type: Schema.Types.ObjectId, required: true, ref: 'UsersModel' },
    stocks_id :  { type: Schema.Types.ObjectId, required: true, ref: 'StocksModel' },
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
    total : { type: Number, default: 0 }
  }, {collection : 'tbl_stocks_history'});
  

  stocksHistorySchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('StocksHistoryModel', stocksHistorySchema);