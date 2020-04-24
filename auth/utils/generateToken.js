const jwt = require('jsonwebtoken');

module.exports = user => {
    const payload = {
        user: {
            id: user.id
        }
    }

    const secret = process.env.JWT_SECRET || 'pgj56sf0kwp2rign8mv8p4o';

    return jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
}