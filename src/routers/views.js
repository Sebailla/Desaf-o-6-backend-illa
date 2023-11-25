import { Router } from 'express'
import ProductsModel from '../dao/models/products.js'

const router = Router()

router.get('/products', async (req, res) => {
  const {limit} = req.query
  const products = await ProductsModel.find().limit(Number(limit)).lean().exec()
  return res.render('home', {products, title: 'Productos'})
})

router.get('/realtimeproducts', (req, res) => {
  return res.render('realTimeProducts', {title:'Productos en tiempo real'})
})

router.get('/chat', (req, res) => {
return res.render('chat', {title:'Chat Clientes'})
})

router.get('*', (req, res) => {
  return res.render('404')
})

export default router

