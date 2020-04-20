
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
            return res.status(200).json({status: 200, data: param, message: "Parameter successfully received."});
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({
                    status: "failed", code: "99", message: e.message , data: null
                });
            
        }
    }

    



}					