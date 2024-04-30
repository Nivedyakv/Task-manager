import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogService } from '../../shared/userlogin/log.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  formSubmitted = false;
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LogService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  Login() {
    if (this.form.valid) {
      const formValue:any = this.form.value;
      console.log(formValue);
      this.loginService.loginget(formValue).subscribe(
        (response: any) => {
        console.log(response);
          if (response.username) {
           
            this.router.navigate(['/dashboard']);
            Swal.fire({
              title: 'Good job!',
              text: 'Login successful!',
              icon: 'success'
            });
          } else {
            Swal.fire({
              title: 'Wrong Username or Password?',
              text: 'Try to login again..',
              icon: 'question'
            });
          }
        },
        (error) => {
          console.error('Login error:', error);
          Swal.fire({
            title: 'Error',
            text: 'An error occurred. Please try again later.',
            icon: 'error'
          });
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  Signup() {
    this.router.navigateByUrl('/signup');
  }
}