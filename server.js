const express = require('express')
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');

var {Supplier} = require('./models/supplier');
var {User}  = require('./models/user');
var Demander = require('./models/demander');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 2702;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ParkingAppTest').then(() => {
    console.log('Database connection successful')
}).catch(err => {
        console.error('Database connection error')
    })

app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("hello");
});

//handle sign up logic
app.post("/api/register", async (req, res)=> {
    try {
        var body  = _.pick(req.body, ['Email', 'Password','FirstName','LastName','PhoneNumber','CarModel']);
        var newUser = new User(body);
        const user = await newUser.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    }catch (e) {
        res.status(400).send(e);
    }
});


app.post('/api/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['Email', 'Password']);
        const user = await User.findByCredentials(body.Email, body.Password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send();
    }
});


app.delete('/api/users/delete', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});



app.post('/api/supply',authenticate, async (req, res) => {
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
     req.user.SuppliesList.push(doc._doc._id)

     res.send({doc});
 }catch(err){
     res.status(400).send(err);
 }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


app.get('/api/supplies',authenticate, async (req, res) => {
 try {
  const supplier = await Supplier.find();
  res.send({supplier})

 }catch (e) {
     res.status(400).send(e);
 }
});

app.get('/api/supply',authenticate, async (req, res) => {
    try {
        const supply = await Supplier.find({_Creator: req.user._id})
        res.send({supply})
    }catch (e) {
        res.status(400).send(e);
    }
});




app.post('/api/demand',authenticate, (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })

});

app.get('/api/demands',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/demand/:id',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});




app.post('/api/book',authenticate, (req, res) => {
    var newSupplier = new Supplier({longitude: req.body.longitude, latitude:req.body.latitude,location: req.body.location, parkingType:req.body.parkingType, price:req.body.price});
    newSupplier.save()
        .then(doc => {
            res.send(doc);
        })
        .catch(err => {
            res.status(400).send(err);
        })
});


app.get('/api/books',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/api/book/:id',authenticate, (req, res) => {
    Supplier.find().then((supplier) => {
        res.send({supplier});
    }, (e) => {
        res.status(400).send(e);
    });
});




app.listen(port, () => console.log(`Parking app listening on port ${port}!` ))