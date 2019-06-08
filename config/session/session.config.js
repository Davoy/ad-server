const session  = require('express-session'),
      mongoose = require('mongoose'),
      store    = require('connect-mongo')(sessions);

const SESSION_CONFIG = {
    secret:"dalk2019",
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
        session(SESSION_CONFIG);
    }
}