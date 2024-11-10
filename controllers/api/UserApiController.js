import { Request, Response } from 'express';
import { get } from '../AboutController';
import UserModel from '../../models/UserModel';
import bcrypt from 'bcrypt';
import SqlUserModel from '../../models/SqlUserModel';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getAll(req, res) {
    SqlUserModel.findAll().then((data) => {
        res.json({
            message: "Success",
            data: data[0],
            pagination: {
                total: data[0].length,
                count: data[0].length,
                per_page: 10,
                current_page: 1,
                total_pages: 1,
            }
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

function getOne(req, res) {
    UserModel.findOne(req.params.username).then((data) => {
        if (data[0].length == 0) {
            return res.status(404).json({
                message: "Not found",
                code: 404,
            })
        }
        delete data[0][0].password;
        res.json({
            message: "Success",
            data: data[0][0],
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

function insertOne(req, res) {
    const data = req.body

    data.password = bcrypt.hashSync(data.password, 10)

    UserModel.insertOne(data).then(() => {
        res.json({
            message: "Success",
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

function updateOne(req, res) {
    const data = req.body
    const username = req.params.username

    console.log(data);

    UserModel.findOne(username).then((user) => {
        if (user[0].length == 0) {
            return res.status(404).json({
                message: "Not found",
                code: 404,
            })
        }
        if ("password" in data) {
            delete data.password
        }
        if ("username" in data) {
            delete data.username
        }
        data.username = username
        UserModel.updateOne(data).then(() => {
            res.json({
                message: "Success",
            })
        }).catch((err) => {
            res.status(500).json({
                message: err.message,
                code: err.code,
            })
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

function removeOne(req, res) {
    UserModel.deleteOne(req.params.username).then(() => {
        res.json({
            message: "Success",
        })
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            code: err.code,
        })
    })
}

export default {
    getAll,
    getOne,
    insertOne,
    updateOne,
    removeOne,
}