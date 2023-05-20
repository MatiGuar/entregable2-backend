const fs = require('fs')

class ProductManager {

    #products
    #path

    constructor(){
        this.#products = []
        this.#path = 'product.json'
    }
    

    getProducts(){
        
        if(fs.existsSync(this.#path)){
            const dataProduct = fs.readFileSync(this.#path, 'utf-8')
            this.#products = JSON.parse(dataProduct)
            console.log(this.#products) 
        } else {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            console.log(this.#products) 
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }

        
       }

   

        getProductById(id){
         this.#products.find((e)=>{
            return e.id == id
        }) || console.error("Not Found")
    }   
    

    updateProduct(id, campo, valor){
       
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
    }

}

const product = new ProductManager() 

console.log(product.getProducts())

product.addProduct("Caramelo", "Dulce", 20, "thumbnail1", "12F24R", 100)
product.addProduct("Jugo", "Manzana", 160, "thumbnail1", "12JG44M", 100)
product.addProduct("Alfajor", "Chocoalte", 140, "thumbnail1", "12AFJ54C", 100)  

console.log(product.getProducts())



console.log("producto por id", product.getProductById(1))

product.updateProduct(2,"description", "Agridulce")

console.log(product.getProducts()) 