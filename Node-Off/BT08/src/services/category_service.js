const CategoryModel = require(`${__path_models}category_model`)
const utilsHelpers  = require(`${__path_helpers}utils`)
const paramsHelpers = require(`${__path_helpers}params`)
const UploadHelpers = require(`${__path_helpers}file`)
const notify  		= require(`${__path_configs}notify`)

var {validationResult} = require('express-validator')
const util = require('util')

const routerName = 'category';
const renderName = `backend/page/${routerName}/`;

const uploadItem = UploadHelpers.upload('avatar', `${__path_public}uploads/items/`)



module.exports = {
    getAll: async (req) => { // (GetData for LIST, Pagination, Search)
        let condition = {}
        let keyword   = paramsHelpers.getParam(req.query, 'keyword', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')
        let sortField = paramsHelpers.getParam(req.session, 'sortField', 'ordering')
        let sortType  = paramsHelpers.getParam(req.session, 'sortType', 'asc')
        let sort = {}

        let pagination = {
            totalItem       : 1,
            totalItemPerPage: 3,
            currentPage     : parseInt(paramsHelpers.getParam(req.query, 'page', 1)),
            pageRange       : 3
        }

        sort[sortField] = sortType
        
        if (currentStatus === 'all'){
            if(keyword !== '') condition = {name: {$regex: keyword, $options: 'i'}}
        }else {
            condition = {status: currentStatus, name: {$regex: keyword, $options: 'i'}}
        }

        let count = await CategoryModel.count(condition)
        pagination.totalItem = count

        let data = await CategoryModel
                            .find(condition)
                            .sort(sort)
                            .skip((pagination.currentPage-1) * pagination.totalItemPerPage)
                            .limit(pagination.totalItemPerPage)

        return{
            data, 
            currentStatus,
            keyword,
            pagination,
            sortField,
            sortType
        }

    },

    countAll: async (req) => { // Filter 
        let currentStatus = req.params.status;
        let statusFilter = utilsHelpers.createFilterStatusCategory(currentStatus)
        return statusFilter
    },

    changeStatus: async (req, res) => { // Change status in table
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'active')
        let status        = (currentStatus === 'active') ? 'inactive' : 'active'

        CategoryModel.updateOne({_id:id}, {status: status}, (err,result) => {
        });
        
        return {
            success: true,
            id,
            currentStatus,
            status
        }
    },

    changeOrdering: async (req, res) => { // Change ordering in table
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        let ordering      = paramsHelpers.getParam(req.params, 'ordering', 0)
        ordering          = (ordering < 0) ? 0 : ordering
        CategoryModel.updateOne({_id:id}, {ordering: ordering}, (err,result) => {
        });
        return {
            success: true,
            id,
            ordering
        }

    },

    deleteItem: async (req, res) => { // Delete one items 
        let id            = paramsHelpers.getParam(req.params, 'id', '')
        CategoryModel.deleteOne({_id:id}, (err,result) => {
            req.flash('warning', notify.DELETE_SUCCESS, false)           
            res.redirect('/admin/category/')
        });
    },

    getForm: async (req) => {  // (GetData for FORM, edit, add)
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

    saveItem: async (req, res) => { // (NewData add, edit item)
        req.body = JSON.parse(JSON.stringify(req.body))
        let item = Object.assign(req.body)

        if(typeof item !== 'undefined' && item.id !== ""){ //edit

            CategoryModel.updateOne({_id:item.id}, {
                ordering: item.ordering,
                status: item.status,
                name: item.name
            }, (err,result) => {
                req.flash('success', notify.EDIT_SUCCESS, false) 
                res.redirect('/admin/category/')
            });
        }else{ // add
            await new CategoryModel(item).save().then(() => { 
                req.flash('success', notify.ADD_SUCCESS, false) 
                res.redirect('/admin/category/')
            })
        }

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     let errorArr = {}
        //     let data     = {}
        //     errors.array().forEach((error) => {
        //       errorArr[`${error.param}`] = error.msg;
        //     });

        //     if(item.id === ''){ /// add
        //         pageTitle = 'Add - Form'
        //     }else { /// edit
        //         data = await CategoryModel.findById(item.id)
        //         pageTitle = 'Edit - Form'
        //     }  
        //     res.render(`${renderName}form` , {
        //         pageTitle,
        //         item :  data,
        //         errorArr
        //     });
        //   return;
        // } else {       
        //     if(typeof item !== 'undefined' && item.id !== ""){ //edit

        //         CategoryModel.updateOne({_id:item.id}, {
        //             ordering: item.ordering,
        //             status: item.status,
        //             name: item.name
        //         }, (err,result) => {
        //             req.flash('success', notify.EDIT_SUCCESS, false) 
        //             res.redirect('/admin/category/')
        //         });
        //     }else{ // add
        //         await new CategoryModel(item).save().then(() => { 
        //             req.flash('success', notify.ADD_SUCCESS, false) 
        //             res.redirect('/admin/category/')
        //         })
        //     }
        // }
    },

    changeMultipleAction: async (req, res) => { // (Delete multiple, Change status multiple)
        let action = req.body.action
        if (action === 'delete') {
            CategoryModel.deleteMany({_id: {$in: req.body.cid}}, (err, result) =>{
                req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.deletedCount), false) 
                res.redirect('/admin/category/')
            })
        }else{
            CategoryModel.updateMany({_id: {$in: req.body.cid}}, {status: req.body.action}, (err, result) =>{
                req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.modifiedCount), false) 
                res.redirect('/admin/category/')
            })
        }

     },

    getSort: async (req, res) => { //  
        req.session.sortField      = paramsHelpers.getParam(req.params, 'sort_field', 'ordering')
        req.session.sortType       = paramsHelpers.getParam(req.params, 'sort_type', 'asc')
        
        res.redirect('/admin/category/')
    },

    // getUpload: async (req, res) => {
    //     res.render('admin/category/upload');
    //  },

    saveUpload: async (req, res) => {
        uploadItem(req, res, (err) => {
            let error = ''
            if (err) {
                error = err
            }
        req.flash('success', '123', false)
        res.render(`${renderName}upload`);
        })   
    }

}
