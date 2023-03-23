const express = require('express')

const router = express.Router()
const menuController = require(`${__path_controllers}menu_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .get(menuController.list)

module.exports = router;