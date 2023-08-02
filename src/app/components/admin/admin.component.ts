import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  listCities : City [] = [];
  listHotels : Hotel[] = [];
  showTable : boolean = false;
  error : string | undefined;
  constructor(private apiService : ApiService, private router : Router, public authService : AuthServiceService){
    
    }
  
  ngOnInit(): void {
  }
  getListCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => this.listCities = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
    this.showTable = true;
  }
  getListHotels(){
    this.apiService.getAllHotels().subscribe({
      next : (data) => {this.listHotels = data;this.showTable = !this.showTable;},
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
    
   }
}