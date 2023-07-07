import express from 'express';
import viewsRoute from "./routes/view.router.js"
import cartsRoute from "./routes/carts.router.js"
import productsRoute from "./routes/products.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { messageModel } from './dao/mongo/models/message.model.js';
import mongoose from "mongoose";

import products from "./data/product.json" assert { type: "json" };

mongoose.connect ("mongodb+srv://matiasguarnaccia:nQh4azEOa0EOAEYU@cluster0.itl8iiw.mongodb.net/?retryWrites=true&w=majority")


const app = express()
const port = 8080



app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("../public"))
app.use("/api/products", productsRoute)
app.use("/api/cart", cartsRoute)
app.use("/", viewsRoute);



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

	io.emit("messagesLogs", messages);

	socket.on("user", data => {
		messages.push(data);
		io.emit("messagesLogs", messages);
	});

	socket.on("message", data => {
		messages.push(data);
		io.emit("messagesLogs", messages);
		messageModel.create({
      user: data.user,
      message: data.message,
		});
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});