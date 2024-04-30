import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/myinterface';
@Injectable({
  providedIn: 'root'
})
export class TaskmanagerService {
  
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  // Method to fetch tasks from the API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  getT(id:string):Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Method to update an existing task
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  // Method to delete a task
  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
}