const { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const config = {
    serverConfig: {
        port: PORT || 4000
    },
    dbConfig: {
        user: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        port: DB_PORT,
        name: DB_NAME
    }
};

module.exports = config;