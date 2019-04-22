const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');


router.post('/', cartController.create);
router.get('/', cartController.read);
router.get('/:id', cartController.readOne);
router.get('/user/:userId', cartController.readOneByUserId);
router.put('/:id', cartController.deleteProductFromChart);
router.patch('/:id', cartController.addProductsToChart);
router.delete('/:id', cartController.delete);



module.exports = router;