import { Router } from "express";
const views = Router();

import products from "../data/products.json" assert { type: "json" };


views.get("/", (req, res) => {
	res.render("home", {
		style: "styles.css",
		documentTitle: "Home",
		products
	});
});

views.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "styles.css",
		documentTitle: "Socket",
	});
});


views.get("/chat", (req, res) => {
	res.render("chat", {
		style: "styles.css",
		documentTitle: "Chat",
	});
});

export default views;