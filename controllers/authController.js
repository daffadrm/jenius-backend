const User = require ('../models/user')
const jwt = require ('jsonwebtoken')

const login = (req, res, next) => {
    var userName = req.body.userName

    User.findOne ({userName})
    .then(user => {

    
        if(user){
           
                let token = jwt.sign({userName:userName}, 'daffa')
            res.json ({
                message: "Login succes",
                token
            })
            }else{
                res.json({
                    message: 'Login not succes'
                })
            }
        })
}

        
        
module.exports = {
    login
}
