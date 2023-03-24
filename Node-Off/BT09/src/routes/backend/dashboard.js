const express = require('express')

const router = express.Router()
const layout = __dirname + '/views/backend';

router.get('/' , (req , res , next) => {
    res.render('backend/page/home' , {title : 'backend/index.ejs'})
}) 

module.exports = router;