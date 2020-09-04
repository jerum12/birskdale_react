
var model = require("../models/ExportsModel");


module.exports = {

    // Async function to get the User List
    getStocksHistory : async function (query, page, limit, sort) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit,
            sort
        }


        // Try Catch the awaited promise to handle the error 
        try {
          
            let date_less_7 = new Date();
            date_less_7.setDate(date_less_7.getDate() - 7)
            let date_today = new Date();

            let date_from = query.date_from !== undefined ? query.date_from : date_less_7;
            let date_to = query.date_from !== undefined ? query.date_to : date_today;

            //console.log(query.date_from)
            //console.log(query.date_to)

            var _details = await model.StocksHistoryModel.find({
                                        'transaction_date' : {
                                            "$gte": new Date(new Date(date_from).setHours(00, 00, 00)),
                                            "$lte": new Date(new Date(date_to).setHours(23, 59, 59))
                                        }
                                      })
                                      .populate('transaction_by','full_name')
                                      .populate({
                                          path : 'stocks_id',
                                          populate : {
                                              path : 'stock_no'
                                          }
                                      })
                                      .populate({
                                          path : 'stocks_id',
                                          populate : {
                                            path : 'color'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                          path : 'gender'
                                        },
                                      })
                                     .populate({
                                            path : 'stocks_id',
                                            populate : {
                                            path : 'leather_type'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'classification_1'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'classification_2'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'logo'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'sub_logo'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'lining'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'stitch'
                                        },
                                      })
                                      .exec()

          

            //var stocks = await db.StocksModel.paginate(query, options).populate(['_creator'])
            // stocks.forEach(function(stock) {
            //     stock.stock_details = 'LT: ' + stock.leather_type.description + '; ' +
            //                     'G: ' + stock.gender.description + '; ' +
            //                     'C: ' + stock.color.description + '; ' +
            //                     'C1: ' + stock.classification_1.description + '; ' +
            //                     'C2: ' + stock.classification_2.description + '; ' +
            //                     'Lo: ' + stock.logo.description + '; ' +
            //                     'SLo: ' + stock.sub_logo.description + '; ' +
            //                     'S: ' + stock.stitch.description + '; ' +
            //                     'Li: ' + stock.lining.description + '; ' +
            //                     'SI: ' + stock.special_instruction;
            //   });

              ////console.log(stocks)

             return _details;
        } catch (e) {
            // return a Error message describing the reason 
            //console.log(e)
            throw Error('Error while Paginating stocks');
        }
    },

    // Async function to get the User List
    getStocksHistoryById : async function (id) { 
        // Get the stocks
        try {

            ////console.log(id + '--------param here')
            // var _details = await model.StocksHistoryModel.find()
            //                           .where('stocks_id')
            //                           .equals(id)
            //                           .populate('stocks_id')
            //                           .exec()

             var _details = await model.StocksHistoryModel.find()
                                      .where('stocks_id')
                                      .equals(id)
                                      .populate('transaction_by','full_name')
                                      .populate({
                                          path : 'stocks_id',
                                          populate : {
                                              path : 'stock_no'
                                          }
                                      })
                                      .populate({
                                          path : 'stocks_id',
                                          populate : {
                                            path : 'color'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                          path : 'gender'
                                        },
                                      })
                                     .populate({
                                            path : 'stocks_id',
                                            populate : {
                                            path : 'leather_type'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'classification_1'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'classification_2'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'logo'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'sub_logo'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'lining'
                                        },
                                      })
                                      .populate({
                                        path : 'stocks_id',
                                        populate : {
                                            path : 'stitch'
                                        },
                                      })
                                      .exec()

            ////console.log(_details)

            if(!_details){
                throw new Error(`Stocks History not found on the id: ${id}`);
            }else{
                return _details
            }

        } catch (e) {
            //console.log(e)
             throw new Error(`Stocks NOT_FOUND, the id: ${id}`);
        }
    },

    saveStocksHistory : async function (paramBody){
        try {

             
            const doesStocksExist = await model.StocksModel.exists({ 
                _id: paramBody.stocks_id
            });
    
            if(!doesStocksExist){
                //console.log('existing----------------')
                throw Error("Stocks are not available")
            }

            let total = 
            paramBody.size_run_2 + paramBody.size_run_2_5 + 
            paramBody.size_run_3 + paramBody.size_run_3_5 + 
            paramBody.size_run_4 + paramBody.size_run_4_5 +
            paramBody.size_run_5 + paramBody.size_run_5_5 +
            paramBody.size_run_6 + paramBody.size_run_6_5 +
            paramBody.size_run_7 + paramBody.size_run_7_5 +
            paramBody.size_run_8 + paramBody.size_run_8_5 +
            paramBody.size_run_9 + paramBody.size_run_9_5 +
            paramBody.size_run_10 + paramBody.size_run_10_5 +
            paramBody.size_run_11 + paramBody.size_run_11_5 +
            paramBody.size_run_12 + paramBody.size_run_13

            
            let newStocksHist =  new model.StocksHistoryModel({
                stocks_id: paramBody.stocks_id,
                size_run_2 : paramBody.size_run_2,
                size_run_2_5 : paramBody.size_run_2_5,
                size_run_3 : paramBody.size_run_3,
                size_run_3_5 : paramBody.size_run_3_5,
                size_run_4 : paramBody.size_run_4,
                size_run_4_5 : paramBody.size_run_4_5,
                size_run_5 : paramBody.size_run_5,
                size_run_5_5 : paramBody.size_run_5_5,
                size_run_6 : paramBody.size_run_6,
                size_run_6_5 : paramBody.size_run_6_5,
                size_run_7 : paramBody.size_run_7,
                size_run_7_5 : paramBody.size_run_7_5,
                size_run_8 : paramBody.size_run_8,
                size_run_8_5 : paramBody.size_run_8_5,
                size_run_9 : paramBody.size_run_9,
                size_run_9_5 : paramBody.size_run_9_5,
                size_run_10 : paramBody.size_run_10,
                size_run_10_5 : paramBody.size_run_10_5,
                size_run_11 : paramBody.size_run_11,
                size_run_11_5 : paramBody.size_run_11_5,
                size_run_12 : paramBody.size_run_12,
                size_run_13 : paramBody.size_run_13,
                total : total,
                transaction_by : paramBody.transaction_by
            })
            
            ////console.log(newStocksHist)
            // Saving the history 
            // var savedStocks = await newStocksHist.save();
           
            // if(!savedStocks){
            //     throw Error("Failed to size run!")
            // }

            var savedStocks = await newStocksHist.save().then(function(savedData){
                return true
            }).catch(function(err){
                console.log(err)
                throw Error(`Failed to save size run!`)
                //throw new Error(err.message);
            });

            let total_size_run = 
            paramBody.size_run_2_new + paramBody.size_run_2_5_new + 
            paramBody.size_run_3_new + paramBody.size_run_3_5_new + 
            paramBody.size_run_4_new + paramBody.size_run_4_5_new + 
            paramBody.size_run_5_new + paramBody.size_run_5_5_new + 
            paramBody.size_run_6_new + paramBody.size_run_6_5_new + 
            paramBody.size_run_7_new + paramBody.size_run_7_5_new + 
            paramBody.size_run_8_new + paramBody.size_run_8_5_new + 
            paramBody.size_run_9_new + paramBody.size_run_9_5_new + 
            paramBody.size_run_10_new + paramBody.size_run_10_5_new + 
            paramBody.size_run_11_new + paramBody.size_run_11_5_new + 
            paramBody.size_run_12_new + paramBody.size_run_13_new

            let updateStocksSizeRun =  new model.StocksModel({
                _id : paramBody.stocks_id,
                size_run_2 : paramBody.size_run_2_new,
                size_run_2_5 : paramBody.size_run_2_5_new,
                size_run_3 : paramBody.size_run_3_new,
                size_run_3_5 : paramBody.size_run_3_5_new,
                size_run_4 : paramBody.size_run_4_new,
                size_run_4_5 : paramBody.size_run_4_5_new,
                size_run_5 : paramBody.size_run_5_new,
                size_run_5_5 : paramBody.size_run_5_5_new,
                size_run_6 : paramBody.size_run_6_new,
                size_run_6_5 : paramBody.size_run_6_5_new,
                size_run_7 : paramBody.size_run_7_new,
                size_run_7_5 : paramBody.size_run_7_5_new,
                size_run_8 : paramBody.size_run_8_new,
                size_run_8_5 : paramBody.size_run_8_5_new,
                size_run_9 : paramBody.size_run_9_new,
                size_run_9_5 : paramBody.size_run_9_5_new,
                size_run_10 : paramBody.size_run_10_new,
                size_run_10_5 : paramBody.size_run_10_5_new,
                size_run_11 : paramBody.size_run_11_new,
                size_run_11_5 : paramBody.size_run_11_5_new,
                size_run_12 : paramBody.size_run_12_new,
                size_run_13 : paramBody.size_run_13_new,
                total_size_run : total_size_run
            })
            ////console.log(updateStocksSizeRun)

            await model.StocksModel.findByIdAndUpdate(paramBody.stocks_id,updateStocksSizeRun)
            .then(function(details){
                    return details
            }).catch(function(error){
                //console.log(error)
                throw Error(`No Stock Number for ${paramBody.stocks_id}`)
            })
            

        } catch (e) {
            //console.log(e)
            throw Error(e);
        }
    },

    updateStocksHistory : async function (paramID,paramBody){
        try {
            // //console.log(paramID);
            // //console.log(paramBody);

            const doesStocksExist = await model.StocksHistoryModel.exists({ 
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

            //console.log(doesStocksExist)

            if(doesStocksExist){
                //console.log('existing----------------')
                throw Error("Stocks already existing.")
            }

             await model.StocksModel.findByIdAndUpdate(paramID.id,paramBody)
                            .then(function(details){
                                 return details
                            }).catch(function(error){
                                //console.log(error)
                                throw Error(`No Stock Number for ${paramID.id}`)
                            })
            

        } catch (e) {
            //console.log(e)
             throw Error(e);
        }
    }
    
}