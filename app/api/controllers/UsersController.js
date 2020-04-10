// const Users = require('../models/Users');
// const bcrypt = require('bcrypt'); 
// const jwt = require('jsonwebtoken');



// module.exports = {

//  create: function(req, res, next) {
  
//     Users.create({ full_name: req.body.full_name, user_name: req.body.user_name, password: req.body.password, role: req.body.role, date_created : req.body.date_created  }, function (err, result) {
//       if (err) 
//        next(err);
//       else
//        res.json({status: "success", message: "User added successfully!!!", data: null});
      
//     });
//  },authenticate: function(req, res, next) {
//     Users.findOne({user_name:req.body.user_name}, function(err, userInfo){
//      if (err) {
//       next(err);
//      } else {
//          if(bcrypt.compareSync(req.body.password, userInfo.password)) {
//              const token = jwt.sign( {id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
//              res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
//         }else{
//             res.json({status:"error", message: "Invalid email/password!!!", data:null});
//         }
//      }
//     });
//  },}


const User = require('../models/Users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');			
var UserService = require('../services/UsersService');	
const config = require('../../config/Config')
const { validationResult } = require('express-validator');

module.exports = {
	create: function(req, res, next) {
		
		User.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "User added successfully!!!", data: null});
				  
				});
   },
   
   createUser : async function (req, res, next){

      const errors = validationResult(req);


         if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
         }

         let { user_name } = req.body;

         let isUserNameExists = await User.findOne({"user_name" : user_name});

         if(isUserNameExists){
            return res.status(409).json({
               status: "failed", code: "99", message: "Username already exist" , data: null
            })
         }

         try{

            let user = {
               full_name : req.body.full_name,
               user_name : req.body.user_name,
               password : req.body.password,
               isAdmin : req.body.isAdmin
            };
        
            // Calling the Service function with the new object from the Request Body
             var createdUser = await UserService.createUser(user);

             return res.status(201).json({
                status: "success", code: "00", message: "User added successfully!!!",  message: "Succesfully Created User", data: null 
               })
            
        }catch(error){
            console.log(error);
            return res.status(500).json(
                { 
                  status: "failed", code: "99", message: "There was a problem registering user", data: null
                }
            );
        }


         // var User = {
         //    name : req.body.name,
         //    email : req.body.email,
         //    password : req.body.password
         // }

      //   try {
      //       // Calling the Service function with the new object from the Request Body
      //       var createdUser = await UserService.createUser(User)
      //       return res.status(201).json({status: "success", message: "User added successfully!!!", data: null , message: "Succesfully Created User"})
      //   } catch (e) {
      //       //Return an Error Response Message with Code and the Error Message.
      //       //next(err);
      //       return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
      //   }
   },

   login : async function (req, res, next){


      const errors = validationResult(req);

   
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(422).json(
               { 
                  status: "failed", code: "99", message: errors.array() , data: null
               }
            );
        }
    
      // Req.Body contains the form submit values.

         try {


            let User = {
               user_name: req.body.user_name,
               password: req.body.password
            }
         
            // Calling the Service function with the new object from the Request Body
            var token = await UserService.loginUser(User);

            return res.status(201).json(
                 {
                  status: "success", code: "00", message: "Succesfully login", data: {
                     user_name : req.body.user_name,
                     token : token
                  }
                }
            )

         } catch (e) {
               //console.log(e)
               return res.status(400).json({
                  status: "failed", code: "99", message: "Invalid username or password" , data: null
                  }
               )
         }
   },

	authenticate: function(req, res, next) {
		User.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

						 const token = jwt.sign({id: userInfo._id}, config.SECRET_KEY, { expiresIn: '1h' }); 

						 res.status(200).json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}					
