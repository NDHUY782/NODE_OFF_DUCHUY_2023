const express = require('express')

const router = express.Router()
const categoryController = require(`${__path_controllers}category_controller`)
const { validate } = require(`${__path_validator}item`);


router
    .route('(/status/:status)?')
    .get(categoryController.getlist)

router
    .route('/form(/:id)?')
    .get(categoryController.getForm)
    .post(categoryController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(categoryController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(categoryController.getOrdering)    

router
    .route('/delete/:id')
    .get(categoryController.deleteItem)
    
router
    .route('/multipleAction')
    .post(categoryController.changeMultipleAction)

router
    .route('/sort/:sort_field/:sort_type')
    .get(categoryController.getSort)    

router
    .route('/upload')
    .get(categoryController.getUpload)
    .post(categoryController.saveUpload)

module.exports = router;