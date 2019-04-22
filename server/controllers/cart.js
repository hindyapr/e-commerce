const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');


class CartController {
    static create(req, res) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET);
            Cart
                .create({
                    userId: decoded.id,
                    products: [],
                    status: 'pending',
                    createdAt: new Date
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
                });

        } catch (error) {

        }

    }

    static addProductsToChart(req, res) {
        console.log(req.body.productId, req.params.id, '<<<<<<<<<<<<<<<<<<<<<<<');
        Cart
            .findById(req.params.id)
            .then(data => {
                let updated = data.products.find(function(product) {
                    return product.productId + '' === req.body.productId
                })
                console.log(updated);
                if (updated) {
                    updated.count++;
                } else {

                    data.products.push({ productId: req.body.productId, count: 1 });

                }
                return data.save();
            })
            .then(data => {
                res
                    .json(data);
            })
    }

    static deleteProductFromChart(req, res) {
        Cart
            .findById(req.params.id)
            .then(data => {
                data.products = data.products.filter(function(product) {
                    return product.productId + '' !== req.body.productId
                })
                return data.save();
            })
            .then(data => {
                res
                    .json(data);
            })
    }

    static read(req, res) {
        Cart
            .find()
            .populate('userId')
            .populate('products.productId')
            .then(Carts => {
                res
                    .status(200)
                    .json(Carts)
            }).catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            });
    }

    static readOne(req, res) {
        Cart
            .findById(req.params.id)
            .populate('userId')
            .populate('products.productId')
            .then(Cart => {
                res
                    .status(200)
                    .json(Cart)
            }).catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            });
    }

    static readOneByUserId(req, res) {
        Cart
            .findOne({
                userId: req.params.userId,
                status: 'pending'
            })
            .then(data => {
                res
                    .status(200)
                    .json(data)
            })
            .catch(err => {
                res
                    .status(500)
                    .json(err);
            })
    }

    static delete(req, res) {
        Cart
            .findOneAndDelete(req.params.id)
            .then(data => {
                req
                    .json({ message: 'data berhasil dihapus' })
            })
            .catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            });
    }
}



module.exports = CartController;