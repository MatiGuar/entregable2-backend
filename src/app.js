import express from 'express';
import viewsRoute from "./routes/view.router.js"
import cartsRoute from "./routes/carts.router.js"
import productsRoute from "./routes/products.router.js"
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { messageModel } from './dao/mongo/models/message.model.js';
import { productModel } from "./dao/mongo/models/product.model.js";
import mongoose from "mongoose";
import messagesRoute from "./routes/messages.router.js";
import cookiesRoute from "./routes/cookies.router.js";
import sessionsRoute from "./routes/sessions.router.js";
import passport from "passport"; 
import initializePassport from "./config/passport.config.js"; 
import session from "express-session"
import products from "./data/product.json" assert { type: "json" };






mongoose.connect ("mongodb+srv://matiasguarnaccia:nQh4azEOa0EOAEYU@cluster0.itl8iiw.mongodb.net/?retryWrites=true&w=majority")


const app = express()
const port = 8080


app.use(
    session({
      secret: "secreto",
      resave: false,
      saveUninitialized: false,
    })
)
initializePassport(); 
app.use(passport.initialize());
app.use(passport.session()); 
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("../public"))
app.use("/api/products", productsRoute)
app.use("/api/cart", cartsRoute)
app.use("/cookies", cookiesRoute);
app.use("/sessions", sessionsRoute);
app.use("/messages", messagesRoute);
app.use("/", viewsRoute);



app.get('/', (req,res) => {
    res.send("HOME")
})

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log(`Client ${socket.id} connected`);

	const products = await productModel.find().lean();
	io.emit("products", products);

	productModel.watch().on("change", async change => {
		const products = await productModel.find().lean();
		io.emit("products", products);
	});
	

	socket.on("user", async (data) => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		});

		const messagesDB = await messageModel.find();
		io.emit("messagesDB", messagesDB);
	});

	socket.on("message", async (data) => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		});

		const messagesDB = await messageModel.find();
		io.emit("messagesDB", messagesDB);
	});

	socket.on("disconnect", () => {
		console.log(`Client ${socket.id} disconnected`);
	});
});