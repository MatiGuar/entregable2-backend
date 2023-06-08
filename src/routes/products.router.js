import { Router } from "express";
import ProductManager from "../models/product.js";

const productManager = new ProductManager()
const router = Router ()

router.get('/', async (req,res) =>{
    try{
        const {limit} = req.query
        const products = await productManager.getProducts()
        if (limit) {
                const productLimit = products.slice(0, limit)
                return res.status(200).json(productLimit)
        }
        return res.status(200).json(products)
    }catch (error){
        return res.status(500).json({error: error.message})
    }
})
router.get('/:id', async (req,res) => {
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        const product = await productManager.getProductById(id)
        return res.status(200).json(product)
    }catch (error) {
        return res.status(500).json({error: error.message})
    }
})

router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, status, stock, category } = req.body;
        const result = products.addProduct(title, description, code, price, status, stock, category);

        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const {pid} = req.params
        const id = parseInt(pid)
        const update = req.body
        const putResp =  productManager.updateProduct(id, update)
        return res.status(200).json(putResp)
    }catch (error) {
        return res.status(500).json({error: error.message})
    }
})

router.delete('/', async (req,res)=> { 
        try {
            const {pid} = req.params
            const id = parseInt(pid)
            const deleteResp =  productManager.deleteProduct(id)
            return res.status(200).json(deleteResp)
        }catch (error) {
            return res.status(500).json({error: error.message})
        }
   
})

export default router