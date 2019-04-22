const express = require('express');
const router = express.Router();
const products = require('./products');
const users = require('./users');
const carts = require('./carts');


router.use('/products', products);
router.use('/users', users);
router.use('/carts', carts)




module.exports = router;