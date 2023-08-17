import express from 'express'
import viewsRoute from "./routes/view.router.js"
import cartsRoute from "./routes/carts.router.js"
import productsRoute from "./routes/products.router.js"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { messageModel } from './dao/mongo/models/message.model.js'
import { productModel } from "./dao/mongo/models/product.model.js"
import mongoose from "mongoose"
import messagesRoute from "./routes/messages.router.js"
import cookiesRoute from "./routes/cookies.router.js"
import sessionsRoute from "./routes/sessions.router.js"
import passport from "passport" 
import initializePassport from "./config/passport.config.js" 
import session from "express-session"
/* import products from "./data/product.json" assert { type: "json" } */
import cookieParser from 'cookie-parser';
import CustomUsersRouter from './routes/customUsers.router.js';
import CustomSessionsRouter from './routes/customSessions.router.js';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import forkRoute from './routes/fork.router.js';

const customUsersRouter = new CustomUsersRouter();
const customSessionsRouter = new CustomSessionsRouter();


/* mongoose.connect ("mongodb+srv://matiasguarnaccia:nQh4azEOa0EOAEYU@cluster0.itl8iiw.mongodb.net/?retryWrites=true&w=majority") */


const app = express()
const port = 8080


const mongoUrl = "mongodb+srv://matiasguarnaccia:nQh4azEOa0EOAEYU@cluster0.itl8iiw.mongodb.net/?retryWrites=true&w=majority"
const enviroment = async () => {
	await mongoose.connect(mongoUrl);
};
enviroment();
app.use(
	session({
		store: MongoStore.create({ mongoUrl }),
		secret: "<SECRET>",
		resave: false,
		saveUninitialized: true,
	})
);
initializePassport(); 
app.use(passport.initialize());
app.use(passport.session()); 
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/static", express.static("../public"))
app.use("/api/products", productsRoute)
app.use("/api/cart", cartsRoute)
app.use("/cookies", cookiesRoute)
app.use("/sessions", sessionsRoute)
app.use("/messages", messagesRoute)
app.use("/", viewsRoute)
app.use('/api/custom/users', customUsersRouter.getRouter());
app.use('/api/custom/sessions', customSessionsRouter.getRouter());
app.use('/api/fork', forkRoute);
router(app);



app.get('/', (req,res) => {
    res.send("HOME")
})

const httpServer = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

const io = new Server(httpServer);

io.on("connection", async (socket) => {
	console.log(`Client ${socket.id} connected`)

	const products = await productModel.find().lean()
	io.emit("products", products);

	productModel.watch().on("change", async change => {
		const products = await productModel.find().lean();
		io.emit("products", products);
	})
	

	socket.on("user", async (data) => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		})

		const messagesDB = await messageModel.find()
		io.emit("messagesDB", messagesDB)
	})

	socket.on("message", async (data) => {
		await messageModel.create({
			user: data.user,
			message: data.message,
		})

		const messagesDB = await messageModel.find()
		io.emit("messagesDB", messagesDB)
	})

	socket.on("disconnect", () => {
		console.log(`Client ${socket.id} disconnected`)
	})
})