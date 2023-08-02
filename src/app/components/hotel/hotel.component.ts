import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit{
  id: any;
  status : boolean = false;
  error : string | undefined;
  hotel: Hotel | undefined;
  city : City | undefined;
  myForm!: FormGroup;
  listCities: City[]=[];
  constructor(public apiService : ApiService, public router : Router, private formBuilder: FormBuilder, private route : ActivatedRoute){
   this.myForm = this.formBuilder.group({
    id : [0, Validators.required],
    hotelName : ['', Validators.required],
    address : ['', Validators.required],
    phone : ['', [Validators.required, Validators.pattern('[0-9]{10}$')]],
    nbRoom : ['', Validators.required],
    nbStar : ['', Validators.required],
    priceRoom : ['', Validators.required],
    city : ['', Validators.required]
  })
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getHotelById(id).subscribe({
        next : (data) => {
            this.hotel = data;
            console.log(this.hotel);
            this.myForm.setValue({id : this.hotel.id , hotelName : this.hotel.hotelName, address : this.hotel.address, 
              phone : this.hotel.phone , nbRoom : this.hotel.nbRoom, nbStar : this.hotel.nbStar, priceRoom : this.hotel.priceRoom, city : this.hotel.city});
        },
        error : (err) => this.error = err
      })
    }
    this.getListCities(); 
  }
  getListCities(){
    this.apiService.getAllCities().subscribe({
      next : (data) => {this.listCities = data;
      console.log(this.listCities)},
      error: (err) => this.error = "Problème au chargement de la liste",
      complete : () => this.error = ""
    });
   }
  onSaveHotel(myForm : FormGroup){
    if(myForm.valid){
      if(this.status) this.updateHotel(myForm);
      else{
      this.city = new City(myForm.value.city.id, myForm.value.city.cityName, myForm.value.city.description);
      this.hotel = new Hotel(myForm.value.id, myForm.value.hotelName,myForm.value.address, myForm.value.phone,
                            myForm.value.nbRoom,myForm.value.nbStar,myForm.value.priceRoom,this.city);
      this.apiService.postHotel(this.hotel).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('hotels')),
      });
      alert('Hôtel bien ajouté');      
    }}
    else{
      this.error = "Vous n'avez pas saisi correctement les champs";
    }
  }
  updateHotel(myForm :FormGroup){
    this.city = new City(myForm.value.city.id, myForm.value.city.cityName, myForm.value.city.description);
      this.hotel = new Hotel(myForm.value.id, myForm.value.hotelName,myForm.value.address, myForm.value.phone,
                            myForm.value.nbRoom,myForm.value.nbStar,myForm.value.priceRoom,this.city);
      this.apiService.putHotel(this.hotel).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('hotels')),
  });
}
}
