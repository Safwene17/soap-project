import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';  // Import tap operator for side-effects

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  employeePayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.employeePayload = this.decodedToken(); // Initialize employeePayload
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/employees/login', { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.storeToken(response.token);  // Store token in localStorage without "Bearer" prefix
          this.employeePayload = this.decodedToken(); // Decode and store employee details immediately
        } else {
          console.error('No token received from login');
        }
      })
    );
  }

  // Register method
  register(employeeObj: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/employees/register', employeeObj);
  }

  // Sign out method
  signOut(): void {
    localStorage.clear();  // Clear localStorage
    this.router.navigate(['login']);  // Navigate to login page
  }

  // Store token in localStorage without the "Bearer" prefix
  storeToken(tokenValue: string): void {
    console.log("Token received:", tokenValue); // Log to verify
    localStorage.setItem('token', tokenValue);  // Store the token without the Bearer prefix
  }

  // Get token from localStorage and add "Bearer" prefix when returning it
  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return null;
    }
    return token;
  }

  // Check if the user is logged in
  isLoggedin(): boolean {
    const token = this.getToken();
    return !!token;  // Returns true if token exists and is not empty
  }

  // Decode the token
  decodedToken(): any {
    const token = this.getToken();
    if (!token) {
      console.warn('Token is missing or invalid');
      return null;
    }

    const jwtHelper = new JwtHelperService();
    try {
      const decoded = jwtHelper.decodeToken(token);  // Decode the JWT token
      if (!decoded) {
        console.error('Failed to decode the token');
        return null;
      }
      return decoded;  // Return decoded token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get authorization header with Bearer prefix
  getAuthHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    if (token) {
      return { Authorization: ` ${token}` };  // Add the "Bearer" prefix when sending the token
    }
    return {};
  }
}
