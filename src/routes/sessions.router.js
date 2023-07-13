import { Router } from "express";
import session from "express-session";

const sessions = Router();

sessions.use(
	session({
		secret: "SCoder",
		resave: true,
		saveUninitialized: true,
	})
);


function auth(req, res, next) {
	if (req.session?.user === "User" && req.session?.admin) {
		return next();
	};

	return res.status(401).send("Solo los administradores pueden ver este sitio")
};


sessions.get("/", (req, res) => {
	try {
		if (!req.session.counter) {
			req.session.counter = 1;
			return res.status(200).send(`Es tu primera vez en el sitio`);
		}

		req.session.counter++;
		return res
			.status(200)
			.send(`Visitaste el sitio ${req.session.counter} veces`);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});


sessions.get("/login", (req, res) => {
	try {
		const { user, password } = req.query;

		if (user !== "User" || password !== "Pass") {
			return res.status(500).send(`Credenciales incorrectas`);
		};

		req.session.user = user;
		req.session.admin = true;

		return res.status(200).send(`Bienvenido`);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});


sessions.get("/private", auth, (req, res) => {
	try {
		return res.status(200).send(`Si ves esto, eres admin`);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});


sessions.get("/logout", (req, res) => {
	try {
		req.session.destroy((err) => {

			if (!err) {
				return res.status(200).send(`Logout OK`);
			};

			return res.status(500).send({ status: `Logout error`, payload: err });
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default sessions;