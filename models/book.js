var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema =  new Schema({
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    location: String,
    Date: {type: Date, default: Date.now},
    parkingType: String,
    price:{type: Number, required: true}
});


var Book = mongoose.model('Book', BookSchema);


module.exports = Book;


