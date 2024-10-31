import { Request, Response } from 'express'
import UserModel from '../models/UserModel';
import bcrypt from 'bcrypt';
import { render } from '../utils/RenderUtils';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function getLogin(req, res) {
    res.render("main", {
        page: "auth"
    })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function postLogin(req, res) {
    const {username, password} = req.body

    const [data] = await UserModel.findOne(username)
    if (data.length == 0) {
        return render(req, res, "auth", {
            errors: [
                "Incorrect username or password"
            ]
        })
    }

    let user = data[0]
    const isCorrectPassword = bcrypt.compareSync(password, user.password)
    if (!isCorrectPassword) {
        return render(req, res, "auth", {
            errors: [
                "Incorrect username or password"
            ]
        })
    }
    req.session.username = user.username;
    res.redirect("/")
}

export default {
    getLogin,
    postLogin,
}