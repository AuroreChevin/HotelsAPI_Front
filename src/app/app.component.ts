import { Component, OnInit } from '@angular/core';
import { Hotel } from './models/hotel.model';
import { City } from './models/city.model';
import { ApiService } from './services/api.service';
import { AuthServiceService } from './services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hotels';
  listHotels : Hotel[] = [];
  listCities : City [] = [];
  error : string | undefined;
  constructor(private apiService : ApiService, public authService : AuthServiceService, private router : Router){}
  ngOnInit(): void {
  }
  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }
 getAllHotels(){
  this.apiService.getAllHotels().subscribe({
    next : (data) => this.listHotels = data,
    error: (err) => this.error = "Problème au chargement de la liste",
    complete : () => this.error = ""
  })
 }
 public logout(){
  this.authService.clearStorage();
  window.location.reload();
  this.router.navigateByUrl('/hotels');
}
}
