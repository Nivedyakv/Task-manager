import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  UserShow: boolean = false;

  constructor(private router: Router) { }


  openMenu(): void {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu(): void {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

 //logout function
  
  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('').then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        timer: 1500,
        showConfirmButton: false
      });
    });
  }
}
