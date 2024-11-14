import { Request, Response } from 'express';
import SanPham from '../../models/SqlSanphamModel';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getAll(req, res) {
    const { nhom } = req.query
    if (!nhom)
        res.send(await SanPham.findAll());
    else
        res.send(await SanPham.findAll({
            where: {
                idnhom: nhom
            }
        }));
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getOne(req, res) {
    if (!req.params.id) {
        res.status(400).send('ID is required');
    }
    res.send(await SanPham.findOne(req.params.id));
}

export default {
    getAll,
    getOne,
}