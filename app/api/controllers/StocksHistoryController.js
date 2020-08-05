
const StocksHistoryService = require('./../services/StocksHistoryService')

module.exports = {

	getStocksHistory:  async function(req, res, next) {

        // Check the existence of the query parameters, If doesn't exists assign a default value
        let sort_by = req.query.sort_by
        let sort_type = req.query.sort_type
        
        console.log("get All Stocks History ------------")
        let sortOptions = {
            [sort_by] : sort_type
        }

        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = sortOptions
        var query = req.query


        try {
            var Stocks = await StocksHistoryService.getStocksHistory(query, page, parseInt(limit), sort)
            // Return the Users list with the appropriate HTTP password Code and Message.
            return res.status(200).json({code: "00", status: "success", data: Stocks, message: "History of stocks successfully retrieved"});
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

    getStocksHistoryById: async function(req, res, next) {
        
        var id = req.params.id;
        console.log(id + '---param id')

        try {
            var StocksHistory = await StocksHistoryService.getStocksHistoryById(id)
            // Return the Stocks History list with the appropriate HTTP password Code and Message.
            return res.status(200).json({status: "success", code : "00", data: StocksHistory, message: "Stocks history successfully retrieved"});
        } catch (e) {
            console.log(e)
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({
                    status: "failed", code: "99", message: e.message , data: null
                });
            
        }
        
    },
    
    saveStocksHistory : async function(req, res, next){

        try {
      
            console.log(req.body)
            var result = await StocksHistoryService.saveStocksHistory(req.body)
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

    updateStocksHistory: async function(req, res, next) {

		//movieModel.findByIdAndUpdate(req.params.movieId,{name:req.body.name}, function(err, movieInfo){

        try {
            var result = await StocksHistoryService.updateStocksHistory(req.params,req.body)
            return res.status(200).json({code: "00" , message: "Stocks successfully updated"});
        } catch (e) {

            return res.json({
                status: "failed", code: "99", message: e.message , data: null
                }
            )
        }

	
	},



}					