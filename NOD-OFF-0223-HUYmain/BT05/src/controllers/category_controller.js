const routerName = 'category';
const renderName = `backend/page/${routerName}/`;

const try_catch = require('../helpers/try_catch');
const CategoryService = require('../services/category_service')

module.exports = {
    list : async (req , res , next) => {
        // Promise.all([])

        let { data, currentStatus, keyword, pagination }          = await CategoryService.getAll(req)
        // let getAll          = try_catch(CategoryService.getAll(req));
        let statusFilter    = await CategoryService.countAll(req)
 
        res.render(`${renderName}list` , {
            items :        data,
            currentStatus,
            keyword,
            pagination,
            statusFilter:  statusFilter
        })
    },

    getForm : async (req , res , next) => {
        let { pageTitle, data } = await (CategoryService.getForm(req))

        res.render(`${renderName}form` , {
            pageTitle,
            item :  data
        });
    },

    getStatus: async (req , res , next) => {
        let data = await CategoryService.changeStatus(req, res)
        res.send(data) 
    },

    deleteItem: async (req , res , next) => {
        await CategoryService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await CategoryService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await CategoryService.changeMultipleAction(req, res)
    }

}
