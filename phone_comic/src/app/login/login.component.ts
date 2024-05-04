import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectAccountSession,
  selectLoginStatus,
} from '../ngrx/account.selector';
import { loginAction } from '../ngrx/counter.actions';
import { AuthService } from '../services/auth.service';
import { AccountSession } from '../types/AccountSession';
import { LoginRequest } from '../types/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userSession: AccountSession;
  // private store = inject(Store);
  loginStatus: false;
  // ngrx selector test
  loginStatus$ = this.store.select(selectLoginStatus);
  accountSession$ = this.store.select(selectAccountSession);
  loginMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {}

  loginForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  ngOnInit() {
    // this.loginStatus$ = this.store.select(selectLoginStatus);

    this.accountSession$.subscribe((account) => {
      console.log('000A - account:', account);
    });

    this.loginStatus$.subscribe((loginStatus) => {
      console.log('000B - loginStatus:', loginStatus);
      this.loginStatus = loginStatus;
    });
  }

  loginUser() {
    const user: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    console.log(user);

    this.authService.loginUser(user).subscribe((res: any) => {
      console.log('Response:', res);
      this.userSession = {
        username: res.username,
        member: res.member,
        registerDate: res.registerDate,
        firstName: res.firstName,
        lastName: res.lastName,
        lastChapterRead: res.lastChapterRead,
        lastPageRead: res.lastPageRead,
        email: res.email,
      };
      console.log('user: ', this.userSession);

      // NGRX section
      if (res.error) {
        this.loginMessage = 'Incorrect username or password.';
        console.log('333A', res.error);
      } else {
        console.log('333B', res.error);
        this.store.dispatch(loginAction({ account: this.userSession }));
      }
    });
  }

  fillCorrect() {
    const ctrls = this.loginForm.controls;
    ctrls['username'].setValue('exampleman0');
    ctrls['password'].setValue('passyword');
  }

  fillFalse() {
    const ctrls = this.loginForm.controls;
    ctrls['username'].setValue('wrongUser');
    ctrls['password'].setValue('wrongPass');
  }
}
