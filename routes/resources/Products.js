const express = require('express');
const controller = require('../../controllers/Products'); 
const isAuth = require('../../middlewares/isAuthenticated')
const router = express.Router();

router.get('/:id', controller.getProduct);
router.post('/', isAuth, controller.createProduct);
router.delete('/:id', isAuth,controller.deleteProduct);
router.put('/', isAuth, controller.updateProduct);

module.exports = router;
