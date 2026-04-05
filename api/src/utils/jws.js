const jwt = require('jsonwebtoken');

const encode=(id,email,role)=>{
    return jwt.sign(
        { user_id: id, email: email, role: role }, process.env.SECRET_KEY || 'ZML', { expiresIn: "1d" }
      )
}

const decode=(token)=>{
    return jwt.verify(token,process.env.SECRET_KEY || 'ZML')
}

module.exports={
    encode,
    decode
}