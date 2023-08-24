import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  listCities : City [] = [];
  listManagers : User[] = [];
  listHotels : Hotel[] = [];
  showTable : boolean = false;
  error : string | undefined;
  constructor(private apiService : ApiService, private router : Router, public authService : AuthServiceService){
    
    }
  
  ngOnInit(): void {
    this.getListCities();
    this.getListManagers();
  }
  getListCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => this.listCities = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
  }
  getListHotels(){
    this.apiService.getAllHotels().subscribe({
      next : (data) => {this.listHotels = data;this.showTable = !this.showTable;},
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
   getListManagers(){
    let rolename = 'MANAGER';
    this.authService.getManagers(rolename).subscribe({
      next : (data) => {this.listManagers = data;
                      console.log(this.listManagers)},
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
   onDeleteCity(city : City){
    this.apiService.deleteCity(city).subscribe({
      next : (data) =>console.log(data),
      error : (err)=> this.error = "problème à la suppression",
      complete : () => this.router.navigateByUrl('admin'),
    })
    confirm('Voulez-vous vraiment supprimer cette ville ?');
    window.location.reload();
  }
  onUpdateCity(city : City) {
    this.router.navigateByUrl('city/' + city.id);
  }
  onDeleteUser(user : User){
    this.apiService.deleteUser(user).subscribe({
      next : (data) =>console.log(data),
      error : (err)=> this.error = "problème à la suppression",
      complete : () => this.router.navigateByUrl('admin'),
    })
    confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
    window.location.reload();
  }
}
