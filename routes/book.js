var express = require("express");
var router  = express.Router();
var {User}  = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');
var {Supplier} = require('./../models/supplier');




router.post('/api/book',authenticate, (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});


router.get('/api/books',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});


router.get('/api/book/:id',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});


module.exports = router;