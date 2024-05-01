import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterForm } from '../types/RegisterForm';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  constructor() {}

  register(registration: RegisterForm): Observable<any> {
    console.log('register authservice called');

    const httpOptions = {
      // add jwt below content type
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    console.log('returning from authservice');
    return this.http.post(
      'http://localhost:3000/api/registerUser',
      registration,
      httpOptions
    );
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http
      .post('https://dummyjson.com/auth/login', user)
      .pipe(
        tap((response: any) => this.doLoginUser(user.username, response.token))
      );
  }

  private doLoginUser(username: string, token: any) {
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getCurrentAuthUser() {
    let token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get('https://dummyjson.com/auth/me');
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }
}
