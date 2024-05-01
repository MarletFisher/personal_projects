import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Chapter } from '../types/Chapter';
// import { CHAPTERS } from '../mock-chapters';

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

  getChapterObsById(chaptNum: number): Observable<Chapter> {
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
