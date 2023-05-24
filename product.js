const fs = require('fs')

class ProductManager {

    #products
    #path
   

    constructor(){
        this.#path = 'product.json'
        this.#products = this.getProducts()
        
    }
    

    getProducts(){
        
        try {
            let data
            if(fs.existsSync(this.#path)){
                const dataProduct = fs.readFileSync(this.#path, 'utf-8')
                return JSON.parse(dataProduct)
                 
            } else {
                fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            }
            return data
        } catch (error) {
            console.log(error)
        }
        

        
    }




    addProduct(title, description, price, thumbnail, code, stock) {
        let product = {
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios')
        } else if (this.#products.some(product => product.code === code)){
            console.log('El codigo del producto que desea agregar ya existe.')
        } else {
            this.#products.push(product)
            try {
                fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            } catch (error) {
                console.log(error)
            }
          
        }

        
       }

   

        getProductById(id){
         const productById = this.#products.find(e=> e.id === id) 
            
         return productById ? productById : "Not found"
    }   
    

    updateProduct(id, campo, valor){
       
        try {
            const product = this.#products.find((product) => product.id === id)

        if(!product){
            return `No existe el producto con ID: ${id}`
        } else if (!(campo in product)){
            return `No existe el campo ${campo}`
        } else if (!valor){
            return 'El valor ingresado es incorrecto'
        } else {
            product[campo] = valor
        }
        fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(error)
        }
    }


    deleteProduct(id) {
        
        try {
            const indexId = this.#products.findIndex(product => product.id === id)
        
        if (indexId >= 0){
            this.#products.splice(indexId, 1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return `El producto con id: ${id} ha sido eliminando correctamente`
        } else {
            return `No existe ningun producto con id: ${id}`
        }
        } catch (error) {
            console.log(error)
        }
        
    }

}

const product = new ProductManager() 

/* console.log(product.getProducts()) */

product.addProduct("Caramelo", "Dulce", 20, "thumbnail1", "12F24R", 100)
product.addProduct("Jugo", "Manzana", 160, "thumbnail1", "12JG44M", 100)
product.addProduct("Alfajor", "Chocoalte", 140, "thumbnail1", "12AFJ54C", 100)  
product.addProduct("Sandwich", "Tomtae", 200, "thumbnail1", "12SDJ4T", 100)  
product.addProduct("Gaseosa", "Cola", 150, "thumbnail1", "12GSA95C", 100)  

console.log(product.getProducts())

console.log("producto por id", product.getProductById(1))

product.updateProduct(2,"description", "Agridulce")  
console.log(product.getProducts())

console.log(product.deleteProduct(3))
console.log(product.deleteProduct(10)) 

console.log(product.getProducts()) 

console.log("producto por id", product.getProductById(4))