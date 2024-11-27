import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { employee } from '../models/employee';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrls: ['./allemployees.component.scss']
})
export class AllemployeesComponent {

  Employees:any[]=[];
  
  decodedToken: any | null;

  empObj=new employee()


  constructor(private empService:EmployeeService,private auth:AuthService){}

  ngOnInit(): void {

    this.decodedToken = this.auth.decodedToken();

    console.log(this.decodedToken);
    
    
    this.empService.getEmployees().subscribe(
      res=>{
        console.log(res);
        this.Employees=res
      }
      ,err=>{
        console.log(err);
        
      }
    )


  }



  FireEmp(id: any) {
    Swal.fire({
      title: 'Are you sure to fire this employee ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmployee(id).subscribe(
          (res) => { 
            location.reload();
          },
          (err) => {
            console.log(err);
          }
        );

      }
    });

  }
  
  

  MakeAdmin(id: any) {
    const updatedRole: "admin" = "admin";
  
    Swal.fire({
      title: 'Are you sure to make admin?',
      text: "This will promote this employee to admin role.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make admin!'
    }).then((result) => {
      if (result.isConfirmed) {

        
        this.empService.getEmployee(id).subscribe((existingEmployee) => {
          const updatedEmployee: employee = { ...existingEmployee, role: updatedRole };
  
          this.empService.updateEmployee(id, updatedEmployee).subscribe(
            (res) => {

              location.reload()
            },
            (err) => {
              console.log(err);
            }
          );
        });
      }
    });
  }
  



  RemoveAdmin(id: any) {
    const updatedRole: "employee" = "employee";
  
    Swal.fire({
      title: 'Are you sure to remove admin role?',
      text: 'This will demote the employee from admin to employee role.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove admin!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.getEmployee(id).subscribe((existingEmployee) => {
          const updatedEmployee: employee = { ...existingEmployee, role: updatedRole };
  
          this.empService.updateEmployee(id, updatedEmployee).subscribe(
            (res) => {

              location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
        });
      }
    });
  }
  


    
  }
