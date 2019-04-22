const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { decode } = require('../helpers/bcrypt');


class UserController {
    static create(req, res) {
        console.log(req.body);

        User
            .create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: 'user'
            })
            .then(data => {
                res
                    .status(201)
                    .json(data);
            })
            .catch(err => {
                console.log(err);

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })

    }

    static readAll(req, res) {
        User
            .find()
            .then(users => {
                res
                    .status(200)
                    .json(users)
            }).catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })
    }

    static login(req, res) {
        User
            .findOne({
                email: req.body.email
            })
            .then(data => {
                if (data) {
                    if (decode(req.body.password, data.password)) {
                        let token = jwt.sign({
                            id: data.id,
                            username: data.username,
                            role: data.role
                        }, process.env.SECRET);


                        res
                            .status(201)
                            .json(token)
                    } else {
                        throw 'Password salah'
                    }
                } else {
                    throw 'Email belum terdaftar'
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    static readOne(req, res) {
        User
            .findById(req.params.id)
            .then(user => {
                res
                    .status(200)
                    .json(user)
            }).catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })
    }

    static delete(req, res) {
        User
            .findOneAndDelete(req.params.id)
            .then(data => {
                res
                    .json({ message: 'Data berhasil dihapus' })
            })
            .catch(err => {

                let message = err.message;

                res
                    .status(400)
                    .json(message);
            })
    }
}


module.exports = UserController;