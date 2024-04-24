import * as express from "express";

import { Request, Response } from "express";
import { getChapterByNumber } from "./src/getChapterByNumber";
import { getChapters } from "./src/getChapters";

const app = express();
const cors = require("cors");

app.use(cors({ origin: true }));

// Middleware
app.use(express.json());

// get test
app.route("/").get((req: Request, res: Response) => {
	return res.send("Chapter API is working");
});

app.route("/api/chapters").get(getChapters);

app.get("/api/chapter/:chapterNum", getChapterByNumber);

app.listen(3000, () => {
	console.log("Application listening at http://localhost:3000");
});

/*
const express = require("express");
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

app.listen(PORT, () =>
	console.log(`it's alive on port http://localhost:${PORT}`)
);

app.get("/tshirt", (req, res) => {
	res.status(200).send({
		// data payload JSON
		tshirt: "👕",
		size: "large",
	});
});

app.post("/tshirt/:id", (req, res) => {
	const { id } = req.params;
	const { logo } = req.body;

	if (!logo) {
		res.status(418).send({ message: "We need a logo!" });
	}

	res.send({
		tshirt: `👕 with your ${logo} and ID of ${id}`,
	});
});
*/
