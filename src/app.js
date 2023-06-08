import express from 'express';
import cart from "./routes/cart.router.js"
import products from "./routes/products.router.js"
import ProductManager from './models/product.js'

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("../public"))
app.use("/api/products", products)
app.use("/api/cart", cart)

app.get('/', (req,res) => {
    res.send("HOME")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

