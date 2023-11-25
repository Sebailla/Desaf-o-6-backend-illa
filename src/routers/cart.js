import {Router} from 'express'
import { getCarts, getCartById, addCart, addProductsToCart } from '../dao/controller/carts.controller.js'

const router = Router()

// All Cart
router.get('/', getCarts)

// Cart por Id
router.get('/:cid', getCartById)

// Add Cart
router.post('/', addCart)

//Add products to Cart
router.post('/:cid/product/:pid', addProductsToCart)


export default router