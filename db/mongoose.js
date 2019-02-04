var mongoose = require('mongoose');
    keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUri).then(() => {
    console.log('Database connection successful')
}).catch(err => {
    console.error('Database connection error')
})

module.exports = {mongoose};
