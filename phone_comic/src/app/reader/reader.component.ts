import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/chapter';
import { ChapterService } from '../chapter.service';
// import { chaptersList } from 'src/assets/chapters';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  displayChapter: Chapter;
  currentPage = 0;
  chapters: Chapter[] = [];
  constructor(
    private chapterService: ChapterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const chapterNum = Number(
      this.route.snapshot.paramMap.get('chapterNumber')
    );
    this.chapterService.getChapterById(chapterNum);
    this.initObservable(chapterNum);
  }

  /*getChapters(): void {
    const chapterNum = String(
      this.route.snapshot.paramMap.get('chapterNumber')
    );
    this.chapterService
      .getChapters()
      .subscribe((chapters) => (this.chapters = chapters));
  }*/

  getChapter() {
    const num = Number(this.route.snapshot.paramMap.get('chapterNumber'));
    this.chapterService.getChapterById(num).subscribe((chapter: Chapter) => {
      console.log('In subscribe, data:', chapter);
      this.displayChapter = chapter;
    });
  }

  initObservable(id: number) {
    this.chapterService.getChapterObsById(id).subscribe((chapter) => {
      if (chapter) {
        this.displayChapter = chapter;
      }
    });
  }

  // images = [
  //   {
  //     title: 'jjba-p5-ch15-p40a',
  //     src: './assets/chapter15/40.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p40b',
  //     src: './assets/chapter15/40_1.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p41a',
  //     src: './assets/chapter15/41.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p41b',
  //     src: './assets/chapter15/41_1.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p42',
  //     src: './assets/chapter15/42.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p43',
  //     src: './assets/chapter15/43.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p44',
  //     src: './assets/chapter15/44.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p45a',
  //     src: './assets/chapter15/45.jpg',
  //   },
  //   {
  //     title: 'jjba-p5-ch15-p45b',
  //     src: './assets/chapter15/45_1.jpg',
  //   },
  // ];

  // getClass() {
  //   // series of checks to return different classes
  //   const classes = [];

  //   if (something()) {
  //     return classes.push('active');
  //   }
  //   if (somethingElse()) {
  //     return classes.push('loading');
  //   }
  //   if (somethingOther()) {
  //     return classes.push('inactive');
  //   }
  // }

  checkIndex(index: number) {
    return Math.abs(this.currentPage - index) < 10;
  }
}
