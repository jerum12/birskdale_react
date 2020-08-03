
const StocksService = require('./../services/StocksService')

module.exports = {

	getAll:  async function(req, res, next) {

        // Check the existence of the query parameters, If doesn't exists assign a default value
        let sort_by = req.query.sort_by
        let sort_type = req.query.sort_type
        
        console.log("get All Stocks ------------")
        let sortOptions = {
            [sort_by] : sort_type
        }

        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = sortOptions

        try {
            var Stocks = await StocksService.getStocks({}, page, parseInt(limit), sort)
            // Return the Users list with the appropriate HTTP password Code and Message.
            return res.status(200).json({code: "00", status: "success", data: Stocks, message: "Stocks successfully recieved!"});
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            // return res.status(400).json({
            //         status: "failed", code: "99", message: e.message , data: null
            //     });
            return res.json({
                status: "failed", code: "99", message: e.message , data: null
                }
            )
            
        }
    },

    getById: async function(req, res, next) {
        
        var id = req.params.id;

        try {
            var Stocks = await StocksService.getStocksById(id)
            // Return the Users list with the appropriate HTTP password Code and Message.
            return res.status(200).json({status: "success", code : "00", data: Stocks, message: "Stocks successfully retrieved"});
        } catch (e) {
            console.log(e)
            //Return an Error Response Message with Code and the Error Message.
            return res.json({
                    status: "failed", code: "99", message: e.message , data: null
                });
            
        }
        
    },
    
    save : async function(req, res, next){

        try {
            //console.log(req.body)

    // let Stocks = {
    //             stock_no: req.body.stock_no,
    //             leather_type: req.body.leather_type,
    //             gender : req.body.gender,
    //             color : req.body.color,
    //             classification_1 : req.body.classification_1,
    //             classification_2 : req.body.classification_2,
    //             logo : req.body.logo,
    //             sub_logo : req.body.sub_logo,
    //             stitch : req.body.stitch,
    //             lining : req.body.lining,
    //             special_instruction : req.body.special_instruction,
    //             size_run_3 : req.body.size_run_3,
    //             size_run_4 : req.body.size_run_4,
    //             size_run_5 : req.body.size_run_5,
    //             size_run_6 : req.body.size_run_6,
    //             size_run_7 : req.body.size_run_7,
    //             size_run_8 : req.body.size_run_8,
    //             size_run_9 : req.body.size_run_9,
    //             size_run_10 : req.body.size_run_10,
    //             size_run_11 : req.body.size_run_11,
    //             size_run_12 : req.body.size_run_12,
    //             size_run_13 : req.body.size_run_13,
    //             size_run_14 : req.body.size_run_14,
    //             total_size_run : req.body.total_size_run
    //          }
            console.log(req.body)
            var result = await StocksService.saveStocks(req.body)
             return res.status(200).json({code: "00" , message: "Stocks successfully saved"});
          

        } catch (e) {
            console.log(e)
            //Return an Error Response Message with Code and the Error Message.
            // return res.status(400).json({
            //         status: "failed", code: "99", message: e.message , data: null
            //     });
            return res.json({
                status: "failed", code: "99", message: e.message , data: null
                }
            )
            
        }
        
    },

    updateById: async function(req, res, next) {

		//movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){

        try {
            var result = await StocksService.updateStocks(req.params,req.body)
            return res.status(200).json({code: "00" , message: "Stocks successfully updated"});
        } catch (e) {

            return res.json({
                status: "failed", code: "99", message: e.message , data: null
                }
            )
        }
       
			// if(err)
			// 	next(err);
			// else {
			// 	res.json({status:"success", message: "Movie updated successfully!!!", data:null});
			// }
	
	},



}					