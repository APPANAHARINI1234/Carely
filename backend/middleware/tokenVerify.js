const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenVerify = (req,res,next)=>{
    //get beaere token fron "headers" property of req object
    const bearerToken = req.headers.authorization; 
    console.log(bearerToken);

    //if bearer token not found
    if(bearerToken === undefined){
        return res.send({message : "Unauthorised access"})
    }

    //extract token from bearer token
    const token = bearerToken.split(" ")[1];

    //verify the token
    try{
        let decode = jwt.verify(token, process.env.SECRET_KEY)
        next();
        console.log(decode);
        
    } catch(err) {
        res.send({message : "token expired, please relogin to continue"})
    }
}

module.exports = tokenVerify;