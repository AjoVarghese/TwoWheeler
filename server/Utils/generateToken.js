const jwt = require('jsonwebtoken')
require('dotenv').config()

console.log("TOKEN CODE",process.env.TOKEN_CODE);

exports.generateToken = (id) => {
    return jwt.sign({id},process.env.TOKEN_CODE,{
        expiresIn : "30d"
    })
}

// module.export = generateToken