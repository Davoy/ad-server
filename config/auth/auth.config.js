const   passport = require('assport'),
        user     = require('../models/user/user.model');

module.exports = {
    init: ()=>{
        passport.use(user.createStrategy());
        passport.serialiseUser(user.serialiseUser());
        passport.deserialiseUser(user.deserialiseUser());
    },
    passport: () => { return passport }
}