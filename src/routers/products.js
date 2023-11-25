import { Router } from 'express'
import ProductManager from '../dao/filesystem/productManager.js'
import { getProducts, getProductById, addProduct, deleteProduct, updateProduct } from '../dao/controller/products.controller.js'

const router = Router()

const products = new ProductManager('products.json')

router.get('/', getProducts)
router.get('/:pid', getProductById)
router.post('/', addProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)

export default router
