import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path : 'hotels', component : HotelsComponent},
  {path : '', redirectTo : 'hotels', pathMatch :'full' },
  {path : '404', component : NotFoundComponent },
  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
