import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../ngrx/counter.actions';
import { AuthService } from '../services/auth.service';
import { AccountSession } from '../types/AccountSession';
import { LoginRequest } from '../types/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginMessage: string;
  userSession: AccountSession;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {}

  loginForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

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
        firstName: res.firstname,
        lastName: res.lastName,
        lastChapterRead: res.lastChapterRead,
        lastPageRead: res.lastPageRead,
        email: res.email,
      };
      console.log('user: ', this.userSession);

      // NGRX section
      this.store.dispatch(login({ account: this.userSession }));
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
