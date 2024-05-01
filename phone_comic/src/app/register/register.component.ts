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
  showForm = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  registerForm: FormGroup = this.fb.group({
    username: [''],
    password: [''],
    firstname: [''],
    lastname: [''],
    email: [''],
  });

  fillForm() {
    this.registerForm.value.username = 'exampleman';
    this.registerForm.value.password = 'passyword';
    this.registerForm.value.email = 'example@for.server';
    this.registerForm.value.firstname = 'ex';
    this.registerForm.value.lastname = 'ample';
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
    const response = this.authService.register(formData).subscribe((res) => {
      console.log(res);
    });
  }
}
