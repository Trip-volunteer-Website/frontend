import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { AdminModule } from './admin/admin.module';
import { PostsComponent } from './posts/posts.component';
import { TripListMapComponent } from './trip-list-map/trip-list-map.component';
import { athurizationGuard } from './athurization.guard';
import { GalleryComponent } from './gallery/gallery.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TripRequestFormComponent } from './trip-request-form/trip-request-form.component';
import { PaymentComponent } from './payment/payment.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'home',
    component:HomeComponent,
    canActivate: [athurizationGuard]
  },
  {path:'',
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutusComponent
  },
  {  path:'',
    component:HomeComponent},
    {  
      path:'security',
      loadChildren:()=> AuthModule
    },
   {
      path:'contact',
      component:ContactComponent
    },
    {
      path:'admin',
      loadChildren:()=>AdminModule,
      canActivate: [athurizationGuard]
    }, {
      path:'posts',
      component:PostsComponent
    },
    {
      path:'triplist',
      component:TripListMapComponent
    },
    {
      path:'gallery',
      component:GalleryComponent
    },
    {
      path:'testimonialForm',
      component:TestimonialFormComponent
    },
    {
      path:'tripRequestForm',
      component:TripRequestFormComponent
    },
    {
      path:'pay',
      component:PaymentComponent
    },
    {
      path:'Volunteers',
      component:VolunteersComponent
    },
    {
      path:'userProfile',
      component:UserProfileComponent,
       canActivate:[athurizationGuard]
    },
    {
      path:'payment/:requestId',
      component: PaymentComponent
 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
