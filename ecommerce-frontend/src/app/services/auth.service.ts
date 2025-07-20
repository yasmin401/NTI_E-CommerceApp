import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/register`, user);
  }
  login(user: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, user);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
