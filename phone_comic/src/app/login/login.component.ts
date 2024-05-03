import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '../ngrx/counter.actions';
import { AuthService } from '../services/auth.service';
import { AccountSession } from '../types/AccountSession';
import { LoginRequest } from '../types/LoginRequest';
import { selectUserSession, selectloginStatus } from '../ngrx/account.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginMessage: string;
  userSession: AccountSession;

  selectUserSession$ = this.store.select(selectUserSession);

  selectloginStatus$ = this.store.select(selectloginStatus);

  loginStatus = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {}

  loginForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  ngOnInit(): void {
    this.selectUserSession$.subscribe((userSession) => {
      console.log('In subscribe 0000 userSession :', userSession);
    });

    this.selectloginStatus$.subscribe((logStatus) => {
      console.log('In subscribe 1111 userSessloginStatusion :', logStatus);
      this.loginStatus = logStatus;
    });
  }

  loginUser() {
    const user: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    console.log('In login page 111, user: ', user);

    this.authService.loginUser(user).subscribe((res: any) => {
      console.log('Response:', res);
      this.userSession = {
        username: res.username,
        member: res.member,
        registerDate: res.registerDate,
        firstName: res.firstname,
        lastName: res.lastName,
        lastChapterRead: res.lastChapterRead,
        lastPageRead: res.lastPageRead,
        email: res.email,
      };
      // console.log('user: ', this.userSession);
      console.log(
        'In login page, after get respone, 222, this.userSession: ',
        this.userSession
      );

      // NGRX section
      this.store.dispatch(loginAction({ account: this.userSession }));
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

// function selectUserSession(state: object): unknown {
//   throw new Error('Function not implemented.');
// }
