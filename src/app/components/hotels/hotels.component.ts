import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit{
  listHotels : Hotel[] = [];
  listCities : City [] = [];
  error : string | undefined;
  constructor(private apiService : ApiService){}
  ngOnInit(): void {
    this.getListHotels();
    this.getListCities();
  }
  getListHotels(){
    this.apiService.getAllHotels().subscribe({
      next : (data) => this.listHotels = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    })
   }
   getListCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => this.listCities = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    })
   }
   getHotelByCity(id:number){
    this.apiService.getHotelsByCityId(id).subscribe({
      next : (data) => this.listHotels = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    })
   }
}
