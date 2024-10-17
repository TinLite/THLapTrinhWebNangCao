import { Request, Response } from 'express'
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export function get(req, res) {
    res.render("main", {
        page: "contact",
    })
}