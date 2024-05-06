import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  taskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskmanagerService) { }

  //perform initialization tasks 
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: [false, Validators.required]
    });
  }

  //onsubmiting logic
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Task added successfully'
        });

        this.taskForm.reset();
        this.router.navigate(['/dashboard']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error adding task'
        });

      });


    } else {

      this.taskForm.markAllAsTouched();
    }
  }

}