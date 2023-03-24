var express = require('express');
var router = express.Router();

const systemConfig = require(`${__path_configs}system`);

/* GET home page. */
router.use('/' , require('./frontend'))
router.use(`/${systemConfig.prefixAdmin}` , require('./backend'))


module.exports = router;