const jwt = require("jsonwebtoken")

const verifytoken = (req, res, next)=>{
    let token = req.headers.cookie.split("=")[1]
    if (token){
        const token_data = jwt.verify(token, "iamsecret")
        res.tokendata = token_data
        return next();
    }
    return res.send({'status': 'error', 'message': 'invalid auth.'})
}

module.exports = {verifytoken}   