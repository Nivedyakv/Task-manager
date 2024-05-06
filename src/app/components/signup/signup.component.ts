import { Component ,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LogService } from '../../shared/userlogin/log.service';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { Task } from '../../interfaces/myinterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  constructor(private formBuilder: FormBuilder, private logService: LogService,private router:Router) { }
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), this.passwordValidator]],
      proPic: [''],
    });
  }
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
  // onsubmit
  onSubmit() {
    if (this.signupForm.valid) {   
        this.logService.signup(this.signupForm.value).subscribe(
        response => {
          Swal.fire('Success!', 'User signed up successfully!', 'success');
          this.router.navigateByUrl('');
        },
        error => {
          Swal.fire('Error!', 'Failed to sign up user!', 'error');
          console.error('Signup failed:', error);
        }
      );
    } else {
      Swal.fire('Validation Error', 'Please fill out all fields correctly', 'error');
     
    }
  }
}