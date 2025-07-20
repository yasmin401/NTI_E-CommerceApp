import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';

this.authService.login(this.user).subscribe({
  next: (res: any) => {
    this.isLoading = false;
    this.authService.saveToken(res.token);

    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.user._id);
    localStorage.setItem('user', JSON.stringify(res.user));

    this.router.navigate(['/']);
  },
  error: (err: any) => {
    this.isLoading = false;
    this.errorMessage = err?.error?.message || 'Login failed';
  }
});

  }


}
