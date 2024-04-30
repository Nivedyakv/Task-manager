import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
 import { Task } from '../../interfaces/myinterface';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  newTask: Task | any= {
    // id: 0,
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low', // Set default priority here
    status: 'Pending' ,// Default status
    username:''
  };

  // newTask:any = {};

  constructor(private taskService: TaskmanagerService,private router:Router) { }

  onSubmit(taskForm: NgForm) {
    this.newTask.username=localStorage.getItem('username');
    this.taskService.createTask(this.newTask).subscribe(() => {

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Task added successfully'
      });
      // Reset the form after successful submission
      this.resetForm(taskForm);
      this.router.navigate(['/dashboard']);
     
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding task'
      });
      console.error('Error adding task:', error);
    });
  }

  private resetForm(taskForm: NgForm) {
    taskForm.resetForm();
    this.newTask = {
      // id: ,
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low', // Reset default priority
      status: 'Pending' // Reset status
    };
  }
}


