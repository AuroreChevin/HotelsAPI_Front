import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ZoomHotelComponent } from './components/zoom-hotel/zoom-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { CityComponent } from './components/city/city.component';
import { UserComponent } from './components/user/user.component';
import { ManagerComponent } from './components/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    NotFoundComponent,
    ZoomHotelComponent,
    FormLoginComponent,
    AdminComponent,
    HotelComponent,
    CityComponent,
    UserComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
