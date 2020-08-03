var jwt = require('jsonwebtoken');
var config = require('../../config/Config');



const authClientToken = async (req,res,next) => {

    let token = req.headers['authorization'];
    let msg = {code: '99', auth: false, message: 'No token provided.'};

   //console.log(token + 'here')
    if (!token){
        return  res.send(msg);
    } 
    token = token.replace('Bearer ', '');
    var decodedToken=jwt.decode(token);
    //console.log(decodedToken.details.user_name)
    
    jwt.verify(token, config.SECRET_KEY , (err,decoded) => {

        // var msg = {code: "99", auth: false, message: 'Failed to authenticate token.'};
        // var msg = {code: "99", auth: false, message: 'Token is already expired.'};
      
        if(err){
            console.log(err)
            return res.json({
                status: "failed", code: "99", message: err.message
            });

            // if(err.message === 'jwt expired'){
            //     return res.send(msg);
            // }else{
            //     return res.status(400).json({
            //         status: "failed", code: "99", message: err.message
            //     });
            // }
                //return res.send(err.message);
        }
        //req.body.user_name = decoded.id;
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

