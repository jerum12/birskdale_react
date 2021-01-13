
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
            .populate(['sock_liner'])
            .populate(['canvass'])
            .populate(['midsole'])
            .populate(['outsole'])
            .exec()

            //var stocks = await db.StocksModel.paginate(query, options).populate(['_creator'])
            stocks.forEach(function(stock) {
                var stock_details_value = "";

                if(stock.gender.description != '' && stock.gender.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">G</span>: ' + stock.gender.description + '; '
                }

                if(stock.leather_type.description != '' && stock.leather_type.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">LT</span>: ' + stock.leather_type.description + '; '
                }

                if(stock.color.description != '' && stock.color.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">C</span>: ' + stock.color.description + '; '
                }

                if(stock.classification_1.description != '' && stock.classification_1.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">C1</span>: ' + stock.classification_1.description  + '; '
                }

                if(stock.classification_2.description != '' && stock.classification_2.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">C2</span>: ' + stock.classification_2.description + '; '
                }

                if(stock.logo.description != '' && stock.logo.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">Lo</span>: ' + stock.logo.description + '; '
                }

                if(stock.sub_logo.description != '' && stock.sub_logo.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">SLo</span>: ' + stock.sub_logo.description + '; '
                }

                if(stock.stitch.description != '' && stock.stitch.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">S</span>: ' + stock.stitch.description + '; '
                }

                if(stock.lining.description != '' && stock.lining.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">Li</span>: ' + stock.lining.description + '; '
                }

                if(stock.canvass.description != '' && stock.canvass.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">Cv</span>: ' + stock.canvass.description + '; '
                }

                if(stock.midsole.description != '' && stock.midsole.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">Ms</span>: ' + stock.midsole.description + '; '
                }

                if(stock.outsole.description != '' && stock.outsole.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">Os</span>: ' + stock.outsole.description + '; '
                }

                if(stock.sock_liner.description != '' && stock.sock_liner.description != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">SLi</span>: ' + stock.sock_liner.description + '; '
                }

                if(stock.special_instruction != '' && stock.special_instruction != 'NOT AVAILABLE'){
                    stock_details_value +=  '<span style="color:red">SI</span>: ' + stock.special_instruction + '; '
                }

                stock.stock_details = stock_details_value;
                // stock.stock_details = 'LT: ' + stock.leather_type.description + '; ' +
                //                 'G: ' + stock.gender.description + '; ' +
                //                 'C: ' + stock.color.description + '; ' +
                //                 'C1: ' + stock.classification_1.description + '; ' +
                //                 'C2: ' + stock.classification_2.description + '; ' +
                //                 'Lo: ' + stock.logo.description + '; ' +
                //                 'SLo: ' + stock.sub_logo.description + '; ' +
                //                 'S: ' + stock.stitch.description + '; ' +
                //                 'Li: ' + stock.lining.description + '; ' +
                //                 'SLi: ' + stock.sock_liner.description + '; ' +
                //                 'Cv: ' + stock.canvass.description + '; ' +
                //                 'Ms: ' + stock.midsole.description + '; ' +
                //                 'Os: ' + stock.outsole.description + '; ' +
                //                 'SI: ' + stock.special_instruction;
              });

              ////console.log(stocks)

             return stocks;
        } catch (e) {
            // return a Error message describing the reason 
            //console.log(e)
            throw Error('Error while Paginating stocks');
        }
    },

    // Async function to get the User List
    getStocksById : async function (id) { 
        // Get the stocks
        try {

            ////console.log(id + '--------param here')
            var _details = await model.StocksModel.findOne({_id: id})

          
            ////console.log(_details)

            if(!_details){
                throw new Error(`Stocks NOT_FOUND, the id: ${id}`);
            }else{
                return _details
            }

        } catch (e) {
            //console.log(e)
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
                sock_liner: paramBody.sock_liner,
                canvass: paramBody.canvass,
                midsole: paramBody.midsole,
                outsole: paramBody.outsole,
                special_instruction: paramBody.special_instruction,
            });

            //console.log(doesStocksExist)

            if(doesStocksExist){
                //console.log('existing----------------')
                throw Error("Stocks already existing.")
            }
            let total_size_run = 
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
                sock_liner : paramBody.sock_liner,
                canvass : paramBody.canvass,
                midsole : paramBody.midsole,
                outsole : paramBody.outsole,
                special_instruction : paramBody.special_instruction,
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
                size_run_14 : paramBody.size_run_14,
                total_size_run : total_size_run
            })

            //console.log(newStocks)
            // Saving the User 
            var savedStocks = await newStocks.save();
           
            if(!savedStocks){
                throw Error("Failed to save stocks!")
            }

        } catch (e) {
            //console.log(e)
            throw Error(e);
        }
    },

    updateStocks : async function (paramID,paramBody){
        try {
            // //console.log(paramID);
            // //console.log(paramBody);

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
                sock_liner: paramBody.sock_liner,
                canvass: paramBody.canvass,
                midsole: paramBody.midsole,
                outsole: paramBody.outsole,
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
    },
    // Async function to get the User List
    getReports : async function (query, page, limit, sort) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit,
            sort
        }
        // Try Catch the awaited promise to handle the error 
        try {

            let date_less_7 = new Date();
            date_less_7.setDate(date_less_7.getDate() - 30)
            let date_today = new Date();

            let date_from = query.date_from !== undefined ? query.date_from : date_less_7;
            let date_to = query.date_from !== undefined ? query.date_to : date_today;

            const stocks = await  model.StocksModel
            .find({
                'transaction_date' : {
                    "$gte": new Date(new Date(date_from).setHours(00, 00, 00)),
                    "$lte": new Date(new Date(date_to).setHours(23, 59, 59))
                }
              })
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
            .populate(['sock_liner'])
            .populate(['canvass'])
            .populate(['midsole'])
            .populate(['outsole'])
            .exec()

            
            //   const stocks =  await  model.StocksModel.aggregate([
            //         {$group: {
            //                 _id : "$gender",
            //                 total: {$sum:1},
            //                 items: {
            //                     $push: '$$ROOT'
            //                   },
            //                 //"$lookup": {from: 'tbl_param_color', localField: '_id', foreignField: '$items.color._id', as: 'd1'} ,
            //             }
            //         },
            //     { "$lookup": {from: 'tbl_param_gender', localField: '_id', foreignField: '_id', as: 'descs'} },
               
            // ]).exec();  

            // const stocks = await model.StocksModel.aggregate([
            //     { 
            //         "$project" : {
            //             "items" : "$$ROOT"
            //         }
            //     },
            //     { 
            //         "$lookup" : {
            //             "localField" : "items.gender", 
            //             "from" : "tbl_param_gender", 
            //             "foreignField" : "_id", 
            //             "as" : "g"
            //         }
            //     }, 
            //     { 
            //         "$unwind" : {
            //             "path" : "$g", 
            //             "preserveNullAndEmptyArrays" : false
            //         }
            //     },
            //     { 
            //         "$lookup" : {
            //             "localField" : "items.color", 
            //             "from" : "tbl_param_color", 
            //             "foreignField" : "_id", 
            //             "as" : "c"
            //         }
            //     }, 
            //     { 
            //         "$unwind" : {
            //             "path" : "$c", 
            //             "preserveNullAndEmptyArrays" : false
            //         }
            //     }, 
            //     { 
            //         "$group" : {
            //             "_id" : {
            //                 "id" : "$g._id",
            //                 "desc" : "$g.description",
            //             }, 
            //             "sums" : {
            //                 "$sum" : {$sum:1}
            //             },
                        
            //         }
            //     },{ 
            //         "$project" : {
            //             "leather" : "$_id.desc",
            //             "test" : "$c.description",
            //             "sum12" : "$sums"
            //         }
            //     }
            //   ]).exec()

            // const stocks =  await  model.StocksModel.aggregate([
            //     {"$group" : {"_id" : "$gender","data" : "$$ROOT"}},
            //             {"$project" : {
            //                 "tags" : "$data",
            //                 "name" : "$data.name",
            //                 "rating" : "$data.rating",
            //                 "_id" : "$data._id"
            //                 }
            //             }
            //   ])
                //console.log(stocks)

                stocks.forEach(function(stock) {
                        var stock_details_value = "";

                    if(stock.gender.description != '' && stock.gender.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">G</span>: ' + stock.gender.description;
                    }

                    if(stock.leather_type.description != '' && stock.leather_type.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">LT</span>: ' + stock.leather_type.description
                    }

                    if(stock.color.description != '' && stock.color.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">C</span>: ' + stock.color.description
                    }

                    if(stock.classification_1.description != '' && stock.classification_1.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">C1</span>: ' + stock.classification_1.description
                    }

                    if(stock.classification_2.description != '' && stock.classification_2.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">C2</span>: ' + stock.classification_2.description
                    }

                    if(stock.logo.description != '' && stock.logo.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">Lo</span>: ' + stock.logo.description
                    }

                    if(stock.sub_logo.description != '' && stock.sub_logo.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">SLo</span>: ' + stock.sub_logo.description
                    }

                    if(stock.stitch.description != '' && stock.stitch.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">S</span>: ' + stock.stitch.description
                    }

                    if(stock.lining.description != '' && stock.lining.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">Li</span>: ' + stock.lining.description
                    }

                    if(stock.canvass.description != '' && stock.canvass.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">Cv</span>: ' + stock.canvass.description
                    }

                    if(stock.midsole.description != '' && stock.midsole.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">Ms</span>: ' + stock.midsole.description
                    }

                    if(stock.outsole.description != '' && stock.outsole.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">Os</span>: ' + stock.outsole.description
                    }

                    if(stock.sock_liner.description != '' && stock.sock_liner.description != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">SLi</span>: ' + stock.sock_liner.description
                    }

                    if(stock.special_instruction != '' && stock.special_instruction != 'NOT AVAILABLE'){
                        stock_details_value +=  '<span style="color:red;font-weight:bold">SI</span>: ' + stock.special_instruction
                    }
            

                    stock.stock_details = stock_details_value;

                  });

              ////console.log(stocks)

             return stocks;
        } catch (e) {
            // return a Error message describing the reason 
            //console.log(e)
            throw Error('Error while Paginating stocks');
        }
    }
    
}