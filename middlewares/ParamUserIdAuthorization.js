import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/UserModel';
import { USER_ROLE } from '../configs/constants';
/**
 * Check if the user is authorized to access the user's page
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export default async function ParamUserIdAuthorization(req, res, next) {
    const username = req.params.username;
    if (req.session.username == username) {
        return next();
    }
    if (req.session.username) {
        const [dbUser] = await UserModel.findOne(req.session.username);
        if (dbUser.length > 0 && dbUser[0].role == USER_ROLE.ADMIN) {
            return next();
        }
    }
    return res.status(403).send("Forbidden");
}