import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private logService: LogService,private router:Router) {
    
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
     
        this.router.navigateByUrl('');
       
    
      
      console.log(this.signupForm.value);
      this.logService.signup(this.signupForm.value).subscribe(
        response => {
          Swal.fire('Success!', 'User signed up successfully!', 'success');
         
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