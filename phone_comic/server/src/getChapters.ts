import { Request, Response } from "express";
import { CHAPTERS } from "./assets/chapterStructure";

export function getChapters(req: Request, res: Response) {
	console.log("Getting all chapters...");

	res.status(200).json({
		version: "1.00",
		payload: CHAPTERS,
	});
}
