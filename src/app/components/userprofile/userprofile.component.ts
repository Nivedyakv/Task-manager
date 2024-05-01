import { Component,OnInit } from '@angular/core';
import { LogService } from '../../shared/userlogin/log.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../interfaces/myinterface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit{
  profileForm!: FormGroup;
  profilePicture!: string;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private logService: LogService,
    
  ) { }

  ngOnInit(): void {
    this.initProfileForm();
    this.fetchUserProfile();
  }

  initProfileForm(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mob: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  fetchUserProfile(): void {
    
    // this.userId = this.logService.getCurrentUserId();
    // this.logService.getUserProfile(this.userId).subscribe(
    //   (profileData) => {
    //     this.profileForm.patchValue({
    //       username: profileData.username,
    //       email: profileData.email,
    //       mob: profileData.mob
    //       // Add more fields if necessary
    //     });
    //     this.profilePicture = profileData.profilePicture; // Assuming you have a profile picture field
    //   },
    //   (error) => {
    //     console.error('Failed to fetch user profile:', error);
    //   }
    // );
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const updatedProfileData = { ...this.profileForm.value, id: this.userId };
      this.logService.updateProfile(updatedProfileData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          // Optionally, display a success message to the user
        },
        (error) => {
          console.error('Failed to update profile:', error);
          // Optionally, display an error message to the user
        }
      );
    } else {
      // Optionally, display validation error messages to the user
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // Implement logic to handle file upload (if needed)
  }
}