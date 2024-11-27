
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { employee } from '../models/employee';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  decodedToken: any | null;

  empObj = new employee();

  
  editMode = false;
  
  constructor(private auth:AuthService,private empService:EmployeeService,private router:Router) {}



  ngOnInit(): void {
    this.decodedToken = this.auth.decodedToken();
    this.empObj=this.decodedToken

}

updateProfile() {
  if(this.editMode){
  Swal.fire({
    title: "Logout to save changes?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.empService.updateProfile(this.decodedToken.id, this.empObj).subscribe(
        (res) => {
          Swal.fire({
            title: "Profile Updated!",
            text: "Your profile has been updated.",
            icon: "success",

          });
          console.log(res);
          this.editMode = false;
          localStorage.clear();
          this.router.navigate(['/login'])
        },
        (err) => {
          console.log(err);
        }
      );
    }
  });}
  
}



    
  

EditMode() {
    this.editMode = !this.editMode;
}


getMaskedPassword(): string {
  return '********';
}

    }