const jwt = require('jsonwebtoken');

const generateJwt=()=>{
    const payload = {
        sub:'user-id'
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'2h'
    })

    return token

    
}

module.exports={generateJwt}