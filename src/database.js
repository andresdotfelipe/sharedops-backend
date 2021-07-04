const mongoose = require('mongoose');
const { dbConfig } = require('./config');

const connectDB = () => {
    const { MONGODB_URI } = dbConfig;    

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