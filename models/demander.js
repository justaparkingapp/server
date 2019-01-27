
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DemanderSchema = new Schema({
    Date: {type: Date, default: Date.now},
});

var Demander = mongoose.model('Demander', DemanderSchema);
module.exports = Demander;





