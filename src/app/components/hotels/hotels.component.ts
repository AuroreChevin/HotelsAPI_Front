import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit{
  listHotels : Hotel[] = [];
  listCities : City [] = [];
  error : string | undefined;
  host : string ="";
  currentHotel : any;
  editPhoto : boolean | undefined;
  currentFileUpload : any;
  selectedFiles : any;
  constructor(private apiService : ApiService){}
  ngOnInit(): void {
    this.host = environment.host;
    this.getListHotels();
    this.getListCities();
  }
  getListHotels(){
    this.apiService.getAllHotels().subscribe({
      next : (data) => this.listHotels = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
   getListCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => this.listCities = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
   getHotelByCity(id:number){
    this.apiService.getHotelsByCityId(id).subscribe({
      next : (data) => this.listHotels = data,
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
   onEditPhoto(hotel: Hotel){
    this.currentHotel = hotel;
    this.editPhoto = true;
  }
  onSelectedFile(event:any){
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
  }
  onUploadPhoto(){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.apiService.postPhotoHotels(this.currentFileUpload, this.currentHotel.id).subscribe({
      next : (data) =>console.log(data),
      error : (err)=> this.error = "problème de chargement de la photo",
      complete : () => this.error = ""
    })
    window.location.reload();
  }
}
