import { Request, Response } from 'express';
import SanPham from '../../models/SqlSanphamModel';
import Nhom from '../../models/SqlNhomModel';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
async function getAll(req, res) {
    const { nhom } = req.query
    if (!nhom) {
        res.send({
            data: await SanPham.findAll(),
        });
    } else {
        res.send({
            data: await SanPham.findAll({
                where: {
                    idnhom: nhom
                }
            }),
            nhom: await Nhom.findByPk(nhom),
        });
    }
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
    const data = await SanPham.findByPk(req.params.id, {
        include: {
            model: Nhom,
            attributes: ['ten'],
        }
    })
    res.send(data);
}

export default {
    getAll,
    getOne,
}