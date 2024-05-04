import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectAccountSession,
  selectLoginStatus,
} from '../ngrx/account.selector';
import { logoutAction } from '../ngrx/counter.actions';
import { AccountSession } from '../types/AccountSession';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent implements OnInit {
  accountSession: AccountSession = {
    username: '',
    member: false,
    registerDate: '',
    firstName: '',
    lastName: '',
    lastChapterRead: 0,
    lastPageRead: 0,
    email: '',
  };
  loginStatus: boolean = false;

  loginStatus$: Observable<boolean> = this.store.select(selectLoginStatus);
  accountSession$: Observable<AccountSession> =
    this.store.select(selectAccountSession);

  constructor(private store: Store) {}

  ngOnInit() {
    this.loginStatus$.subscribe((status) => {
      console.log('111A', status);
      this.loginStatus = status;
    });
    this.accountSession$.subscribe((accountSession) => {
      console.log('111B', accountSession);
      this.accountSession = accountSession;
    });
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
