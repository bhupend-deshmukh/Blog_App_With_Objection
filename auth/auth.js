const jwt = require("jsonwebtoken")

const verifytoken = (req, res, next)=>{
    let token = req.headers.cookie.split("=")[1]
    if (token){
        const token_data = jwt.verify(token, process.env.SECRET_KEY)
        res.tokendata = token_data
        return next();
    }
    return res.send({'status': 'error', 'message': 'invalid auth.'})
}

module.exports = {verifytoken}   