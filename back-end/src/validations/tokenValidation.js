const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).json({ message: 'token not provided' });

    jwt.verify(token, 'a_secret_key', (err, user) => {

        if (err) return res.status(400).json({ message: 'token is invalid' });
        req.user = user;
        next();
    });
};
