import { Component, OnInit } from '@angular/core';
 import { Task } from '../../interfaces/myinterface';
import { TaskmanagerService } from '../../shared/Task/taskmanager.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PiechartComponent } from '../piechart/piechart.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,HttpClientModule,PiechartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: string = 'all'; // Default filter value
isUpdateChart:boolean=false;
  constructor(private taskService: TaskmanagerService,private router: Router) { }
  
  ngOnInit(): void {
    this.getTasks(); 
  }
  //
  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.filterTasks(); 
    });
  }
  //
  filterTasks() {
    if (this.selectedStatus === 'all') {
      this.filteredTasks = this.tasks; 
    } else if (this.selectedStatus === 'pending') {
      this.filteredTasks = this.tasks.filter(task => task.status !== 'Completed');
    } else if (this.selectedStatus === 'overdue') {
      const currentDate = new Date();
      this.filteredTasks = this.tasks.filter(task => {
       
        return task.status !== 'Completed' && new Date(task.dueDate) < currentDate;
      });
    }else if(this.selectedStatus ==='Completed'){
      this.filteredTasks = this.tasks.filter(task => task.status === 'Completed');
    }
  
     else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.selectedStatus);
    }
  }

  toggleCompleted(task: Task) {
    task.status = task.status === 'Completed' ? 'pending' : 'Completed';
    this.taskService.updateTask(task).subscribe(updatedTask => {
     
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.filterTasks(); // Reapply filtering
      }
    });
  }

  markAsCompleted(task: any) {
    if (task.status !== 'Completed') {
      task.status = 'Completed';
      console.log('Task marked as Completed:', task);
     
      this.taskService.updateTask(task).subscribe(() => {
        this.filterTasks(); 
      });
    }
  }

  deleteTask(taskId: number) {
 this.isUpdateChart=false;   
    this.taskService.deleteTask(taskId).subscribe(() => {
      
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      
      this.filterTasks();
      this.isUpdateChart=true; 
    });
  }

  go() {
    this.router.navigateByUrl('/addtask');
  }
  view(id:any){

    this.router.navigate(['/view'],{queryParams:{taskId:id}});
  
}
}



