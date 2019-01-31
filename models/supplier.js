var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema =  new Schema({
    Longitude: {type: Number, required: true},
    Latitude: {type: Number, required: true},
    Location: String,
    Date: {type: Date, default: Date.now},
    ParkingType: String,
    Price:{type: Number, required: true},
    _Creator:{
        type:Schema.Types.ObjectId,
        required: true,
    }
});


var Supplier = mongoose.model('Supplier', SupplierSchema);


module.exports = {Supplier};


