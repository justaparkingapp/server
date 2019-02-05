var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DemanderSchema = new Schema({
    TargetLocation:{type: String, required: true},
    DemandTime: {type: Date, required: true},
    CreateDate: {type: Date, default: Date.now},
    UserCurrentLocation: String,
    LimitManPrice: Number,
    _Creator:{
        type:Schema.Types.ObjectId,
        required: true,
    }
});
var Demander = mongoose.model('Demander', DemanderSchema);
module.exports = {Demander};





