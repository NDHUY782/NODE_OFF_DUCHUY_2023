var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/' , require('./frontend'))
router.use('/admin' , require('./backend'))

module.exports = router;