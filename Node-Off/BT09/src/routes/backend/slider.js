const express = require('express')

const router = express.Router()
const sliderController = require(`${__path_controllers}slider_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .get(sliderController.list)

module.exports = router;