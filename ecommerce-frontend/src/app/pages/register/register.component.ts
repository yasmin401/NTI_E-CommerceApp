import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.user)); 
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Registration failed';
      }
    });
  }
}
