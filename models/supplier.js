var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema =  new Schema({
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    location: String,
    Date: {type: Date, default: Date.now},
    parkingType: String,
    price:{type: Number, required: true}
});


var Supplier = mongoose.model('Supplier', SupplierSchema);


module.exports = Supplier;


