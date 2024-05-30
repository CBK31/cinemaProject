const sessionValid = async (req, res, next) => {

    if (!req.session.isLoggedIn) {
        return res.status(400).send({ message: 'Unauthorized access ' + req.session.isLoggedIn });
    }
    next();
}
module.exports = { sessionValid };