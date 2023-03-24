const routerName = 'article';
const renderName = `backend/page/${routerName}/`;
const Parser = require('rss-parser');
const parser = new Parser();
var fs = require('fs');

module.exports = {
    
    list: async (req , res , next) => {
        res.render('backend/page/menu/index.ejs')
    },
    
}
