const { findUserFromToken } = require('../user/userService');


const userIsAdmin = async (req, res, next) => {

    const userFinder = findUserFromToken(req);

    if (userFinder.isAdmin === false) {
        return res.status(400).send({ message: 'Unauthorized access ' });
    }
    next();
}
module.exports = { userIsAdmin };