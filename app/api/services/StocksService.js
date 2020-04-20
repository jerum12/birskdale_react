
var model = require("../models/ExportsModel");


module.exports = {

    // Async function to get the User List
    getStocks : async function (query, page, limit, sort) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit,
            sort
        }
        // Try Catch the awaited promise to handle the error 
        try {

            const stocks = await  model.StocksModel
            .find()
            .populate(['leather_type'])
            .exec()

          

            //var stocks = await db.StocksModel.paginate(query, options).populate(['_creator'])
            stocks.forEach(function(stock) {
                stock.stock_details = 'Leather type: ' + stock.leather_type.description + '; ' +
                                'Gender: ' + stock.gender + '; ' +
                                'Color: ' + stock.color + '; ' +
                                'Classification 1: ' + stock.classification_1 + '; ' +
                                'Classification 2: ' + stock.classification_2 + '; ' +
                                'Logo: ' + stock.logo + '; ' +
                                'Sub Logo: ' + stock.sub_logo + '; ' +
                                'Stitch: ' + stock.stitch + '; ' +
                                'Lining: ' + stock.lining + '; ' +
                                'Special Instruction: ' + stock.spercial_instruction;
              });

              //console.log(stocks)

             return stocks;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)
            throw Error('Error while Paginating stocks');
        }
    },

    // Async function to get the User List
    getStocksById : async function (id) { 
        // Get the stocks
        try {

            //console.log(id + '--------param here')
            var _details = await model.StocksModel.findOne({_id: id})

          
            //console.log(_details)

            if(!_details){
                throw new Error(`Stocks NOT_FOUND, the id: ${id}`);
            }else{
                return _details
            }

        } catch (e) {
            console.log(e)
             throw new Error(`Stocks NOT_FOUND, the id: ${id}`);
        }
    },

    saveStocks : async function (paramBody){
        try {

            var leather_details = await model.LeatherTypeModel.findOne({code: paramBody.leather_type})
                                    .then(function(details){
                                    return details
                                    }).catch(function(error){
                                        throw Error(`No Leather Type for ${paramBody.leather_type}`)
                                    })

            if(!leather_details)
                throw new Error(`Stocks not save`);


            let newStocks =  new model.StocksModel({
                stock_no: paramBody.stock_no,
                leather_type: leather_details._id,
                gender : paramBody.gender,
                color : paramBody.color,
                classification_1 : paramBody.classification_1,
                classification_2 : paramBody.classification_2,
                logo : paramBody.logo,
                sub_logo : paramBody.sub_logo,
                stitch : paramBody.stitch,
                lining : paramBody.lining,
                special_instruction : paramBody.special_instruction,
                size_run_3 : paramBody.size_run_3,
                size_run_4 : paramBody.size_run_4,
                size_run_5 : paramBody.size_run_5,
                size_run_6 : paramBody.size_run_6,
                size_run_7 : paramBody.size_run_7,
                size_run_8 : paramBody.size_run_8,
                size_run_9 : paramBody.size_run_9,
                size_run_10 : paramBody.size_run_10,
                size_run_11 : paramBody.size_run_11,
                size_run_12 : paramBody.size_run_12,
                size_run_13 : paramBody.size_run_13,
                size_run_14 : paramBody.size_run_14,
                total_size_run : paramBody.total_size_run
             })


            // Saving the User 
            var savedStocks = await newStocks.save();
           
            if(!savedStocks){
                throw new error("Error while saving stocks")
            }

        } catch (e) {
            console.log(e)
             throw new Error(`Stocks not save`);
        }
    }
    
}