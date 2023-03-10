const CategoryModel = require('../models/category_model')
const utilsHelpers = require('../helpers/utils')
const paramsHelpers = require('../helpers/params')

const { body, validationResult } = require("express-validator");

module.exports = {
    getAll: async (req) => { // lấy tất cả giá trị có trong DB
        let condition = {}
        let keyword   = paramsHelpers.getParam(req.query, 'keyword', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')

        let pagination = {
            totalItem       : 1,
            totalItemPerPage: 10,
            currentPage     : parseInt(paramsHelpers.getParam(req.query, 'page', 1)),
            pageRange       : 3
        }
        
        if (currentStatus === 'all'){
            if(keyword !== '') condition = {name: {$regex: keyword, $options: 'i'}}
        }else {
            condition = {status: currentStatus, name: {$regex: keyword, $options: 'i'}}
        }

        let count = await CategoryModel.count(condition)
        pagination.totalItem = count

        let data = await CategoryModel
                            .find(condition)
                            .sort({ordering: 'asc'})
                            .skip((pagination.currentPage-1) * pagination.totalItemPerPage)
                            .limit(pagination.totalItemPerPage)

        return{
            data, 
            currentStatus,
            keyword,
            pagination 
        }

    },

    countAll: async (req) => {  // Lấy số lượng phần tử đổ vào Search && Filter
        let currentStatus = req.params.status;
        let statusFilter = utilsHelpers.createFilterStatus(currentStatus)
        return statusFilter
    },

    changeStatus: async (req, res) => { // thay đổi status
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
        let status        = (currentStatus === 'active') ? 'inactive' : 'active'

        CategoryModel.updateOne({_id:id}, {status: status}, (err,result) => {
            // res.redirect('/admin/category/')
        });
        
        return {
            success: true,
            id,
            currentStatus,
            status
        }
    },

    deleteItem: async (req, res) => { // xóa items 
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        CategoryModel.deleteOne({_id:id}, (err,result) => {
            req.flash('warning', 'Xóa thành công 1 dòng!', false)           
            res.redirect('/admin/category/')
        });
    },

    getForm: async (req) => {  
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        let data          = {}
        if(id === ''){ /// add
            pageTitle = 'Add - Form'
        }else { /// edit
            data = await CategoryModel.findById(id)
            pageTitle = 'Edit - Form'
        }

        return {
            pageTitle,
            data
        }
    },

    saveItem: async (req, res) => { // thêm item
        req.body = JSON.parse(JSON.stringify(req.body))

        let item = {
            name: paramsHelpers.getParam(req.body, 'name', ''),
            ordering: paramsHelpers.getParam(req.body, 'ordering', 0),
            status: paramsHelpers.getParam(req.body, 'status', 'active'),
        }

        await new CategoryModel(item).save().then(() => {
            req.flash('success', 'Thêm mới thành công!', false) 
            res.redirect('/admin/category/')
        })
    },

    changeMultipleAction: async (req, res) => {
        CategoryModel.updateMany({_id: {$in: req.body.cid}}, {status: req.body.action}, (err, result) =>{
            res.redirect('/admin/category/')
        })

     }

}
