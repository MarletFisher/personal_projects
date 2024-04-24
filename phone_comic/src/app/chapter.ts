import { Page } from './page';

export interface Chapter {
  chapterNumber: number;
  title: string;
  pages: Page[];
}
