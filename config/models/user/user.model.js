const   mongoose        = require('mongoose'),
        passportLocal   = require('passport-local-mongoose');

const schema = new mongoose.Schema({
    "active": {
        "type": Boolean,
        "default": true
    },
    "status": {
        "type": String,
        "default": "user"
    },
    "created": {
        "type": Date,
        "default": Date.now
    },
    "last_login": {
        "type": Date,
        "default": Date.now
    }
});

schema.plugin(passportLocal);

const model = mongoose.model('Services', schema);

module.exports = model;