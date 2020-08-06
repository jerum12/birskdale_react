var model = require("../models/ExportsModel");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../../config/Config')


module.exports = {

    createUser : async function (user) {
        // Creating a new Mongoose Object by using the new keyword
        //var hashedPassword = bcrypt.hashSync(user.password, 8);
        // let { user_name } = req.body;

        // let isUserNameExists = await User.findOne({"user_name" : user_name});

        // if(isUserNameExists){
        //    return res.json({
        //       status: "failed", code: "99", message: "Username already exist" , data: null
        //    })
        // } 
        
        try {
            const doesUserExist = await model.UsersModel.exists({ 
                user_name: user.user_name
            });

            console.log(doesUserExist)

            if(doesUserExist){
                console.log('existing user----------------')
                throw Error(`Username ${user.user_name} is already used.`)
            }

            var newUser = new model.UsersModel({
                full_name: user.full_name,
                user_name: user.user_name,
                date: new Date(),
                password: user.password,
                isAdmin : true
            })

            // Saving the User 
            var savedUser = await newUser.save();
            // var token = jwt.sign({id: savedUser._id}, config.SECRET_KEY, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            if(!savedUser){
                throw Error("Error while Creating User")
            }

            //return token;
        } catch (e) {
            // return a Error message describing the reason     
            console.log(e)
             throw Error(e);
        }
    },

    loginUser : async function (user) {
        
        // Creating a new Mongoose Object by using the new keyword
        
        try {
            // console.log(user)
            // let _details = await User.findOne({"email" : user.email});


            var _details = await model.UsersModel.findOne({user_name: user.user_name})
                            .then(function(user){
                                return user
                            }).catch(function(error){
                                throw Error("Invalid username or password")
                            })

            if(!_details){
                throw Error("Invalid username or password")
            }

            let isPasswordValid = await bcrypt.compare(user.password, _details.password);
           

            if(!isPasswordValid){
                throw Error("Invalid username or password")
            }
       
            // Find the User 
            // var _details = await User.findOne({ email: user.email });
            // var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
            // if (!passwordIsValid) throw Error("Invalid username/password")
            let token = jwt.sign({ id: _details._id, details : {'full_name':_details.full_name, 'user_name' : _details.user_name} }, config.SECRET_KEY, { expiresIn: '3600s' });

           
            return token;

        } catch (e) {
            console.log(e)
            // return a Error message describing the reason     
            throw Error(e)
        }
    },

    deleteUser : async function (id) {
        // Delete the User
        try {
            var deleted = await model.UsersModel.remove({_id: id})
            if (deleted.n === 0 && deleted.ok === 1) {
                throw Error("User Could not be deleted")
            }
            return deleted;
        } catch (e) {
            throw Error("Error Occured while Deleting the User")
        }
    },

    // Async function to get the User List
    getUsers : async function (query, page, limit) { 
        // Options setup for the mongoose paginate
        var options = {
            page,
            limit
        }
        // Try Catch the awaited promise to handle the error 
        try {
            //var Users = await User.paginate(query, options)
            const Users = await  model.UsersModel
            .find()
            .exec()
            
            // Return the Userd list that was retured by the mongoose promise
            return Users;
        } catch (e) {
            // return a Error message describing the reason 
            throw Error('Error while Paginating Users');
        }
    },

    updateUser : async function (paramID,paramBody){
        try {
            console.log(paramBody)
            if(paramBody.hasChanges){
                const doesUserExist = await model.UsersModel.exists({ 
                    user_name: paramBody.user_name
                });
    
                console.log(doesUserExist)
    
                if(doesUserExist){
                    console.log('existing----------------')
                    throw Error(`Username ${paramBody.user_name} is already used.`)
                }
            }

             await model.UsersModel.findByIdAndUpdate(paramID.id,paramBody)
                                    .then(function(details){
                                            return details
                                    }).catch(function(error){
                                        console.log(error)
                                        throw Error(`No User for ${paramID.id}`)
                                    })

        } catch (e) {
            console.log(e)
             throw Error(e);
        }
    },
    validateUser : async function (user) {

        try {


            var _details = await model.UsersModel.findOne({user_name: user.user_name})
                            .then(function(user){
                                return user
                            }).catch(function(error){
                                throw Error(`Username ${user.user_name} is not valid.`)
                            })

            if(!_details){
                throw Error(`Username ${user.user_name} is not valid.`)
            }

            let isPasswordValid = await bcrypt.compare(user.current_password, _details.password);
           

            if(!isPasswordValid){
                throw Error("Invalid current password")
            }
      
            return true;

        } catch (e) {
            console.log(e)   
            throw Error(e)
        }
    },
    updatePassword : async function (user){
        try {
            const hashedPassword = bcrypt.hashSync(user.password, config.saltRounds);
            console.log(hashedPassword)

            const filter = { _id: user.id };
            const update = { password: hashedPassword };

             await model.UsersModel.findOneAndUpdate(filter, update, {
                returnOriginal: false
              }) 
              .then(function(details){
                  return details
              }).catch(function(error){
                  console.log(error)
                  throw Error(`Error updateing password`)
               });


        } catch (e) {
            console.log(e)
             throw Error(e);
        }
    },
}