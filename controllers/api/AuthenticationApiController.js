import UserModel from "../../models/UserModel"
import bcrypt from "bcrypt"

function login(req, res) {
    const { username, password } = req.body
    UserModel.findOne(username).then((user) => {
        if (user[0].length == 0) {
            return res.status(404).json({
                message: "Not found",
                code: 404,
            })
        }
        bcrypt.compare(password, user[0][0].password).then((result) => {
            if (result) {
                req.session.username = username
                return res.json({
                    message: "Success",
                })
            }
            return res.status(401).json({
                message: "Unauthorized",
                code: 401,
            })
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

function logout(req, res) {
    req.session.destroy()
    res.json({
        message: "Success",
    })
}

export default {
    login,
    logout,
}