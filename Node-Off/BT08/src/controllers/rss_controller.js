const routerName = 'article';
const renderName = `backend/page/${routerName}/`;
const Parser = require('rss-parser');
const parser = new Parser();
var fs = require('fs');

module.exports = {
    
    list: async (req , res , next) => {
        let data = await parser.parseURL('https://vnexpress.net/rss/the-gioi.rss')
        let newData = data.items.map((item) => {
            let content = item.content
            //tách thẻ img ra
            item.content = content.match(/<img([\w\W]+?)>/g)[0]
            return item
        })
        res.send({
            count : newData.length,
            item  : newData
        })
        // let time = 1*60*60;
        // let data = fs.readFileSync('duchuy.txt');
        // data = JSON.parse(data)

        // console.log(data.time)
        // if (time > data.time) {
        //     console.log('call api')
        // } else {
        //     console.log('texxxxxx')
        // }

        // res.send(
        //     data
        // )
    },


    
    
}
