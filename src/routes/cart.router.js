import { Router } from "express";
import CartManager from "../models/cart.js"

const cartManager = new CartManager("cart")
const cart = Router()

cart.post('/', (req,res)=>{
    try {
        
        const postRes = cartManager.addCart()
        return res.status(200).send(postRes)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


cart.get('/:cid', async (req,res)=>{
    try {
        const {cid} = req.params
        const cartId = parseInt(cid)

        const cart = await cartManager.getCartById(cartId)
        return res.status(200).json(cart)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})


cart.post('/:cid/product/:pid', async (req,res)=>{
    try {
        const {cid,pid} = req.params
        const cartId = parseInt(cid)
        const productId = parseInt(pid)
        cartManager.addToCart(cartId, productId)

        const cart = await cartManager.getCartById(cartId)
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})



cart.delete('/:cid', async (req,res)=>{
    try {
        const {cid} = req.params
        const cartId = parseInt(cid)

        const deleteResp = cartManager.deleteCart(cartId)
        return res.status(200).send(deleteResp)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
})

export default cart