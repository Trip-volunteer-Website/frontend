import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ManegaboutComponent } from './manegabout/manegabout.component';
import { CreateAboutComponent } from './create-about/create-about.component';
import { HeaderandfooterComponent } from './headerandfooter/headerandfooter.component';
import { CreateHFComponent } from './create-hf/create-hf.component';
import { ManegpostComponent } from './manegpost/manegpost.component';
import { CreatPostComponent } from './creat-post/creat-post.component';
import { TripMapComponent } from './trip-map/trip-map.component';
import { TripComponent } from './trip/trip.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SidebarComponent,
    ManegaboutComponent,
    CreateAboutComponent,
    HeaderandfooterComponent,
    CreateHFComponent,
    ManegpostComponent,
    CreatPostComponent,
    TripMapComponent,
    TripComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTooltipModule
  ]
})
export class AdminModule { }
