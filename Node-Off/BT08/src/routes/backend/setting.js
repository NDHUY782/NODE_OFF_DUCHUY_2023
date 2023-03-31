const express = require('express')

const router = express.Router()
const SettingController = require(`${__path_controllers}setting_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('/')
    .get(SettingController.getSetting) 
    

router
    .route('/form(/:id)?')
    .post(SettingController.saveSetting)


module.exports = router;