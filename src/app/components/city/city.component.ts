import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{
  id: any;
  status : boolean = false;
  error : string | undefined;
  city : City | undefined;
  myForm!: FormGroup;
  constructor(public apiService : ApiService, public router : Router, private formBuilder: FormBuilder, private route : ActivatedRoute){
   this.myForm = this.formBuilder.group({
    id : [0, Validators.required],
    cityName : ['', Validators.required],
    description : ['', Validators.required]
  })
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getCityById(id).subscribe({
        next : (data) => {
            this.city = data;
            console.log(this.city);
            this.myForm.setValue({id : this.city.id , cityName : this.city.cityName, description : this.city.description});
        },
        error : (err) => this.error = err
      })
    }
  }
  onSaveCity(myForm : FormGroup){
    if(myForm.valid){
      if(this.status) this.updateCity(myForm);
      else{
      this.city = new City(myForm.value.id, myForm.value.cityName,myForm.value.description);
      this.apiService.postCity(this.city).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('hotels')),
      });
      alert('Ville bien ajoutée');      
    }}
    else{
      this.error = "Vous n'avez pas saisi correctement les champs";
    }
  }
  updateCity(myForm :FormGroup){
    this.city = new City(myForm.value.id, myForm.value.cityName, myForm.value.description);
      this.apiService.putCity(this.city).subscribe({
        next: (data) => (console.log(data)),
        error: (err) => (this.error = err.message),
        complete: () => (this.router.navigateByUrl('admin')),
  });
}
}
