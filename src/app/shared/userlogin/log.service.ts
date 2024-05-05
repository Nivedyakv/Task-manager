import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Users } from '../../interfaces/myinterface';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class LogService {
 
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  
  //for login
  checkCredentials(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}&password=${password}`);
  }

  signup(formData: any) {
    return this.http.post('http://localhost:3000/users', formData);
  }

  getUserData(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }
  
  updateUserData(id: number, userData: any): Observable<any> {
    // Assuming the API endpoint is /users/{id}
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
  }  
  
 
  uploadProfilePicture(userId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<any>(`http://localhost:3000/users/${userId}/profile-picture`, formData);
  }

  isAuthenticated: boolean = false;
  isAuthenticatedFunction(){
    const username=sessionStorage.getItem('username')
    if(username){
      this.isAuthenticated=true;
    }
        return this.isAuthenticated;
          }   

    }
    
  
  
