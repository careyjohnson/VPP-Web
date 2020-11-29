const db = require('../database/Products');
const Product = require('../models/Product');
const StatusCodes = require('http-status-codes').StatusCodes;

class Products {

    getProduct(req, res, next) {
        const id = req.params.id;
        db.getProduct(id)
            .then((results) => {
                const record = results.fetchAll()[0];
                const product = new Product(record[0], record[1], record[2], record[3], record[4]);
                res.json(product);
            });

    }

    createProduct(req, res, next) {
        const { name, price, discription, imgUrl } = req.query;
        const product = new Product(null, name, price, discription, imgUrl);
        db.createProduct(product).then(() => {
            res.status(StatusCodes.CREATED).json({ 'success': true });
        })
        .catch((err) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).text(err);
        });
    }

    deleteProduct(req, res, next) {
        const id = req.params.id;
        db.getProduct(id)
            .then((result) => {
                res.status(StatusCodes.OK).json({ 'success': true });
            })
            .catch((err) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).text(err);
            });
    }

    updateProduct(req, res, next) {
        const { id, name, price, discription, imgUrl } = req.query;
        const product = new Product(id, name, price, discription, imgUrl);
        db.updateProduct(product)
            .then((result) => {
                res.status(StatusCodes.OK).json({ 'success': true });
            })
            .catch((err) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).text(err);
            });
    }
}

module.exports = new Products();