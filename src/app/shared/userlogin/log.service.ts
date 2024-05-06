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
//signup
  signup(formData: any) {
    return this.http.post('http://localhost:3000/users', formData);
  }
//getting userdata
  getUserData(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }
  
  updateUserData(id: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
  }  
  
 //uploading picture
  uploadProfilePicture(userId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<any>(`http://localhost:3000/users/${userId}/profile-picture`, formData);
  }

  //for guard
  isAuthenticated: boolean = false;
  isAuthenticatedFunction(){
    const username=sessionStorage.getItem('username')
    if(username){
      this.isAuthenticated=true;
    }
        return this.isAuthenticated;
          }   
    }
    
  
  
