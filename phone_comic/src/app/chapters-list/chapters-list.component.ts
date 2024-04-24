import { Component, OnInit } from '@angular/core';
// import { CHAPTERS } from 'src/app/mock-chapters';
import { Chapter } from '../chapter';
import { ChapterService } from '../chapter.service';
import { ChapterResponse } from '../chapterResponse';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.css'],
})
export class ChaptersListComponent implements OnInit {
  chapters: Chapter[];

  constructor(private chapterService: ChapterService) {}

  ngOnInit() {
    console.log('ngOnInit() from chaptersList component');
    this.initObservable();
  }

  initObservable() {
    console.log('attemping to call chapterservice');
    this.chapterService.getChapters().subscribe((chapters: ChapterResponse) => {
      if (chapters) {
        console.log(chapters);
        this.chapters = chapters.payload;
      }
    });
  }
}
