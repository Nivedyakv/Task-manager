import { Component,OnInit } from '@angular/core';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit{
taskForm!: FormGroup;
task: any; 
editMode: boolean = true;
taskId!: string;
priorityOptions: string[] = ['Low', 'Medium', 'High'];
statusOptions: string[] = ['Pending', 'Completed', 'Overdue'];

constructor(private formBuilder: FormBuilder,private taskService: TaskmanagerService,  private router: Router, private route: ActivatedRoute ) {}

ngOnInit(): void {
  this.taskForm = this.formBuilder.group({
    title: ['',Validators.required],
    description: [''],
    dueDate: [''],
    priority: [''],
    status: ['']
  });
  this.route.queryParams.subscribe(params => {
    const taskId = params['taskId'];
    if (taskId) {
      this.getTaskDetails(taskId);
    }
  });
}
//show the details on the field
getTaskDetails(taskId: string): void {
  this.taskService.getT(taskId).subscribe(
    (task: any) => {
      this.task = task;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status
      });
    });
}
  updateTaskView(): void {
    this.editMode = !this.editMode;
  }
  // Method to save task 
  saveTask(): void {
    if (this.taskForm.valid && this.task) { 
      const updatedTaskData = this.taskForm.value; 
      this.task = { ...this.task, ...updatedTaskData };
      this.taskService.updateTask(this.task).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Task Edited and saved successfully.'
          });
          // this.editMode = false; // Exit edit mode
          this.router.navigate(['/dashboard']);
        } );
    }
  }
  // Method to delete task
  deleteTask(): void {
    this.taskService.deleteTask(this.task.id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Task deleted successfully.'
        }).then(() => {
          this.router.navigate(['/dashboard']); 
        });
      },
      (error) => { 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error deleting task.'
        });
      }
    );
  }


}