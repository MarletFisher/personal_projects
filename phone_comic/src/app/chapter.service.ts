import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { Chapter } from './chapter';
import { CHAPTERS } from './mock-chapters';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  constructor(private http: HttpClient) {}

  getChapters(): Observable<any> {
    // const chapters = of(CHAPTERS);
    // return chapters;

    console.log('In api service call getChapters');
    const chapters$ = this.http.get('http://localhost:3000/api/chapters');
    return chapters$;
  }

  getChapterObsById(id: number): Observable<Chapter> {
    console.log('getChapterObsById called');
    for (let i = 0; i < CHAPTERS[i].chapterNumber; i++) {
      if (id == CHAPTERS[i].chapterNumber) {
        const chapter = of(CHAPTERS[i]);
        return chapter;
      }
    }
    return of(CHAPTERS[0]);
  }

  /*getChapterById(id: number): Chapter {
    // to be refactored into API call
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (id === CHAPTERS[i].chapterNumber) {
        return CHAPTERS[i];
      }
    }
    return CHAPTERS[0];
  }*/

  getChapterById(chaptNum: number): Observable<Chapter> {
    const url: string = 'http://localhost:3000/api/chapter/' + chaptNum;
    const chapter$ = this.http.get(url).pipe(
      tap((data) => console.log('In tap 1, data: ', data)),
      map((data: any) => {
        const chapter = data;
        return chapter;
      })
    );
    return chapter$;
  }
}
