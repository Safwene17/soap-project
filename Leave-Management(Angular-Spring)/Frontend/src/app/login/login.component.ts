import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  registrationSuccess: true | false | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    // Check if the required fields are empty
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Corrected to use response.token
        const token = response.token;
        localStorage.setItem('token', token);  // Store the token in localStorage
        this.router.navigate(['/dashboard']);  // Navigate to dashboard after login
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        });
      }
    );
  }

  ngOnInit(): void {
    // Removed unnecessary localStorage.clear()
  }
}
