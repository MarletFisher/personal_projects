import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, throttleTime } from 'rxjs';
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
  ) {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe((event) => this.onWindowScroll(event));
  }

  ngOnInit(): void {
    const chapterNum = Number(
      this.route.snapshot.paramMap.get('chapterNumber')
    );
    this.chapterService.getChapterById(chapterNum);
    this.initObservable(chapterNum);
  }

  // @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    console.log('scrolling');
    // Logic to handle the scroll events will go here
    // console.log('onWindowScroll() called. Event: ', event);
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const sections: any = document.querySelectorAll('.mangaPage');

    sections.forEach((section: HTMLElement) => {
      if (
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        let navLinks: any = document.querySelectorAll('.navbar a');
        navLinks.forEach((link: HTMLAnchorElement) => {
          if (link.href.includes(section.id)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
    // this adds a class to the active scrolled page
  }

  // getChapter() {
  //   const num = Number(this.route.snapshot.paramMap.get('chapterNumber'));
  //   this.chapterService.getChapterById(num).subscribe((chapter: Chapter) => {
  //     console.log('In subscribe, data:', chapter);
  //     this.displayChapter = chapter;
  //   });
  // }

  initObservable(id: number) {
    this.chapterService.getChapterObsById(id).subscribe((chapter) => {
      if (chapter) {
        this.displayChapter = chapter;
      }
    });
  }

  checkIndex(index: number) {
    return Math.abs(this.currentPage - index) < 10;
  }
}
