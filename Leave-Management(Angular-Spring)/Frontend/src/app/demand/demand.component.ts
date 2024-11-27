import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../models/employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.scss']
})
export class DemandComponent implements OnInit {

  constructor(private auth: AuthService, private empService: EmployeeService, private router: Router) { }

  empObj = new employee();

  decodedToken: any | null;

  ngOnInit(): void {
    this.decodedToken = this.auth.decodedToken();
    if (this.decodedToken) {
      // Access token data, e.g., username, roles, etc.
      this.empObj = this.decodedToken;
    }
  }

  updateEmp() {
    // Check if the required fields are empty
    if (!this.empObj.leave_type || !this.empObj.leave_start || !this.empObj.leave_end) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    // Check if the end date is before the start date
    if (this.empObj.leave_end < this.empObj.leave_start) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'End date cannot be before the start date!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    // If all checks pass, proceed with the request
    Swal.fire({
      title: 'Your request has been sent successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.updateEmployee(this.decodedToken._id, this.empObj).subscribe(
          (res) => {
            this.empObj={
            name: '',
            email: '',
            password: '',
            lastname: '',
            gender:null,
            job: '',
            phone:'',
            role: 'employee',
            leave_type: '',
            leave_start: new Date('jj-mm-yy'),
            leave_end: new Date('jj-mm-yy'),
            leaveDecision: null,
            }
            this.router.navigate(['/employees']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
