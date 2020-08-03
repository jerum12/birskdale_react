
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
            
            // const jsonParam =   {"class1" : await  model.Classification1Model.find().sort({transaction_date: -1}).exec(),
            //                      "class2" : await  model.Classification2Model.find().sort({transaction_date: -1}).exec(),
            //                      "color" : await  model.ColorModel.find().sort({transaction_date: -1}).exec(),
            //                      "gender" : await  model.GenderModel.find().sort({transaction_date: -1}).exec(),
            //                      "leather" : await  model.LeatherTypeModel.find().sort({transaction_date: -1}).exec(),
            //                      "lining" : await  model.LiningModel.find().sort({transaction_date: -1}).exec(),
            //                      "logo" : await  model.LogoModel.find().sort({transaction_date: -1}).exec(),
            //                      "stitch" : await  model.StitchModel.find().sort({transaction_date: -1}).exec(),
            //                      "stock" : await  model.StockModel.find().sort({transaction_date: -1}).exec(),
            //                      "sublogo" : await  model.SubLogoModel.find().sort({transaction_date: -1}).exec()}
            
            

             return jsonParam;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)
            throw Error('Error while retrieving parameters!');
        }
    },

    saveParameter : async function (paramBody){
        try {
            let doesParameterExisting = false;
            let newParameter = '';
            let type = paramBody.type;

            switch (type) {
                case "stock number":
                    doesParameterExisting = await model.StockModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.StockModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "color":
                    doesParameterExisting = await model.ColorModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.ColorModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "gender":
                    doesParameterExisting = await model.GenderModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.GenderModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "leather type":
                    doesParameterExisting = await model.LeatherTypeModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LeatherTypeModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "classification 1":
                    doesParameterExisting = await model.Classification1Model.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.Classification1Model({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "classification 2":
                    doesParameterExisting = await model.Classification2Model.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.Classification2Model({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "logo":
                    doesParameterExisting = await model.LogoModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LogoModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "sub logo":
                    doesParameterExisting = await model.SubLogoModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.SubLogoModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "lining":
                    doesParameterExisting = await model.LiningModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LiningModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
                case "stitch":
                    doesParameterExisting = await model.StitchModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.StitchModel({
                        code: paramBody.code,
                        description: paramBody.description
                    })
                break;
            
                default:
                    break;
            }

            console.log(doesParameterExisting)

            if(doesParameterExisting){
                console.log('existing----------------')
                throw Error(`${type.toUpperCase()} already existing!`)
            }            
            

            // Saving the User 
            var savedParameter = await newParameter.save();
           
            if(!savedParameter){
                throw Error(`${type.toUpperCase()} Parameter failed to save!`)
            }

        } catch (e) {
            console.log(e)
            throw Error(e);
        }
    },

    updateParameter : async function (paramID,paramBody){
        try {
            let doesParameterExisting = false;
            let newParameter = '';
            let type = paramBody.type;

            // console.log(paramID)
            // console.log(paramBody)

            switch (type) {
                case "stock number":
                    doesParameterExisting = await model.StockModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.StockModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "color":
                    doesParameterExisting = await model.ColorModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.ColorModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "gender":
                    doesParameterExisting = await model.GenderModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.GenderModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "leather type":
                    doesParameterExisting = await model.LeatherTypeModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LeatherTypeModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "classification 1":
                    doesParameterExisting = await model.Classification1Model.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.Classification1Model({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "classification 2":
                    doesParameterExisting = await model.Classification2Model.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.Classification2Model({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "logo":
                    doesParameterExisting = await model.LogoModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LogoModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "sub logo":
                    doesParameterExisting = await model.SubLogoModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.SubLogoModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "lining":
                    doesParameterExisting = await model.LiningModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.LiningModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
                case "stitch":
                    doesParameterExisting = await model.StitchModel.exists({ 
                        code: paramBody.code,
                        description: paramBody.description
                    });
                    newParameter =  new model.StitchModel({
                        _id : paramBody._id,
                        code: paramBody.code,
                        description: paramBody.description,
                        transaction_date : paramBody.transaction_date
                    })
                break;
            
                default:
                    break;
            }

            console.log(doesParameterExisting)

            if(doesParameterExisting){
                console.log('existing----------------')
                throw Error(`${type.toUpperCase()} Parameter already existing.`)
            }   

            switch (type) {
                case "stock number":
                    console.log(newParameter)
                    let a = await model.StockModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                    console.log(a)
                break;
                case "color":
                    await model.ColorModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "gender":
                    await model.GenderModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "leather type":
                    await model.LeatherTypeModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "classification 1":
                    await model.Classification1Model.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "classification 2":
                    await model.Classification2Model.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "logo":
                    await model.LogoModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "sub logo":
                    await model.SubLogoModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "lining":
                    await model.LiningModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
                case "stitch":
                    await model.StitchModel.findByIdAndUpdate(paramID.id,newParameter)
                    .then(function(details){
                            return details
                    }).catch(function(error){
                        console.log(error)
                        throw Error(error)
                    })
                break;
            
                default:
                    break;
            }
           
            

        } catch (e) {
            console.log(e)
             throw Error(e);
        }
    }

    
}