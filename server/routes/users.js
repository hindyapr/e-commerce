const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/', userController.readAll);
router.get('/:id', userController.readOne);
router.post('/', userController.create);
router.post('/login', userController.login);
router.delete('/:id', userController.delete);



module.exports = router;