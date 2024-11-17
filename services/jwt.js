import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET ?? process.env.SECRET ?? 'keyboard cat';

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Invalid token');
        return null;
    }
};

export const createToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, secret, { expiresIn });
};