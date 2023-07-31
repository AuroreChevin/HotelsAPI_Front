import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  public getHotels(){
    return this.http.get<Hotel[]>(environment.host+'/hotels');
  }
}
