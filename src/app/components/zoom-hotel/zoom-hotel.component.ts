import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-zoom-hotel',
  templateUrl: './zoom-hotel.component.html',
  styleUrls: ['./zoom-hotel.component.css']
})
export class ZoomHotelComponent implements OnInit{
  host : string ="";
  hotel : Hotel | undefined;
  status : boolean = false;
  error : string = "";
  constructor(private router : Router, private apiService : ApiService,  private route:ActivatedRoute,){}
  ngOnInit(): void {
    this.host = environment.host;
    let id = this.route.snapshot.params['id'];
    if(id > 0) {
      this.status = true;
      this.apiService.getHotelById(id).subscribe({
        next : (data) => {
            this.hotel = data;
        },
        error : (err) => this.error = "problème"
      })
    }
  }
  
}
