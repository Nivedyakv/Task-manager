import { Component,OnInit } from '@angular/core';
import { Task } from '../../interfaces/myinterface';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.scss'
})
export class ViewTaskComponent implements OnInit{
  task: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskmanagerService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const taskId = params['taskId'];
      if (taskId) {
        this.viewTaskDetails(taskId);
      }
    });
  }

  viewTaskDetails(taskId: string): void {
    this.taskService.getT(taskId)
      .subscribe(task => {
        this.task = task;
      }, error => {
        console.error('Error fetching task details:', error);
        // Handle error accordingly, e.g., show a toast message
      });
  }

  editTask(): void {
    // Navigate to the edit task page, passing task ID as a query parameter
    if (this.task) {
      this.router.navigate(['/edit-task'], { queryParams: { taskId: this.task.id } });
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id)
        .subscribe(() => {
          // After successful deletion, navigate back to the dashboard or any other desired page
          this.router.navigate(['/dashboard']);
        }, error => {
          console.error('Error deleting task:', error);
          // Handle error accordingly, e.g., show a toast message
        });
    }
  }

  changeStatus(): void {
    if (this.task) {
      // Implement logic to change task status, either by calling a service method or handling it locally
      // Example:
      if (this.task.status === 'Pending') {
        this.task.status = 'Completed';
      } else {
        this.task.status = 'Pending';
      }

      // Call service method to update task status
      this.taskService.updateTask(this.task)
        .subscribe(updatedTask => {
          // Optionally, update the local task object with the updated task received from the service
          this.task = updatedTask;
        }, error => {
          console.error('Error updating task:', error);
          // Handle error accordingly, e.g., show a toast message
        });
    }
  }
}