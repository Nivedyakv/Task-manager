import { Component, OnInit } from '@angular/core';
import { LogService } from '../../shared/userlogin/log.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {
  profileForm!: FormGroup;
  userData: any;
  // selectedFile: File | null = null;
  isPassword: boolean = true;
  profilePicture: string | ArrayBuffer | null = null;
  showPasswordChange: boolean = false;
  imageUrl!: string;
  constructor(private formBuilder: FormBuilder, private loginService: LogService, private router: Router) { }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      username: [''],
      email: ['', Validators.email],
      mob: [''],
      oldPassword: ['', Validators.minLength(5)],
      newPassword:  ['', [Validators.required, Validators.minLength(5), this.passwordValidator]],
      confirmPassword: ['', Validators.minLength(5)],
      proPic: ['']
    }, {
      validator: this.passwordMatchValidator

    });
    this.fetchUserProfile();

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

  fetchUserProfile(): void {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.loginService.getUserData(username).subscribe((data: any) => {
        if (data.length > 0) {
          this.userData = data[0];
          this.profileForm.patchValue({
            username: this.userData.username,
            email: this.userData.email,
            mob: this.userData.mob,
            password: this.userData.password
            
          });
          this.imageUrl = this.userData.proPic
        }
      });
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const oldPassword = this.profileForm.value['oldPassword'];
      const newPassword = this.profileForm.value['newPassword'];
      if (this.userData.password === oldPassword || !oldPassword) {
        let updatedPassword = newPassword;
        if (!newPassword) {
          updatedPassword = this.userData.password;
        }
        const updatedUserData = {
          username: this.profileForm.value['username'],
          mob: this.profileForm.value['mob'],
          email: this.profileForm.value['email'],
          password: updatedPassword,
          proPic: this.imageUrl,
        };

        const id = this.userData.id;
        this.loginService.updateUserData(id, updatedUserData).subscribe(
          (response) => {
            Swal.fire('Success', 'Profile updated successfully', 'success');
            // Update username in sessionStorage
            sessionStorage.setItem('username', updatedUserData.username);
            this.fetchUserProfile();
          },
          (error) => {
            Swal.fire('Error', 'Failed to update profile', 'error');
          }
        );
        this.router.navigateByUrl('/dashboard');
      } else {
        this.isPassword = false;
      }
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}