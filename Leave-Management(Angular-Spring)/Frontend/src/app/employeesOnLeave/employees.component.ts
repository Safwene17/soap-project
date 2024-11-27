import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { employee } from '../models/employee';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{

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



  approveLeave(id: any) {
    const leaveStatus: "approved" = "approved";
  
    Swal.fire({
      title: 'Approve Leave',
      text: 'Are you sure you want to approve the leave request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.getEmployee(id).subscribe(
          (existingEmployee) => {
            const updatedEmployee: employee = { ...existingEmployee, leaveDecision: leaveStatus };
            this.empService.updateEmployee(id, updatedEmployee).subscribe(
              (res) => {
                location.reload();
              }
            );
          });
      }
    });
  }
  
  declineLeave(id: any) {
    const leaveStatus: "declined" = "declined";
  
    Swal.fire({
      title: 'Decline Leave',
      text: 'Are you sure you want to decline the leave request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.getEmployee(id).subscribe(
          (existingEmployee) => {
            const updatedEmployee: employee = { ...existingEmployee, leaveDecision: leaveStatus };
            this.empService.updateEmployee(id, updatedEmployee).subscribe(
              (res) => {
                location.reload();
              }
            );
          });
      }
    });
  }
  
  removeRequest(id: any) {
    const leaveStatus: null = null;
    const leave_type: string = '';
    const leave_start: Date = new Date('jj-mm-yy');
    const leave_end: Date = new Date('jj-mm-yy');
  
    Swal.fire({
      title: 'Remove Leave Request',
      text: 'Are you sure you want to remove the leave request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.getEmployee(id).subscribe((existingEmployee) => {
          const updatedEmployee: employee = {
            ...existingEmployee,
            leaveDecision: leaveStatus,
            leave_type: leave_type,
            leave_start: leave_start,
            leave_end: leave_end
          };
  
          this.empService.updateEmployee(id, updatedEmployee).subscribe(
            (res) => {
              Swal.fire({
                title: 'Leave Request Removed',
                text: 'The leave request has been removed.',
                icon: 'success'
              });
              location.reload();
            }
          );
        });
      }
    });
  }
  

}
