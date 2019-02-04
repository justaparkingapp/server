var express = require("express");
var router  = express.Router();
var {User}  = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');
var {Supplier} = require('./../models/supplier');


router.post('/',authenticate, async (req, res) => {
    try {
        var newSupplier = new Supplier({
            Longitude: req.body.Longitude,
            Latitude:req.body.Latitude,
            Location: req.body.Location,
            ParkingType:req.body.ParkingType,
            Price:req.body.Price,
            _Creator: req.user._id
        });
        const doc = await newSupplier.save();

        var supplyId=doc._doc._id;


        var suplly = await  Supplier.findOneAndUpdate({_Creator: req.user._id}, {$set: { SuppliesList: supplyId }});

        req.user._doc.SuppliesList.push(supplyId)
        res.send({doc});
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/all',authenticate, async (req, res) => {
    try {
        const supplier = await Supplier.find();
        res.send({supplier})

    }catch (e) {
        res.status(400).send(e);
    }
});

router.get('/',authenticate, async (req, res) => {
    try {
        const supply = await Supplier.find({_Creator: req.user._id})
        res.send({supply})
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
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Supplier.findOneAndUpdate({_id: id, _Creator: req.user._id}, {$set: body}, {new: true}).then((suplly) => {
        if (!suplly) {
            return res.status(404).send();
        }
        res.send({suplly});
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
        const supply = await Supplier.findOneAndRemove({
            _id: id,
            _Creator: req.user._id
        });
        if (!supply) {
            return res.status(404).send();
        }

        res.send({supply});
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;