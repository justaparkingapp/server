var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema =  new Schema({
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    location: {type: String, required: true},
    CreateDate: {type: Date, default: Date.now},
    BookDate:{type: Date, required: true},
    parkingType: String,
    price:{type: Number, required: true},
    _supplierId: {type: String, required: true},
    _demander:{
        type:Schema.Types.ObjectId,
        required: true,
    }
});
var Book = mongoose.model('Book', BookSchema);
module.exports = {Book};

