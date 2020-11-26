const mongoose = require('mongoose');
const { dbConfig } = require('./config');

const connectDB = () => {
    const { user, password, host, port, name } = dbConfig;

    /*
        - Production: mongodb://${user}:${password}@${host}:${port}/${name}
        - Development: mongodb://${host}/${name}
    */
    const MONGODB_URI = `mongodb://${host}/${name}`;

    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('Connected to DB'))
    .catch(error => {
        console.log('DB error:', error);
        setTimeout(connectDB(), 2000);
    });

    mongoose.connection.on('error', err => {
        console.log('DB error:', err);
        connectDB();
    });
};

connectDB();