import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'taskmanager';
  public userShow=false;
  public loginshow=true;
  
  constructor(private router:Router){}

  User(){
    if(localStorage.getItem('token')){
      this.userShow=true;
      this.loginshow=false;
    } 
  }


  logout(){
    sessionStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      timer: 1500,
      showConfirmButton: false
    });  
    this.router.navigateByUrl('login');
   

  }

   ngOnInit(): void {
    this.User();
   }

  
}



