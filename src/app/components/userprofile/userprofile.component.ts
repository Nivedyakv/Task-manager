import { Component,OnInit } from '@angular/core';
import { LogService } from '../../shared/userlogin/log.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit{
profileForm!: FormGroup;
  userData: any; 
  selectedFile: File | null = null;
    isPassword:boolean=true;
    profilePicture: string | ArrayBuffer | null = null;
    showPasswordChange: boolean = false;
   
  constructor(private formBuilder: FormBuilder, private loginService: LogService,private router:Router) { }
  ngOnInit(): void {
    this.fetchUserProfile(); 
    this.profileForm = this.formBuilder.group({
      username: [''],
      email: ['', Validators.email],
      mob: [''],
      oldPassword: [''],
      newPassword: ['',Validators.minLength(5)],
      confirmPassword: ['', Validators.minLength(5)]
    }, {
       validator: this.passwordMatchValidator 
       
    });
    this.fetchUserProfile(); 
}
  
  
  fetchUserProfile(): void {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.loginService.getUserData(username).subscribe((data: any[]) => {
        if (data.length > 0) {
          this.userData = data[0]; 
          this.profileForm.patchValue({
            username: this.userData.username,
            email: this.userData.email,
            mob: this.userData.mob,
            password: this.userData.password
          });
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
        };
  
        const id = this.userData.id;
        this.loginService.updateUserData(id, updatedUserData).subscribe(
          (response) => {
            Swal.fire('Success', 'Profile updated successfully', 'success');
  
            // Update username in sessionStorage
            sessionStorage.setItem('username', updatedUserData.username);
  
            // Fetch updated user profile data
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
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
}