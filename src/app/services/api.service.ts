import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Hotel } from '../models/hotel.model';
import { City } from '../models/city.model';
import { AuthServiceService } from './auth-service.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient, private authService : AuthServiceService) { }
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
    return this.http.post<any>(environment.host+'/photo/'+id, formData, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})});
  }
  public getHotelById(id : number){
    return this.http.get<Hotel>(environment.host+ '/hotels/'+id)
  }
  public getCityById(id : number){
    return this.http.get<City>(environment.host+ '/cities/'+id)
  }
  public getHotelByCityByKeyword(keyword : string){
    return this.http.get<Hotel[]>(environment.host+ '/hotels/city/'+keyword)
  }
  public deleteHotel(hotel : Hotel){
    return this.http.delete<any>(environment.host+'/hotels/'+ hotel.id, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public postHotel(hotel : Hotel){
    return this.http.post<Hotel>(environment.host+'/hotels', hotel, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public putHotel(hotel : Hotel){
    return this.http.put<Hotel>(environment.host+'/hotels', hotel, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public deleteCity(city : City){
    return this.http.delete<any>(environment.host+'/cities/'+ city.id, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public postCity(city : City){
    return this.http.post<City>(environment.host+'/cities', city, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public putCity(city : City){
    return this.http.put<City>(environment.host+'/cities', city, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public deleteUser(user : User){
    return this.http.delete<any>(environment.host+'/users/'+ user.id, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public postUser(user : User){
    return this.http.post<User>(environment.host+'/users', user, {headers : new HttpHeaders({'Authorization' : this.authService.getToken()})})
  }
  public getHotelsByUserId(id : number){
    return this.http.get<Hotel[]>(environment.host+'/hotels/user/'+id);
  }
}
