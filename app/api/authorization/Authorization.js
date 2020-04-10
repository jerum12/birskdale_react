var jwt = require('jsonwebtoken');
var config = require('../../config/Config');



const authClientToken = async (req,res,next) => {

    let token = req.headers['x-access-token'];
    let msg = {auth: false, message: 'No token provided.'};

    if (!token){
        return  res.status(500).send(msg);
    } 
    
    jwt.verify(token, config.SECRET_KEY , (err,decoded) => {

        var msg = {auth: false, message: 'Failed to authenticate token.'};

        if(err){
            return res.status(500).send(msg);
        }
        req.body.userId = decoded.id;
        return next();
    });
}

// var authorization = function (req, res, next) {
//     var token = req.headers['x-access-token'];
//     var msg = {auth: false, message: 'No token provided.'};

//     if (!token) 
//         res.status(500).send(msg);
        
   
    
//     jwt.verify(token, config.SECRET_KEY, function (err, decoded) {
//         var msg = {auth: false, message: 'Failed to authenticate token.'};

//         if (err) 
//             res.status(500).send(msg);
//         else{
//              // add user id to request
//             req.body.userId = decoded.id;
//             next();
//         }
//     });
// }

// module.exports = authorization;

module.exports = {
    authClientToken : authClientToken
}

