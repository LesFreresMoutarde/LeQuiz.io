// Copy this file to ./env.js and fill in the values

module.exports = {
    frontUrl: 'APP_FRONT_URL', // Without trailing slash, example: 'https://www.example.com'
    jwtSecret: 'SuperSecret', // Change this in production, it is the secret signing key for JWTs
    email: {
        apiKey: 'SENDGRID_API_KEY',
    },
    database: {
        development: {
            username: "admin",
            password: "admin",
            database: "lequiz-io",
            host: "database",
            dialect: "postgres",
        },
        test: {
            username: "TEST_DATABASE_USERNAME",
            password: "TEST_DATABASE_PASSWORD",
            database: "TEST_DATABASE_NAME",
            host: "TEST_DATABASE_HOST",
            dialect: "TEST_DATABASE_DIALECT", // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
        },
        production: {
            username: "PRODUCTION_DATABASE_USERNAME",
            password: "PRODUCTION_DATABASE_PASSWORD",
            database: "PRODUCTION_DATABASE_NAME",
            host: "PRODUCTION_DATABASE_HOST",
            dialect: "PRODUCTION_DATABASE_DIALECT", // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
        },
    },
};
