const mongoose = require('mongoose');
      validator = require('validator');
      jwt = require('jsonwebtoken');
      _ = require('lodash');
      bcrypt = require('bcryptjs')
      keys = require('./../config/keys');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Email: {type: String, required: true, trim: true, minlength: 1, unique: true, validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }},
    Password: {type: String, require: true, minlength: 1},
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    FirstName: {type: String, trim: true, minlength: 1},
    LastName: {type: String,  trim: true, minlength: 1},
    PhoneNumber: {type: Number,  trim: true, minlength: 1},
    CarModel:{type: String, trim: true, minlength: 1},
    CreateDate:{type: Date, default: Date.now}
 });

 // simple example to pick exactly what the server send back to the user

// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//
//     return _.pick(userObject, ['_id', 'email']);
// };

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, keys.JWT_SECRET).toString();


   //if don't work try user.tokens.concat
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};



UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};


UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, keys.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};
//camper user password to hash password in db
UserSchema.statics.findByCredentials = function (Email, Password) {
    var User = this;

    return User.findOne({Email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(Password, user.Password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};


//hash password before save to db
UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('Password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.Password, salt, (err, hash) => {
                user.Password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.index({Email : 1});

var User = mongoose.model('User', UserSchema);

module.exports = {User}




