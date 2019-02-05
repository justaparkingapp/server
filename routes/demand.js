var express = require("express");
var router  = express.Router();
const {ObjectID} = require('mongodb');
var {authenticate} = require('./../middleware/authenticate');
var {Demander} = require('./../models/demander');


router.post('/',authenticate, async (req, res) => {
    try {
        var newDemander = new Demander({
            TargetLocation: req.body.TargetLocation,
            DemandTime:req.body.DemandTime,
            UserCurrentLocation: req.body.UserCurrentLocation,
            LimitManPrice:req.body.LimitManPrice,
            _Creator: req.user._id
        });
        const doc = await newDemander.save();
        res.send({doc});
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/all',authenticate, async (req, res) => {
    try {
        const demanders = await Demander.find();
        res.send({demanders})

    }catch (e) {
        res.status(400).send(e);
    }
});


router.get('/',authenticate, async (req, res) => {
    try {
        const demander = await Demander.find({_Creator: req.user._id})
        res.send({demander})
    }catch (e) {
        res.status(400).send(e);
    }
});


router.get('/:id',authenticate, async (req, res) => {
    var id = req.params.id;
    console.log(id)

});

router.patch('/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['UserCurrentLocation', 'LimitManPrice','TargetLocation','DemandTime']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // if (_.isBoolean(body.completed) && body.completed) {
    //     body.completedAt = new Date().getTime();
    // } else {
    //     body.completed = false;
    //     body.completedAt = null;
    // }

    Demander.findOneAndUpdate({_id: id, _Creator: req.user._id}, {$set: body}, {new: true}).then((demand) => {
        if (!demand) {
            return res.status(404).send();
        }
        res.send({demand});
    }).catch((e) => {
        res.status(400).send();
    })
});


router.delete('/:id', authenticate, async (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const demand = await Demander.findOneAndRemove({
            _id: id,
            _Creator: req.user._id
        });
        if (!demand) {
            return res.status(404).send();
        }
        res.send({demand});
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;