const {check} = require('express-validator');
const util  = require('util');
const notify= require(`${__path_configs}notify`);

const options = {
    name: { min: 8, max: 30 },
    ordering: { min: 0, max: 100 },
    status: { value: 'novalue' },
    name: { min: 5, max: 200 },
}

let validateForm = () => {
  return [ 
    // name
    check('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max))
        .isLength({ min: options.name.min, max: options.name.max }), 
    // ordering    
    check('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
        .isInt({gt: options.ordering.min, lt: options.ordering.max}),
    // status    
    check('status', notify.ERROR_STATUS).custom(value => {
      return value !== 'novalue'
    }),
    // content
    check('content', util.format(notify.ERROR_CONTENT, options.name.min, options.name.max))
    .isLength({ min: options.name.min, max: options.name.max }),
  ]; 
}

let validate = {
    validateForm: validateForm,
};

module.exports = {validate};