import express from 'express';
import ProductManager from './product.js'

const app = express()
const productos = new ProductManager('./product.json')


app.get('/', function (req, res) {
  res.send('Desafío 3')
})

app.get('/products', (req, res) => {

    const prod = productos.getProducts()
    const {limit} = req.query
    let cantidadProdcts
    if (limit) {
        cantidadProdcts = prod.slice(0, limit)
    } else {
        cantidadProdcts = prod
    }
    return res.json( {total: prod.length, elementos: cantidadProdcts})
   
})

app.get ('/products/:id', (req, res)=>{
    const { id } = req.params
    return res.json(productos.getProductById(parseInt(id))) 
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})