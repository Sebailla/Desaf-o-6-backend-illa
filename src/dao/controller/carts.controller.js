import { request, response } from "express"
import CartsModel from "../models/carts.js"

export const getCarts = async (req = request, res = response) => {
    try {
        const result = await CartsModel.find()
        return res.json({result})
    } catch (error) {
        console.log('Error en getCart:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params
        const result = await CartsModel.findById(cid)
        if (!result) {
            return res.status(404).json({ msg: `El pedido con ID: ${cid}, no existe` })
        } else {
            return res.json({ result })
        }
    } catch (error) {
        console.log('Error en getCartById:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addCart = async (req = request, res = response) => {
    try {
        const result = await CartsModel.create({})
        return res.json({ msg: 'Pedido creado correctamente', result })
    } catch (error) {
        console.log('Error en addCart:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}

export const addProductsToCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params
        const result = await CartsModel.findById(cid)
        if (!result) {
            return res.status(404).json({ msg: `El pedido con ID: ${cid}, no existe` })
        } else {
            const producyInCart = result.products.find(p => p.id.toString() === pid)
            if(producyInCart){
                producyInCart.quantity++
            }else{
                result.products.push({ id: pid, quantity: 1})
            }
            result.save()

            return res.json({ msg: `El pedido con ID: ${cid}, se actualizo correctamente`, result })
        }
    } catch (error) {
        console.log('Error en addProductsToCart:', error)
        return res.status(500).json({ msg: 'Error en servidor' })
    }
}
