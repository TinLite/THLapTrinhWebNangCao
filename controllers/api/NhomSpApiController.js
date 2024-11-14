import { Request, Response } from 'express';
import Nhom from '../../models/SqlNhomModel';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getAll(req, res) {
    res.send(await Nhom.findAll());
}

export default {
    getAll,
}