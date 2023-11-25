import { request, response } from "express"
import ProductsModel from '../models/products.js'

export const getProducts = async (req = request, res = response) => {
    try {
        const { limit } = req.query
        //const result = await ProductsModel.find().limit(Number(limit))
        //const total = await ProductsModel.countDocuments()

        const [result, total] = await Promise.all([ProductsModel.find().limit(Number(limit)), ProductsModel.countDocuments()])

        return res.json({ TotalProductos: total, result })
    } catch (error) {
        console.log('Error en getProducts:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const getProductById = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await ProductsModel.findById(pid)
        if (!result) {
            return res.status(404).json({ msg: `El producto con ID: ${pid}, no estáen existencia` })
        } else {
            return res.json({ result })
        }
    } catch (error) {
        console.log('Error en getProductById:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, thumbnail, code, stock, category, status } = req.body
        if (!title, !description, !price, !code, !stock, !category) {
            return res.status(404).json({ msg: 'Faltan Campos Obligatorios' })
        } else {
            const result = await ProductsModel.create({ title, description, price, thumbnail, code, stock, category, status })
            return res.json({ result })
        }
    } catch (error) {
        console.log('Error en addProduct:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const { _id, ...rest } = req.body
        const result = await ProductsModel.findByIdAndUpdate(pid, { ...rest }, { new: true })
        
        if (result) {
            return res.json({ msg: 'Producto actualizado correctamente', result })
        } else {
            return res.status(404).json({ msg: `El producto con Id: ${pid}, no se pudo actualizar` })
        }
    } catch (error) {
        console.log('Error en updateProduct:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params
        const result = await ProductsModel.findByIdAndDelete(pid)
        if (result) {
            return res.json({ msg: 'Producto eliminado correctamente', result })
        } else {
            return res.status(404).json({ msg: `El producto con Id: ${pid}, no se pudo eliminar` })
        }
    } catch (error) {
        console.log('Error en deleteProduct:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

