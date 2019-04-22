const Product = require('../models/product')


class productController {
    static create(req, res) {
        Product
            .create({
                name: req.body.name,
                price: req.body.price,
                image: req.file.cloudStoragePublicUrl,
                amount: req.body.amount
            })
            .then(data => {
                res
                    .status(201)
                    .json(data);
            })
            .catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })

    }

    static read(req, res) {
        console.log('masuk')
        Product
            .find()
            .then(products => {
                res
                    .status(200)
                    .json(products)
            }).catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })
    }

    static delete(req, res) {
        console.log(req.params.id)
        Product
            .findByIdAndDelete(req.params.id)
            .then(data => {
                res.json(data);
            })
            .catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })
    }
}


module.exports = productController;