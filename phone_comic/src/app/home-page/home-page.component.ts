import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../ngrx/counter.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  authService = inject(AuthService);
  private store = inject(Store);
  count$?: Observable<number>;

  constructor() {
    // this.authService
    //   .login({
    //     username: 'kminchelle',
    //     password: '0lelplR',
    //   })
    //   .subscribe((r) => {
    //     console.log(r);
    //   });
    this.count$ = this.store.select('counter');
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
    });
  }
}
