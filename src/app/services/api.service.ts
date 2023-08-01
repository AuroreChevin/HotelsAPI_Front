import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Hotel } from '../models/hotel.model';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  public getAllHotels(){
    return this.http.get<Hotel[]>(environment.host+'/hotels');
  }
  public getAllCities(){
    return this.http.get<City[]>(environment.host+'/cities');
  }
  public getHotelsByCityId(id : number){
    return this.http.get<Hotel[]>(environment.host+'/hotels/cities/'+id);
  }
}