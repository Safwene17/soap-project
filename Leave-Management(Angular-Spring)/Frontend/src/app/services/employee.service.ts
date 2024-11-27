import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from '../models/employee';
import { AuthService } from './auth.service'; // Import AuthService to access token

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all employees with authorization header
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(
      'http://localhost:8080/api/employees/getall',
      {
        headers: this.createAuthHeaders(),
      }
    );
  }

  // Get employee by ID with authorization header
  getEmployee(id: number): Observable<employee> {
    return this.http.get<employee>(
      `http://localhost:8080/api/employees/get/${id}`,
      {
        headers: this.createAuthHeaders(),
      }
    );
  }

  // Create a new employee with authorization header
  postEmployee(employeeObj: any): Observable<employee> {
    return this.http.post<employee>(
      'http://localhost:8080/api/employees/submit',
      employeeObj,
      {
        headers: this.createAuthHeaders(),
      }
    );
  }

  // Delete employee by ID with authorization header
  deleteEmployee(id: any): Observable<employee> {
    return this.http.delete<employee>(`http://localhost:8080/api/employees/delete/${id}`, {
      headers: this.createAuthHeaders(), // Ensure headers are added
    });
  }
  

  // Update employee by ID with authorization header
  updateEmployee(id: number, employeeObj: employee): Observable<employee> {
    return this.http.put<employee>(
      `http://localhost:8080/api/employees/update/${id}`,
      employeeObj,
      {
        headers: this.createAuthHeaders(),
      }
    );
  }

  // Update profile (same as updateEmployee) with authorization header
  updateProfile(id: number, employeeObj: employee): Observable<employee> {
    return this.http.put<employee>(
      `http://localhost:8080/employees/updateprofile/${id}`,
      employeeObj,
      {
        headers: this.createAuthHeaders(),
      }
    );
  }

  // Helper method to create the authorization headers
  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get the token from AuthService
    if (token) {
      return new HttpHeaders().set('Authorization', `${token}`); // Ensure 'Bearer' prefix
    } else {
      console.warn('No token found in localStorage');
      return new HttpHeaders(); // Return an empty HttpHeaders if no token is found
    }
  }
}
