const express = require('express')

const router = express.Router()
const login_controller = require(`${__path_controllers}authen_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .post(login_controller.list)

router
    .route('/')
    .post(login_controller.login)
    
module.exports = router;





