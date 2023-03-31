
const AuthenModel = require('../models/authen_model');

const bcrypt = require('bcrypt')



module.exports = {
    list: async (req , res , next) => {
        const {user,password }     = req.body 

        const userLogin = await AuthenModel.create({user, password})
        
        res.send({
            
            userLogin
        }
            
        ) 
    },
    login: async (req , res , next) => {
        const {username,password }     = req.body 
        const user = await AuthenModel.findOne({username})
        res.send({
            
            username
        }
            
        ) 
    },
    
    
}
