const cors      = require('cors'),
      helmet    = require('helmet');

module.exports = {
    init: (app)=>{
        app.use(cors());
        app.use(helmet());
    }
}