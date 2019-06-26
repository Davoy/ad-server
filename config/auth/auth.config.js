const passport  = require('passport'),
      user      = require('../models/user/user.model');

module.exports = {
    init: (app)=>{
        passport.use(user.createStrategy());
        passport.serializeUser(user.serializeUser());
        passport.deserializeUser(user.deserializeUser());
        app.use(passport.initialize());
        app.use(passport.session());
    }
}