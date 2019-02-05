var express = require("express");
var router  = express.Router();
var {User}  = require('./../models/user');
var {authenticate} = require('./../middleware/authenticate');
var {Supplier} = require('./../models/supplier');


module.exports = router;