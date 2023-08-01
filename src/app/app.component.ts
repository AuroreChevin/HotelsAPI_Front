import { Component, OnInit } from '@angular/core';
import { Hotel } from './models/hotel.model';
import { City } from './models/city.model';
import { ApiService } from './services/api.service';

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
  constructor(private apiService : ApiService){}
  ngOnInit(): void {
  }
 getAllHotels(){
  this.apiService.getAllHotels().subscribe({
    next : (data) => this.listHotels = data,
    error: (err) => this.error = "Problème au chargement de la liste",
    complete : () => this.error = ""
  })
 }
  
}
