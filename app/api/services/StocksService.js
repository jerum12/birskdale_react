
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
            .sort({transaction_date: -1})
            .populate(['stock_no'])
            .populate(['leather_type'])
            .populate(['gender'])
            .populate(['color'])
            .populate(['classification_1'])
            .populate(['classification_2'])
            .populate(['logo'])
            .populate(['sub_logo'])
            .populate(['lining'])
            .populate(['stitch'])
            .exec()

          

            //var stocks = await db.StocksModel.paginate(query, options).populate(['_creator'])
            stocks.forEach(function(stock) {
                stock.stock_details = 'LT: ' + stock.leather_type.description + '; ' +
                                'G: ' + stock.gender.description + '; ' +
                                'C: ' + stock.color.description + '; ' +
                                'C1: ' + stock.classification_1.description + '; ' +
                                'C2: ' + stock.classification_2.description + '; ' +
                                'Lo: ' + stock.logo.description + '; ' +
                                'SLo: ' + stock.sub_logo.description + '; ' +
                                'S: ' + stock.stitch.description + '; ' +
                                'Li: ' + stock.lining.description + '; ' +
                                'SI: ' + stock.special_instruction;
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

            const doesStocksExist = await model.StocksModel.exists({ 
                stock_no: paramBody.stock_no,
                color: paramBody.color,
                gender: paramBody.gender,
                leather_type: paramBody.leather_type,
                classification_1: paramBody.classification_1,
                classification_2: paramBody.classification_2,
                logo: paramBody.logo,
                sub_logo: paramBody.sub_logo,
                lining: paramBody.lining,
                stitch: paramBody.stitch,
                special_instruction: paramBody.special_instruction,
            });

            console.log(doesStocksExist)

            if(doesStocksExist){
                console.log('existing----------------')
                throw Error("Stocks already existing.")
            }
            let total_size_run = 
            paramBody.size_run_3 + paramBody.size_run_4 + 
            paramBody.size_run_5 + paramBody.size_run_6 + 
            paramBody.size_run_7 + paramBody.size_run_8 +
            paramBody.size_run_9 + paramBody.size_run_10 +
            paramBody.size_run_11 + paramBody.size_run_12 +
            paramBody.size_run_13 + paramBody.size_run_14;

            
            let newStocks =  new model.StocksModel({
                stock_no: paramBody.stock_no,
                leather_type: paramBody.leather_type,
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
                total_size_run : total_size_run
            })


            // Saving the User 
            var savedStocks = await newStocks.save();
           
            if(!savedStocks){
                throw Error("Failed to save stocks!")
            }

        } catch (e) {
            console.log(e)
            throw Error(e);
        }
    },

    updateStocks : async function (paramID,paramBody){
        try {
            // console.log(paramID);
            // console.log(paramBody);

            const doesStocksExist = await model.StocksModel.exists({ 
                stock_no: paramBody.stock_no,
                color: paramBody.color,
                gender: paramBody.gender,
                leather_type: paramBody.leather_type,
                classification_1: paramBody.classification_1,
                classification_2: paramBody.classification_2,
                logo: paramBody.logo,
                sub_logo: paramBody.sub_logo,
                lining: paramBody.lining,
                stitch: paramBody.stitch,
                special_instruction: paramBody.special_instruction,
            });

            console.log(doesStocksExist)

            if(doesStocksExist){
                console.log('existing----------------')
                throw Error("Stocks already existing.")
            }

             await model.StocksModel.findByIdAndUpdate(paramID.id,paramBody)
                                    .then(function(details){
                                            return details
                                    }).catch(function(error){
                                        console.log(error)
                                        throw Error(`No Stock Number for ${paramID.id}`)
                                    })
            

        } catch (e) {
            console.log(e)
             throw Error(e);
        }
    }
    
}