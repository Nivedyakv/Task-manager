import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Users } from '../../interfaces/myinterface';
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
 
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  
  // loginget(payload:any) {
  //   return this.http.post('http://localhost:3000/users',payload);
  // }
  checkCredentials(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}&password=${password}`);
  }
  
  signup(formData: any) {
    return this.http.post('http://localhost:3000/users', formData);
  }
  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}`).pipe(
      catchError((error: any) => {
        console.error('Error fetching user details:', error);
        throw error;
      })
    );
  }
  updateProfile(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  }
  
  changePassword(passwordData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, passwordData);
  }
  getUserProfile() {
    return this.http.get<Users>(`${this.apiUrl}/profile`);
  }
}
  
  
