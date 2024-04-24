import { Request, Response } from 'express';
import { CHAPTERS } from './assets/chapterStructure';

export function getChapterByNumber(req: Request, res: Response) {
  const allChapters = CHAPTERS;
  const reqChapterNumber: Number = Number(req.params['chapterNumber']);
  const chapter = allChapters.find((c) => c.chapterNumber === reqChapterNumber);

  console.log(
    'getChapterById... reqChapterNumber: ',
    req.params['chapterNumber']
  );

  res.status(200).json(chapter);
}
