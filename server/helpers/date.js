const moment = require('moment');
const date = moment().format('MMMM Do YYYY, h:mm:ss a');
console.log('DATE: ', date);  /* September 3rd 2020, 11:54:56 pm */

module.exports = date;