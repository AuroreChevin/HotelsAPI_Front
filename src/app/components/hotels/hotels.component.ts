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
    this.getAllHotels();
  }
  getAllHotels(){
    this.apiService.getHotels().subscribe({
      next : (data) => this.listHotels = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    })
   }
}
