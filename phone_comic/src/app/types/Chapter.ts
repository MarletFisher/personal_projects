import { Page } from './Page';

export interface Chapter {
  chapterNumber: number;
  title: string;
  dateRelease: string;
  pages: Page[];
}
