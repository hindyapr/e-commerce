const jwt = require('jsonwebtoken');

function authentic(req, res, next) {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.SECRET)
        if (decoded.role === 'admin') next();
        else throw "You don't have authorization to do this"

    } catch (error) {
        console.log(error);
        res
            .status(402)
            .json(error.message)
    }
}

module.exports = authentic;