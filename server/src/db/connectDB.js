const knex = require('knex');
require('dotenv').config()

const database_password = process.env.DATABASE_PASSWORD;
const database_name = process.env.DATABASE_NAME;
const database_user = process.env.DATABASE_USER;
const database_client = process.env.DATABASE_CLIENT;
console.log(database_password)
const db = knex({
    client: process.env.DATABASE_CLIENT || 'pg',
        connection: {
        host: '127.0.0.1',
        user: database_user,
        password: database_password,
        database: database_name,
        port: process.env.DATABASE_PORT || 5432
    },
    
});

module.exports =db