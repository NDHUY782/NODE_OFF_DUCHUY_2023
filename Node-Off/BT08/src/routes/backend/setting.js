const express = require('express')

const router = express.Router()
const settingController = require(`${__path_controllers}setting_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .get(settingController.list)

module.exports = router;