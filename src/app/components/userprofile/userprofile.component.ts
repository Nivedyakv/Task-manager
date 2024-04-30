import { Component,OnInit } from '@angular/core';
import { LogService } from '../../shared/userlogin/log.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../interfaces/myinterface';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit{
  
}