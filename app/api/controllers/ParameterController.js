
const ParameterService = require('./../services/ParameterService')

module.exports = {

	getAllParameter:  async function(req, res, next) {

        // Check the existence of the query parameters, If doesn't exists assign a default value
        let sort_by = req.query.sort_by
        let sort_type = req.query.sort_type
        
        console.log("get All Parameter------------")
        let sortOptions = {
            [sort_by] : sort_type
        }

        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = sortOptions

        try {
            var param = await ParameterService.getAllParameter({}, page, parseInt(limit), sort)
            
            
            // Return the Users list with the appropriate HTTP password Code and Message.
            return res.status(200).json({code: "00", data: param, message: "Parameter successfully received."});
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({
                    status: "failed", code: "99", message: e.message , data: null
                });
            
        }
    },

    getAllParameter2:  async function(req, res, next) {

        // Check the existence of the query parameters, If doesn't exists assign a default value
        let sort_by = req.query.sort_by
        let sort_type = req.query.sort_type
        
        console.log("get All Parameter------------")
        let sortOptions = {
            [sort_by] : sort_type
        }

        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10;
        var sort = sortOptions

        try {
            var param = await ParameterService.getAllParameter({}, page, parseInt(limit), sort)
            
            
            // Return the Users list with the appropriate HTTP password Code and Message.
            return res.status(200).json({code: "00", data: param, message: "Parameter successfully received."});
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({
                    status: "failed", code: "99", message: e.message , data: null
                });
            
        }
    },
    saveParameter : async function(req, res, next){

        try {
        
            console.log(req.body)
            var result = await ParameterService.saveParameter(req.body)
            let type = req.body.type
             return res.status(200).json({code: "00" , message: `${type.toUpperCase()} Parameter successfully saved!`});
          

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

    updateParameter: async function(req, res, next) {

        try {
            var result = await ParameterService.updateParameter(req.params,req.body)
            let type = req.body.type
            return res.status(200).json({code: "00" , message: `${type.toUpperCase()} Parameter successfully updated!`});
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