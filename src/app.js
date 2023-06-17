import express from 'express';
import cart from "./routes/cart.router.js"
import products from "./routes/products.router.js"


const app = express()
const port = 8080

import { Server } from "socket.io";

import handlebars from "express-handlebars";
import __dirname from "./utils.js";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("../public"))
app.use("/api/products", products)
app.use("/api/cart", cart)



app.get('/', (req,res) => {
    res.send("HOME")
})

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const io = new Server(httpServer);
io.on("connection", (socket) => {
	console.log("New client connected");

	socket.emit("products", products);

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});