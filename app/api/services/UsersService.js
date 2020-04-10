var User = require('../models/Users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../../config/Config')


module.exports = {

    createUser : async function (user) {
        // Creating a new Mongoose Object by using the new keyword
        //var hashedPassword = bcrypt.hashSync(user.password, 8);

        var newUser = new User({
            full_name: user.full_name,
            user_name: user.user_name,
            date: new Date(),
            password: user.password,
            isAdmin : user.isAdmin
        })

        try {
            // Saving the User 
            var savedUser = await newUser.save();
            // var token = jwt.sign({id: savedUser._id}, config.SECRET_KEY, {
            //     expiresIn: 86400 // expires in 24 hours
            // });
            if(!savedUser){
                throw new error("Error while Creating User")
            }

            //return token;
        } catch (e) {
            // return a Error message describing the reason     
            console.log(e)
            throw Error("Error while Creating User")
        }
    },

    loginUser : async function (user) {
        
        // Creating a new Mongoose Object by using the new keyword
        
        try {
            // console.log(user)
            // let _details = await User.findOne({"email" : user.email});


            var _details = await User.findOne({user_name: user.user_name})
            .then(function(user){
                return user
            }).catch(function(error){
                throw Error("Invalid username or password")
            })

            let isPasswordValid = await bcrypt.compare(user.password, _details.password);
           

            if(!_details || !isPasswordValid){
                throw Error("Invalid username or password")
            }
       
            // Find the User 
            // var _details = await User.findOne({ email: user.email });
            // var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
            // if (!passwordIsValid) throw Error("Invalid username/password")
            let token = jwt.sign({ id: _details._id, user_name : _details.user_name }, config.SECRET_KEY, { expiresIn: 86400 });

           
            return token;

        } catch (e) {
            console.log(e)
            // return a Error message describing the reason     
            throw Error("catch error => " + e)
        }
    },

    deleteUser : async function (id) {
        // Delete the User
        try {
            var deleted = await User.remove({_id: id})
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
            var Users = await User.paginate(query, options)
            // Return the Userd list that was retured by the mongoose promise
            return Users;
        } catch (e) {
            // return a Error message describing the reason 
            throw Error('Error while Paginating Users');
        }
    }
}