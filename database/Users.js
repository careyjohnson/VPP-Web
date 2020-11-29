const mysqlx = require('@mysql/xdevapi');
const config = require('../configs/DbConfig');
const tableName = 'users';
const bcrypt = require('bcrypt');

const configs = require('../configs/AppConfig');

const saltRounds = configs.SALT_ROUND;

class Users {

    createUser (user) {
        return mysqlx
            .getSession(config)
            .then((session) => {
                const table = session.getSchema(config.schema).getTable(tableName);
                return bcrypt.hash(user.password, saltRounds).then((hash) => {
                    return table.insert('username', 'password', 'name', 'email')
                                .values(
                                    user.username, 
                                    hash,
                                    user.name, 
                                    user.email
                                )
                                .execute();
                });
            });
    }

    checkUser (username, password) {
        return mysqlx.getSession(config)
            .then((session) => {
                return session.sql(`SELECT * FROM ${tableName} WHERE username="${username}"`).execute();
            }).then((results) => {
                const record = results.fetchAll()[0];
                const hashPassword = record[1];
                return bcrypt.compare(password, hashPassword);
            });
    }
        
}

module.exports = new Users();