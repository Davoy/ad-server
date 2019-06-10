const passport  = require('passport'),
      user      = require('../models/user/user.model');

module.exports = {
    init: ()=>{
        passport.use(user.createStrategy());
        passport.serializeUser(user.serializeUser());
        passport.deserializeUser(user.deserializeUser());
        passport.initialize();
        passport.session();
    }
}