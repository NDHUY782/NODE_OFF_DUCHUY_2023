const express = require('express')

const router = express.Router()
const rrController = require(`${__path_controllers}rss_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .get(rrController.list)

module.exports = router;