const   express  = require('express'),
        app      = express(),
        auth     = require('./config/auth/auth.config'),
        db       = require('./config/db/db.config'),
        general  = require('./config/general/general.config'),
        headers  = require('./config/headers/headers.config'),
        session  = require('./config/session/session.config'),
        routes   = require('./routes/routes.index');

// LOAD CONFIGURATIONS
general.init(app, express);
headers.init(app);
db.connect();
app.use(session.init());
auth.init(app);

// LOAD ROUTES
routes.init(app);

// START SERVER
app.listen(3000, ()=>{
    console.log('Server Started');
});