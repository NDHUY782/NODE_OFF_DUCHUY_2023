const express = require('express')

const router = express.Router()
const ArticleController = require(`${__path_controllers}article_controller`)

router
    .route('(/status/:status)?')
    .get(ArticleController.getlist)

router
    .route('/form(/:id)?')
    .get(ArticleController.getForm)
    .post(ArticleController.saveItem)
    // .post(validate.validateForm(), ArticleController.saveItem)

router
    .route('/change-status/:id/:status')
    .get(ArticleController.getStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(ArticleController.getOrdering)
    
router
    .route('/change-category/:id/:id_category')
    .get(ArticleController.getCategory)

router
    .route('/sort/:sort_field/:sort_type')
    .get(ArticleController.getSort)
    
router
    .route('/filter-category/:id_category')
    .get(ArticleController.getFilterCategory)      

router
    .route('/delete/:id')
    .get(ArticleController.deleteItem)
    
router
    .route('/multipleAction')
    .post(ArticleController.changeMultipleAction)

router
    .route('/upload')
    .get(ArticleController.getUpload)
    .post(ArticleController.saveUpload)

module.exports = router;