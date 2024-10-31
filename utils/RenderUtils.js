import { Request, Response } from 'express'
import UserModel from '../models/UserModel'
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {any} params
 */
export async function render(req, res, page, params) {
    let user
    if (req.session.username) {
        let [data] = await UserModel.findOne(req.session.username);
        user = data[0]
    }
    return res.render("main", {
        ...params,
        page,
        authenticatedUser: user,
        query: req.query,
    })
}