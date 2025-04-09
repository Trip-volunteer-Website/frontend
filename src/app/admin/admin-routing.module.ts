import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManegaboutComponent } from './manegabout/manegabout.component';
import { HeaderandfooterComponent } from './headerandfooter/headerandfooter.component';
import { ManegpostComponent } from './manegpost/manegpost.component';
import { TripMapComponent } from './trip-map/trip-map.component';
import { TripComponent } from './trip/trip.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { ViewTestimonialComponent } from './view-testimonial/view-testimonial.component';
import { ManageGalleryComponent } from './manage-gallery/manage-gallery.component';
import { ManageHomeComponent } from './manage-home/manage-home.component';
import { ManageTripRequestComponent } from './manage-trip-request/manage-trip-request.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { TotalRevenuComponent } from './total-revenu/total-revenu.component';
import { StatickeyComponent } from './statickey/statickey.component';
import { RegistedUsersComponent } from './registed-users/registed-users.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent, // 🧠 هاد هو الي فيه الهيدر والسايدبار
    children: [
      { path: 'admindashboard', component: StatickeyComponent },
      { path: 'manegabout', component: ManegaboutComponent },
      { path: 'headerandfooter', component: HeaderandfooterComponent },
      { path: 'manegpost', component: ManegpostComponent },
      { path: 'tripmap', component: TripMapComponent },
      { path: 'trip', component: TripComponent },
      { path: 'contact', component: ViewContactComponent },
      { path: 'viewtestimonial', component: ViewTestimonialComponent },
      { path: 'manageGallery', component: ManageGalleryComponent },
      { path: 'manageHome', component: ManageHomeComponent },
      { path: 'manageTripReq', component: ManageTripRequestComponent },
      {path: 'totalrevenu', component: TotalRevenuComponent},
      { path: 'statickey', component: StatickeyComponent },
      { path: 'registeredusers', component: RegistedUsersComponent },
      { path: 'adminProfile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
