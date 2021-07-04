const { PORT, MONGODB_URI } = process.env;

const config = {
    serverConfig: {
        port: PORT || 4000
    },
    dbConfig: {
        mongodb_uri: MONGODB_URI
    }
};

module.exports = config;