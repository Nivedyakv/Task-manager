import { Component, OnInit } from '@angular/core';
 import { Task } from '../../interfaces/myinterface';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'all'; // Default filter value

  constructor(private taskService: TaskmanagerService,private router: Router) { }
  //constructor(private formBuilder: FormBuilder, private router: Router) {
  ngOnInit(): void {
    this.getTasks(); // Fetch tasks from the database when the component is initialized
  }
  
  getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks; // Initialize filtered tasks with all tasks
      this.filterTasks(); // Apply default filter
    });
  }
  
  filterTasks() {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.tasks; // Show all tasks
    } else if (this.selectedStatus === 'pending') {
      this.filteredTasks = this.tasks.filter(task => task.status !== 'completed');
    } else if (this.selectedStatus === 'overdue') {
      const currentDate = new Date();
      this.filteredTasks = this.tasks.filter(task => {
        // Check if task due date is before current date
        return task.status !== 'completed' && new Date(task.dueDate) < currentDate;
      });
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  toggleCompleted(task: Task) {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    this.taskService.updateTask(task).subscribe(updatedTask => {
      // Update the task in the tasks array
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.filterTasks(); // Reapply filtering
      }
    });
  }

  markAsCompleted(task: any) {
    if (task.status !== 'completed') {
      task.status = 'completed';
      console.log('Task marked as completed:', task);
      // Assuming you want to update the task in the database, call the updateTask method here
      this.taskService.updateTask(task).subscribe(() => {
        this.filterTasks(); // Reapply filtering after updating the task
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      // Remove the task with the matching ID from the tasks array
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      // Also update the filtered tasks to reflect the changes
      this.filterTasks();
    });
  }

  go() {
    this.router.navigateByUrl('/addtask');
  }
  view(id:any){

    this.router.navigate(['/view'],{queryParams:{taskId:id}});
  
}
}



