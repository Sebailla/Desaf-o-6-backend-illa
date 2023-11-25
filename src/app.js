import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import __dirname from './utils.js'

import productsRouter from './routers/products.js'
import cartRouter from './routers/cart.js'
import viewsRouter from './routers/views.js'
import { dbConnection } from './db/config.js'
import productsModel from './dao/models/products.js'
import chatModel from './dao/models/chat.js'
import 'dotEnv/config'


const app = express()

app.use(express.static((__dirname + '/public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// views
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

// Router Products
app.use('/api/products', productsRouter)

// Router Cart 
app.use('/api/cart', cartRouter)

//Routers Views
app.use('/', viewsRouter)

await dbConnection()
// Express Server
const httpServer = app.listen(8080, () => console.log('listening on port 8080 ...'))

// WebSocket Server
const io = new Server(httpServer)

//?  WebSocket connection
//-------------------------------------------------
io.on('connection', async (socket) => {

    console.log('New Client connected on front')

    socket.on('disconnect', () => {
        console.log('Cliente sin conección')
    })

    //? Productos
    // Enviamos productos al Cliente
    const products = await productsModel.find()
    socket.emit('getProducts', products)

    // Agregamos productos
    socket.on('postProducts', async (productData) => {
        const newProduct = await productsModel.create({ ...productData })
        if (newProduct) {
            products.push(newProduct)
            socket.emit('postProducts', products)
        }

    })

    // Eliminamos productos
    /* socket.on('getProducts', async (productId) => {
        await productsModel.deleteOne(productId)
        socket.emit('getProducts', products)
    }) */

    //? Chat

    const messages = await chatModel.find();
    socket.emit('message', messages);

    socket.on('message', async(data) => {
        const newMessage = await chatModel.create({...data}); 
        if(newMessage){
            const messages = await chatModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('newUser');
})




