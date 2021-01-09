const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

const subLogoModelSchema = new Schema({
    transaction_date : {type: Date, default: Date.now},
    code : {type: String, required: true,  trim:true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 }
      }
    },
    description : {type: String, required: true,  trim:true,
      index: {
        unique: true,
        collation: { locale: 'en', strength: 2 }
      }
    }
  }, {collection : 'tbl_param_sub_logo'});
  

  subLogoModelSchema.plugin(mongoosePaginate)

  module.exports = mongoose.model('SubLogoModel', subLogoModelSchema);