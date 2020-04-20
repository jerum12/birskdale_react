
var model = require("../models/ExportsModel");


module.exports = {

    // Async function to get the User List
    getAllParameter : async function (query, page, limit, sort) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit,
            sort
        }
        // Try Catch the awaited promise to handle the error 
        try {

            const jsonParam =   {"class1" : await  model.Classification1Model.find().exec(),
                                 "class2" : await  model.Classification2Model.find().exec(),
                                 "color" : await  model.ColorModel.find().exec(),
                                 "gender" : await  model.GenderModel.find().exec(),
                                 "leather" : await  model.LeatherTypeModel.find().exec(),
                                 "lining" : await  model.LiningModel.find().exec(),
                                 "logo" : await  model.LogoModel.find().exec(),
                                 "stitch" : await  model.StitchModel.find().exec(),
                                 "stock" : await  model.StockModel.find().exec(),
                                 "sublogo" : await  model.SubLogoModel.find().exec()}
            
            // const color = ["color" : await  model.ColorModel.find().exec()]
            // const gender = []
            // const leather = []
            // const lining = []
            // const logo = []
            // const stitch = ["stitch" : await  model.StitchModel.find().exec()]
            // const sublogo = ["sublogo" : await  model.SubLogoModel.find().exec()]


            // if(!class1 || !class2 || !color || !gender || !leather ||
            //    !lining || !logo || !stitch || !sublogo){

            //    }

             return jsonParam;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)
            throw Error('Error while retrieving parameters');
        }
    }

    
}