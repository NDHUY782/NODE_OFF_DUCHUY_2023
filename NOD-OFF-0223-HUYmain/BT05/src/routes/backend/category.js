const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')
const { messageItemHelper } = require("../../helpers/message");

const { body, validationResult } = require("express-validator");


router
    .route('(/status/:status)?')
    .get(categoryController.list)

router
    .route('/form(/:id)?', 
            body("name").isLength({ min: 5 }).withMessage(messageItemHelper.errorName),
            body("ordering").isNumeric().withMessage(messageItemHelper.errorOrdering))
    .get(categoryController.getForm)
    .post(categoryController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(categoryController.getStatus) 

router
    .route('/delete/:id')
    .get(categoryController.deleteItem)
    
router
    .route('/multipleAction')
    .post(categoryController.changeMultipleAction)

module.exports = router;