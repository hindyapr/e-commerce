const jwt = require('jsonwebtoken');

function authentic(req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.token, 'rahasia')


    } catch (error) {
        console.log(error);
        res
            .status(402)
            .json(error.message)
    }
}

module.exports = authentic