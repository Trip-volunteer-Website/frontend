import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManegaboutComponent } from './manegabout/manegabout.component';
import { HeaderandfooterComponent } from './headerandfooter/headerandfooter.component';
import { ManegpostComponent } from './manegpost/manegpost.component';
import { TripMapComponent } from './trip-map/trip-map.component';
import { TripComponent } from './trip/trip.component';
const routes: Routes = [
  {
    path:'admindashboard',
    component:AdminDashboardComponent
  },
  {
    path:'manegabout',
    component:ManegaboutComponent
  },
  {
    path:'headerandfooter',
    component:HeaderandfooterComponent
  },
  {
    path:'manegpost',
    component:ManegpostComponent
  },
  {
    path:'tripmap',
    component:TripMapComponent
  },
  {
    path:'trip',
    component:TripComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
