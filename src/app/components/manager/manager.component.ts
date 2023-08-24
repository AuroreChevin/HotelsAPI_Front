import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  listHotels : Hotel[] = [];
  showTable : boolean = false;
  error : string | undefined;
  constructor(private apiService : ApiService, private router : Router, public authService : AuthServiceService){
    
    }
  ngOnInit(): void {
    console.log(this.authService.getUser())
  }
 
}
