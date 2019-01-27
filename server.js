const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');

var Supplier = require('./models/supplier')
var Demander= require('./models/demander');
var app = express();
const port = process.env.PORT || 2702;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ParkingApp').then(() => {
    console.log('Database connection successful')
}).catch(err => {
        console.error('Database connection error')
    })



app.use(bodyParser.json());


app.get('/', function(req, res){
    res.send("hello");
});

app.post('/api/supply', async (req, res) => {
 try {
     var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
     const doc = await newSupplier.save();
     res.send({doc});
 }catch(err){
     res.status(400).send(err);
 }
});

app.get('/api/supplies', async (req, res) => {
 try {
  const supplier = await Supplier.find();
  res.send({supplier})

 }catch (e) {
     res.status(400).send(e);
 }
});

app.get('/api/supply/:id', (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});




app.post('/api/demand', (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })

});

app.get('/api/demands', (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/demand/:id', (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});




app.post('/api/book', (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});


app.get('/api/books', (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/api/book/:id', (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});




app.listen(port, () => console.log(`Parking app listening on port ${port}!` ))