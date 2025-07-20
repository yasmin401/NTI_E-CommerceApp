import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  constructor(private router: Router) {
    console.log('TOKEN:', localStorage.getItem('token'));
  }

  goToCart(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }
    this.router.navigate(['/cart']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
  isAdmin(): boolean {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.log('No user in localStorage');
      return false;
    }

    try {
      const user = JSON.parse(userString);
      console.log('User from localStorage:', user);
      return user.role === 'admin';
    } catch (error) {
      console.error('Failed to parse user JSON:', error);
      return false;
    }
  }



}
