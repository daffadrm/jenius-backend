const User = require ('../models/user')
const jwt = require ('jsonwebtoken')

const login = (req, res, next) => {
    
           
                let token = jwt.sign({userName:"daffa"}, 'daffa')
            res.json ({
                message: "Login succes",
                token
            })
            
}

        
        
module.exports = {
    login
}
