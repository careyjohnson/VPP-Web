const mysqlx = require('@mysql/xdevapi');
const config = require('../configs/DbConfig');
const tableName = 'products';

class Products {

    createProduct (product) {
        return mysqlx
            .getSession(config)
            .then((session) => {
                const table = session.getSchema(config.schema).getTable(tableName);
                return table.insert('id', 'name', 'price', 'discription', 'imgUrl')
                            .values(
                                product.id, 
                                product.name, 
                                product.price, 
                                product.discription,
                                product.imgUrl
                            )
                            .execute();
            });
    }

    getProduct (id) {
        return mysqlx.getSession(config)
            .then((session) => {
                return session.sql(`SELECT * FROM ${tableName} WHERE id="${id}"`).execute();
            });
    }

    deleteProduct (id) {
        const table = session.getSchema(config.schema).getTable(tableName);
        return table.delete(`DELETE FROM ${tableName} WHERE id="${id}"`).execute();
    }

    updateProduct (product) {
        return mysqlx
            .getSession(config)
            .then((session) => {
                const table = session.getSchema(config.schema).getTable(tableName);
                return table.update().where('`id` == ' + `"${product.id}"`)
                            .set('name', product.name)
                            .set('price', product.price)
                            .set('discription', product.discription)
                            .set('imgUrl', product.imgUrl)
                            .execute();
            });
    }
        
}

module.exports = new Products();