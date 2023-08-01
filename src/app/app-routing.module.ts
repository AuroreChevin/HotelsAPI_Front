import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ZoomHotelComponent } from './components/zoom-hotel/zoom-hotel.component';
import { FormLoginComponent } from './components/form-login/form-login.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent},
  {path : 'zoom-hotel/:id', component : ZoomHotelComponent},
  {path :'form-login', component : FormLoginComponent},
  {path : '', redirectTo : 'hotels', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
