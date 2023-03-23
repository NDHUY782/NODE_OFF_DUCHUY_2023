const CategoryModel = require(`${__path_models}category_model`)
const ArticleModel = require(`${__path_models}article_model`)

let createFilterStatusCategory = async (currentStatus) => {
    let statusFilter = [
        { name: "ALl", value: 'all', count: 3, link: "#", class: "btn-outline-secondary" },
        { name: "ACTIVE", value: "active", count: 4, link: "#", class: "btn-outline-secondary" },
        { name: "INACTIVE", value: "inactive", count: 2, link: "#", class: "btn-outline-secondary" },
    ];

    for (let index = 0; index < statusFilter.length; index++) {
        let value = statusFilter[index];
        let condition = (value.value !== 'all') ? { status: value.value } : {};
          if(value.value === currentStatus) {
            value.class = "btn-success";
          }
        await CategoryModel.count(condition)
            .then((data) => {
                statusFilter[index].count = data;
            })
    }

    return statusFilter;
}

let createFilterStatusArticle = async (currentStatus) => {
    let statusFilter = [
        { name: "ALl", value: 'all', count: 3, link: "#", class: "btn-outline-secondary" },
        { name: "ACTIVE", value: "active", count: 4, link: "#", class: "btn-outline-secondary" },
        { name: "INACTIVE", value: "inactive", count: 2, link: "#", class: "btn-outline-secondary" },
    ];

    for (let index = 0; index < statusFilter.length; index++) {
        let value = statusFilter[index];
        let condition = (value.value !== 'all') ? { status: value.value } : {};
          if(value.value === currentStatus) {
            value.class = "btn-success";
          }
        await ArticleModel.count(condition)
            .then((data) => {
                statusFilter[index].count = data;
            })
    }

    return statusFilter;
}

module.exports = {
    createFilterStatusCategory: createFilterStatusCategory,
    createFilterStatusArticle: createFilterStatusArticle
}