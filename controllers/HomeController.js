import { Request, Response } from 'express'
import connection from '../services/connectDB'
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function get(req, res) {
    const [data] = await connection.execute("SELECT username, fullname, address FROM user")
    console.log(data)
    res.render("main", {
        page: "home",
        users: data,
    })
}