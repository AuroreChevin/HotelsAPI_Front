import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ZoomHotelComponent } from './components/zoom-hotel/zoom-hotel.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { CityComponent } from './components/city/city.component';
import { adminGuard } from './components/admin.guard';
import { managerGuard } from './components/manager.guard';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent},
  {path : 'zoom-hotel/:id', component : ZoomHotelComponent},
  {path :'form-login', component : FormLoginComponent},
  {path : 'admin', component : AdminComponent,
   canActivate :[adminGuard]},
  {path : 'hotel/:id', component : HotelComponent ,
  canActivate :[managerGuard]},
  {path : 'city/:id', component : CityComponent,
  canActivate :[adminGuard]},
  {path : 'user/:id', component : UserComponent,
  canActivate :[adminGuard]},
  {path : '', redirectTo : 'hotels', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
