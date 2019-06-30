const session  = require('express-session');
      mongoose = require('mongoose');
      store    = require('connect-mongo')(session),
      secret   = require('../../dbConfig/dbConfig.js');

const SESSION_CONFIG = {
    secret: secret.secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge: 1000 * 60 * 60 * 4 /** 4 hour expiration */
    },
    store: new store({
        mongooseConnection: mongoose.connection
    })
}

module.exports = {
    init: ()=>{
        return session(SESSION_CONFIG);
    }
}