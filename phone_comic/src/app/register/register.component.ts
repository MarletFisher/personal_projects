import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RegisterForm } from '../types/RegisterForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  testUserIteration = 0;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  registerForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
    firstname: [''],
    lastname: [''],
    email: [''],
  });

  fillForm() {
    const ctrls = this.registerForm.controls;
    ctrls['username'].setValue('exampleman' + this.testUserIteration);
    ctrls['password'].setValue('passyword');
    ctrls['email'].setValue('example' + this.testUserIteration + '@gmail.com');
    ctrls['firstname'].setValue('example' + this.testUserIteration);
    ctrls['lastname'].setValue('man');
    this.testUserIteration++;
  }

  registerUser() {
    console.log('Button clicked.');

    const formData: RegisterForm = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
    };
    console.log(formData);
    const response = this.authService
      .register(formData)
      .subscribe((response) => {
        console.log('Response:', response);
      });
    console.log(response);
    // this.authService.register(formData).subscribe((res) => {
    //   console.log(res);
    // });
  }
}
