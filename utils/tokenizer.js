const generateToken = (data) => {
    return jwt.sign(data, process.env.jwtSecret, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.jwtSecret);
}

module.exports ={ generateToken, verifyToken};