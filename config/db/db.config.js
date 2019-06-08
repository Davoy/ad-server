const mongoose  = require('mongoose');

module.exports = {
    connect : () => {
        mongoose.connect(
            '', 
            {useNewUrlParser: true}
        );
    },

    collection : (collection) => {
        return mongoose.connection.db.collection(collection);
    }
}