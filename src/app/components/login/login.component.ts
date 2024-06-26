import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogService } from '../../shared/userlogin/log.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
 
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LogService
  ) { }
  //initilization

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), this.passwordValidator]]
    });
  }
  //for validation password
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password: string = control.value;
    
    const hasNumber = /\d/.test(password);
    const hasCapital = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
  
    if (!hasNumber || !hasCapital || !hasLowercase) {
      return { 'invalidPassword': true };
    }
    
    return null;
  }
  //login function
  login(): void {

    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      this.loginService.checkCredentials(username, password).subscribe(
        (response) => {
          console.log(response);
          if (response && response.length > 0) {

            sessionStorage.setItem('username', username)
            this.router.navigateByUrl('/dashboard');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Credentials',
              text: 'Please enter valid username and password.'
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'An error occurred while logging in. Please try again later.'
          });
        }
      );
    }
  }
// roueter to signup
  Signup() {
    this.router.navigateByUrl('/signup');
  }
}