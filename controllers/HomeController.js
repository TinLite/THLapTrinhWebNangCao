import { Request, Response } from 'express'
import connection from '../services/connectDB'
import bcrypt from 'bcrypt'
import UserModel from '../models/UserModel'
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function get(req, res) {
    const [data] = await connection.execute("SELECT username, fullname, address FROM user")
    console.log(data)
    res.render("main", {
        page: "home",
        users: data,
        query: req.query,
    })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function createNewUser(req, res) {
    const data = req.body
    
    bcrypt.hash(data.password, 10).then((hash) => {
        const parsed = {...data, password: hash}
        if (data.sex) {
            parsed.sex = (data.sex == 1)
        }
        return UserModel.insertOne(data)
    }).finally(() => {
        res.redirect("/")
    })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getOneUser(req, res) {
    const [data] = await UserModel.getOne(req.params.username)
    res.render("main", {
        page: "users/detail",
        user: data[0],
        query: req.query,
    })
}

async function updateOneUser(req, res) {
    const data = req.body
    const username = req.params.username
    const [user] = await UserModel.getOne(req.params.username)
    if (user.length == 0) {
        res.redirect("/")
    }
    if ("password" in data) {
        delete data.password
    }
    if ("username" in data) {
        delete data.username
    }
    const parsed = {
        ...user[0],
        ...data
    }
    UserModel.updateOne(parsed).finally(() => {
        res.redirect("/users/" + username)
    })
}

async function updateOneUserPassword(req, res) {
    const password = req.body.password
    const hashed = await bcrypt.hash(password, 10)
    UserModel.updateOnePassword(req.params.username, hashed).finally(() => {
        res.redirect("/users/" + req.params.username)
    })
}

async function deleteOneUser(req, res) {
    UserModel.deleteOne(req.params.username).finally(() => {
        res.redirect("/")
    })
}

export default {
    get,
    createNewUser,
    getOneUser,
    updateOneUser,
    updateOneUserPassword,
    deleteOneUser,
}