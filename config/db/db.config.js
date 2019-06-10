const   mongoose = require('mongoose'),
        db       = require('../../../dbConfig/dbConfig');

module.exports = {
    connect : () => {
        mongoose.connect(
            db.prod_db, 
            {useNewUrlParser: true}
        );
    },

    collection : (collection) => {
        return mongoose.connection.db.collection(collection);
    }
}