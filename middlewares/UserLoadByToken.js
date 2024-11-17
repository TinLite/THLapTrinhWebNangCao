import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import { USER_ROLE } from '../configs/constants';
import { verifyToken } from '../services/jwt';
import User from '../models/SqlUserModel';
/**
 * Check if the user is authorized to access
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export default async function UserLoadByToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return next();
    }
    const decoded = verifyToken(token);
    if (decoded != null) {
        req.user = await User.findByPk(decoded.username);
    }
    return next();
}