var express = require("express");
var router  = express.Router();
var {User}  = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');

router.get('/', function(req, res){
    res.send("hello");
});

//handle sign up logic
router.post("/register", async (req, res)=> {
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


router.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

router.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['Email', 'Password']);
        const user = await User.findByCredentials(body.Email, body.Password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete('/users/delete', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});


module.exports = router;