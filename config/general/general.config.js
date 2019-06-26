const bodyParser        = require('body-parser'),
      compression       = require('compression'),
      cookieParser      = require('cookie-parser'),
      methodOverride    = require('method-override'),
      path              = require('path');

module.exports = {
    init: (app, express)=>{
        app.use(express.static(path.join( __dirname , '../../public')));
        app.use(cookieParser('dalk2019'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use(compression());
        app.use(methodOverride('_method'));
        app.set('view engine', 'ejs');
    }
}