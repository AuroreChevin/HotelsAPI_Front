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
  public postPhotoHotels(file : File, id : number){
    let formData : FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(environment.host+'/photo/'+id, formData);
  }
  public getHotelById(id : number){
    return this.http.get<Hotel>(environment.host+ '/hotels/'+id)
  }
  public getCityById(id : number){
    return this.http.get<City>(environment.host+ '/cities/'+id)
  }
  public getCityByKeyword(keyword : string){
    return this.http.get<City[]>(environment.host+ '/cities/'+keyword)
  }
}
