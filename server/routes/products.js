const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const {
    getPublicUrl,
    sendUploadToGCS,
    multer
} = require('../middlewares/multer');
const auth = require('../middlewares/authorization')

router.get('/', productController.read);
router.post('/',
    auth,
    multer.single('image'),
    sendUploadToGCS,
    productController.create);
router.delete('/:id', auth, productController.delete);


module.exports = router;