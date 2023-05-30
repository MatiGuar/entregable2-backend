import express from 'express';
import ProductManager from './product.js'

const app = express()
const productos = new ProductManager('./product.json')


app.get('/', function (req, res) {
  res.send('Desafío 3')
})

app.get('/products', (res, req) => {
    const {limit} = req.query
    const prod = productos.getProducts()
    let cantProd
    if(limit) {
        cantProd = prod.slice(0, limit)
    } else {
        cantProd = prod
    }
    res.json ({total : prod.length, elemento: cantProd})   
}) 

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.")
})