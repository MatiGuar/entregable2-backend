import { existsSync, readFileSync, writeFileSync } from 'fs'

export default class CartManager {

    #cart
    #path
   

    constructor(){
        this.#path = 'cart.json'
         this.#cart = this.getCart()
        
    }
    

    getCart(){
        
        try {
            let data
            if(existsSync(this.#path)){
                const dataProduct = readFileSync(this.#path, 'utf-8')
                return JSON.parse(dataProduct)
                 
            } else {
                data = []
            }
            return data
        } catch (error) {
            console.log(error)
        }
        

        
    }




    addCart() {

        try {

            let id = {
                id: this.#cart.length + 1,
            }
            const cart = this.getCart()
            const newCart = {
                id: id,
                products: []
            }
    
            cart.push(newCart)
            fs.writeFileSync(this.#path, JSON.stringify(cart))
            return 'Carrito agregado'
            
        } catch (error) {
            console.log(error)
        }
}

   

        getCartById(id){

         const cartById = this.#cart.find(e=> e.id === id) 
            
         return cartById ? cartById : "Not found"
    }   
    

    addToCart(cartId, prodId){
       
        try {
                const cart = this.getCart()
                const findCart = cart.find( c => c.id === cartId)
                const product = findCart.products.find(product => product.find === prodId)
        
                if(product){
                    product.quantity += 1
                }else {
                    const newProduct = {
                        product: prodId,
                        quantity: 1,
                    }
                    cart.products.push(newProduct)
                }
                fs.writeFileSync(this.#path, JSON.stringify(cart))
                return 'Producto agregado al carrito'
            } catch (error) {
                console.log(error)
        }
    }


    deleteCart(id) {
        
        try {
            const indexId = this.#cart.findIndex(c => c.id === id)
        
        if (indexId >= 0){
            writeFileSync(this.#path, JSON.stringify(this.#cart))
            this.#cart.splice(indexId, 1)
            return `El producto con id: ${id} ha sido eliminando correctamente`
        } else {
            return `No existe ningun producto con id: ${id}`
        }
        } catch (error) {
            console.log(error)
        }
        
    }

}
