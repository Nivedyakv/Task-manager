import { Component,OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  UserShow: boolean = false;

  constructor(private roueter:Router) { }

  ngOnInit(): void {
    this.checkUser();
  }

  openMenu(): void {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu(): void {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  checkUser(): void {
    if (localStorage.getItem('token')) {
      this.UserShow = true;
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
   

  }
}
