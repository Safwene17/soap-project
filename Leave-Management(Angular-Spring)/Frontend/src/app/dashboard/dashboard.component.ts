import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: './dashboard.component.html'
  
})
export class DashboardComponent implements OnInit {
 
 
  decodedToken: any | null;



  constructor(private auth:AuthService) {}



  ngOnInit(): void {
    this.decodedToken = this.auth.decodedToken();
    if (this.decodedToken) {
      // Access token data, e.g., username, roles, etc.
      console.log(this.decodedToken);
  }
}
}
