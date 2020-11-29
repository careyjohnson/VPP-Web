const uuid = require('uuid');
class Product {

    constructor (id, name, price, discription, imgUrl) {
        this.id = id || uuid.v4();
        this.name = name;
        this.price = price;
        this.discription = discription;
        this.imgUrl = imgUrl;
    }

}

module.exports = Product;