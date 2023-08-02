import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userConnected : User = new User('', '', [])
  constructor(private http : HttpClient) { }

  public postUser(username : string, password : string) : Observable<any>{
    const formData = new FormData;
    formData.append("username", username);
    formData.append("password", password);
    return this.http.post<any>("http://localhost:8080/login", formData,{observe : 'response'});
  }
  public saveToken(token : string){
    const helper = new JwtHelperService();
    const decodenToken = helper.decodeToken(token);
    localStorage.setItem('token', JSON.stringify(token));
    this.userConnected.username = decodenToken.sub;
    this.userConnected.roles = decodenToken.roles;
    console.log(this.userConnected)
    localStorage.setItem('user', JSON.stringify(this.userConnected));
  }
  public getToken(){
    let token = localStorage.getItem('token');    
    if(token){ 
      return JSON.parse(token); 
    }
  }
  public clearStorage(){
    localStorage.clear();
  }
  public getUser() {
    let user = localStorage.getItem('user');
    if(user){
     this.userConnected = JSON.parse(user);
    }
    return this.userConnected;
  }
  public isLoggedIn(){
    return (this.isAdmin() || this.isManager());   
  }
  public isAdmin(){
    let user = this.getUser();
    if(user.roles.length>0){
      if(user.roles.indexOf('ADMIN')>-1)return true;
    }
    return false;
  }
  public isManager(){
    let user = this.getUser();
    if(user.roles.length> 0){
      if(user.roles.indexOf('MANAGER')>-1)return true;
    }
    return false;
  }
  public getManagers(rolename : string){
    console.log('coucou')
    return this.http.get<User[]>(environment.host+ '/users/'+rolename, {headers : new HttpHeaders({'Authorization' : this.getToken()}) });
  }
}
