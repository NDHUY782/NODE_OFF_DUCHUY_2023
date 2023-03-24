const routerName = 'article';
const renderName = `backend/page/${routerName}/`;

const ArticleService = require(`${__path_services}article_service`);


module.exports = {
    getlist : async (req , res , next) => {
        // Promise.all([])
        let { data, currentStatus, keyword, pagination, categoryItems, categoryItemsFilter, sortField, sortType, idCategory}  = await ArticleService.getAll(req)
        let statusFilter                                  = await ArticleService.countAll(req)
 
        res.render(`${renderName}list` , {
            items :        data,
            currentStatus,
            keyword,
            pagination,
            statusFilter:  statusFilter,
            categoryItems,
            categoryItemsFilter,
            sortType,
            sortField,
            idCategory
        })
    },

    getForm : async (req , res , next) => {
        let { pageTitle, data, categoryItems } = await (ArticleService.getForm(req))

        res.render(`${renderName}form` , {
            pageTitle,
            item :  data,
            categoryItems
        });
    },

    getStatus: async (req , res , next) => {
        let data = await ArticleService.changeStatus(req, res)
        res.send(data) 
    },

    getOrdering: async (req, res, next) => {
        let data = await ArticleService.changeOrdering(req, res)
        res.send(data)
    },

    getCategory: async (req, res, next) => {
        let data = await ArticleService.changeCategory(req, res)
        res.send(data)
    },

    deleteItem: async (req , res , next) => {
        await ArticleService.deleteItem(req, res)
    },

    saveItem: async (req, res, next) => {
        await ArticleService.saveItem(req, res)
    },

    changeMultipleAction: async (req, res, next) => {
        await ArticleService.changeMultipleAction(req, res)
    },

    getUpload: async (req, res, next) => {
        res.render(`${renderName}upload`);
    },

    saveUpload: async (req, res, next) => {
        await ArticleService.saveUpload(req, res)
    },

    getSort: async (req , res , next) => {
        await ArticleService.getSort(req, res)
    }, 

    getFilterCategory: async (req , res , next) => {
        await ArticleService.getFilterCategory(req, res)
    },
}
