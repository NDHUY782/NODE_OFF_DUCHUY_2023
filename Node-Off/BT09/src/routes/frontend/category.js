const express = require('express')

const router = express.Router();

router.get('/' , (req , res , next) => {
    res.render('frontend/index' , {title : 'Frontend'})
})

module.exports = router;