import express from 'express'
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import passport from "passport" 
import router from './routes/router.js';
import initializePassport from "./config/passport.config.js" 
import session from "express-session"
import config from './config/enviroment.config.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';


const mongoUrl = config.MONGO_URL;
const mongoSessionSecret = config.MONGO_URL;
const cookieSecret = config.COOKIE_SECRET;
const PORT = config.PORT;
const HOST = config.HOST;



/* mongoose.connect ("mongodb+srv://matiasguarnaccia:nQh4azEOa0EOAEYU@cluster0.itl8iiw.mongodb.net/?retryWrites=true&w=majority") */


const app = express()



const enviroment = async () => {
	await mongoose.connect(mongoUrl);
};
enviroment();
initializePassport();
app.use(
	session({
		store: MongoStore.create({ mongoUrl }),
		secret: mongoSessionSecret,
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
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(cookieSecret));





app.get('/', (req,res) => {
	res.send("HOME")
});

app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`)
});

router(app);


