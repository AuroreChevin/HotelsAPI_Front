import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit{
  listHotels : Hotel[] = [];
  listCities : City [] = [];
  oneCity : City | undefined;
  error : string | undefined;
  host : string ="";
  currentHotel : any;
  editPhoto : boolean | undefined;
  currentFileUpload : any;
  selectedFiles : any;
  searchForm : FormGroup;
  searchError: any;
  constructor(private apiService : ApiService, private router : Router, public authService : AuthServiceService){
    this.searchForm = new FormGroup({
      keyword: new FormControl()
    })
  }
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
  onHotelDetail(hotel : Hotel) {
    this.router.navigateByUrl('zoom-hotel/' + hotel.id);
  }
  getCityById(id:number){
    this.apiService.getCityById(id).subscribe({
      next : (data) => {
        this.oneCity = data;
    },
    error : (err) => this.error = "problème de chargement de l'hôtel"
    })
  }
  onSearch(form : FormGroup){
    if(form.valid){
      this.apiService.getHotelByCityByKeyword(form.value.keyword).subscribe({
        next: (data) => {
          if (data.length === 0) {
            this.searchError = "Aucune ville trouvée !"
            this.listHotels = [];
          } else {
            this.listHotels = data
            this.searchError = ""
          }
        },
        error: (err) => this.error = "problème",
        complete: () => this.error = ""
      })
    }
  }
  onDeleteHotel(hotel : Hotel){
    this.apiService.deleteHotel(hotel).subscribe({
      next : (data) =>console.log(data),
      error : (err)=> this.error = "problème à la suppression",
      complete : () => this.getListHotels(),
    })
    confirm('Voulez-vous vraiment supprimer cet hôtel ?');
  }
  onAddHotel(){
    this.router.navigateByUrl("/hotel")
  }
  onUpdateHotel(hotel : Hotel) {
    this.router.navigateByUrl('hotel/' + hotel.id);
  }
}

