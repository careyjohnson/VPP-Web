const express = require('express');
const controller = require('../../controllers/Users'); 

const router = express.Router();

// router.get('/:id', controller.getProduct);
router.post('/', controller.createUser);

router.get('/auth', controller.login);
router.get('/logout', controller.logout);
// router.delete('/:id', controller.deleteProduct);
// router.put('/', controller.updateProduct);

module.exports = router;
