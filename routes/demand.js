var express = require("express");
var router  = express.Router();
var {User}  = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');
var {Supplier} = require('./../models/supplier');
var {Demander} = require('./../models/demander');


router.post('/api/demand',authenticate, (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })

});

router.get('/api/demands',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/api/demand/:id',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});





module.exports = router;