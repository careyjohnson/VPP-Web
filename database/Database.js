const config = require('../configs/DbConfig');
const mysqlx = require('@mysql/xdevapi');

class Database {
    // Init database
    constructor () {
        mysqlx.getSession({ 
            password: config.password,
            user: config.user,
            host: config.host,
            port: config.port
        })
        .then((session) => {
            return session.sql(`create database if not exists ${config.schema}`)
                    .execute();
        })
        .then(() => {
            console.log('Connect to DB successfully and create db');
            mysqlx
                .getSession(config)
                .then((session) => {
                    session.sql(`
                        create table if not exists ${config.schema}.products (
                            id VARCHAR(100) not null, 
                            name VARCHAR(100),
                            price INT,
                            discription VARCHAR(300),
                            imgUrl VARCHAR(2083)
                        )
                    `).execute();
                    session.sql(`
                        create table if not exists ${config.schema}.users (
                            username VARCHAR(100),
                            password VARCHAR(100),
                            name VARCHAR(100),
                            email VARCHAR(100),
                            PRIMARY KEY (username)
                        )`
                    ).execute();
                })
                .then(() => {
                    console.log('Connect to table: "products" succesfully');
                });
        });

        
    }
}

module.exports = new Database();