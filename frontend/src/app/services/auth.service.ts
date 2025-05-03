// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  logout() {
    this.removeToken(); // Remove token from storage
    this.router.navigate(['/']); // Redirect to login page
  }
  signup(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }


  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // Assuming you're storing token in localStorage
  }
  // Store token in localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Remove token from localStorage (on logout)
  removeToken(): void {
    localStorage.removeItem('token');
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      const decodedToken = this.decodeToken(token);  // Decode token to extract userId
      return decodedToken?.userId || null;  // Return the userId if it exists in the decoded token
    }
    return null;  // If no token, return null
  }

  // Decode JWT Token
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Extract the payload part of the JWT
      const decoded = atob(payload); // Decode the base64 payload
      return JSON.parse(decoded);  // Parse the decoded payload to get the data
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}
