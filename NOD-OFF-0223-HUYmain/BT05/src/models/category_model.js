const { Schema , model } = require("mongoose")

const CategoryModel = new Schema({
    name : {
        type : String,
    },
    status : {
        type : String,
    },
    ordering : {
        type : Number,
    }
}, {
    timestamps : true
}) 


module.exports = model('categories' , CategoryModel)