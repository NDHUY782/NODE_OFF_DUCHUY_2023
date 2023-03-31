const { Schema , model } = require("mongoose")

const SettingModel = new Schema({
    footer:{
        copyright: {
            type: String
        },
        phone: {
            type: String
        },
        location: {
            type: String
        },
        email: {
            type: String
        },
    },
    social:{
        facebook: {
            type: String
        },
        zalo: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    logo:{
        brand: {
            type: String
        },
        logo: {
            type: String
            
        },
    }
}) 


module.exports = model('settings' , SettingModel)