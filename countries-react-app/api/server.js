const express = require("express");
const cors = require("cors");
require("dotenv").config();

const CountriesDB = require("./modules/countriesDB.js");
const db = new CountriesDB();

const app = express();

const HTTP_PORT = process.env.PORT || 8080;
MONGODB_CONN_STRING = `mongodb+srv://frankduh:RaUKt7Zi80qvDXnL@na-xcheng6-web322.4wdnbqd.mongodb.net/?retryWrites=true&w=majority&appName=na-xcheng6-web322`;

// Middlewares
app.use(cors()); // Cross origin resource sharing
app.use(express.json()); // json parser

// export default app;

app.get("/", (req, res) => {
	res.send({ message: "API Listening" });
});

app.post("/api/countries", (req, res) => {
	db.addNewCountry(req.body)
		.then((country) => {
			res.status(201).json(country);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

app.get("/api/countries", (req, res) => {
	let page = req.query.page ? parseInt(req.query.page) : 1;
	let perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
	let name = req.query.name ? req.query.name : "";

	db.getAllCountries(parseInt(page), parseInt(perPage), name)
		.then((countries) => {
			res.json(countries);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

// app.get("/api/countries", (req, res) => {
// 	const { page = 1, perPage = 5, name = "" } = req.query;
// 	db.getAllCountries(parseInt(page), parseInt(perPage), name)
// 		.then((countries) => res.json(countries))
// 		.catch((err) => res.status(500).json({ error: err.message }));
// });

app.get("/api/countries/:id", (req, res) => {
	db.getCountryById(req.params.id)
		.then((country) => {
			if (country) {
				res.json(country);
			} else {
				res.status(404).json({ message: err.message });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

app.put("/api/countries/:id", (req, res) => {
	db.updateCountryById(req.body, req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

app.delete("/api/countries/:id", (req, res) => {
	db.deleteCountryById(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

db.initialize(process.env.MONGODB_CONN_STRING)
	.then(() => {
		app.listen(HTTP_PORT, () => {
			console.log(`server listening on: ${HTTP_PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
