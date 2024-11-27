import { Component, OnInit } from '@angular/core';
import { employee } from '../models/employee';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationSuccess: true | false | null=null;
  formSubmitted: boolean = false;
  employeeObj: employee = new employee();

  constructor(private auth: AuthService, ) {}

  registeremp(): void {
    if(this.validnumber()){
    this.auth.register(this.employeeObj).subscribe(
      (res) => {
        console.log("Registration successful");
        this.registrationSuccess = true;
        // Reset the form
        this.employeeObj = {
          name: '',
          email: '',
          password: '',
          lastname: '',
          gender: null,
          phone:'',
          job: '',
          role: 'employee',
          leave_type: '',
          leave_start: new Date('jj-mm-yy'),
          leave_end: new Date('jj-mm-yy'),
          leaveDecision: null,
        };
        // Reset formSubmitted
        this.formSubmitted = false;
      }
      ,
      (err) => {
        console.log("Error in registration", err);

      }
    );

  }
}

  onSubmit() {
    this.formSubmitted = true;
  }

  validnumber(): boolean {
    return !!this.employeeObj.phone && this.employeeObj.phone.length === 8;
  }
  
  
  ngOnInit(): void {
    localStorage.clear()
  }
}