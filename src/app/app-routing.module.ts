import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './posts/posts.component';
import { TripListMapComponent } from './trip-list-map/trip-list-map.component';
import { athurizationGuard } from './athurization.guard';
import { GalleryComponent } from './gallery/gallery.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TripRequestFormComponent } from './trip-request-form/trip-request-form.component';

const routes: Routes = [
  {path:'home',
    component:HomeComponent
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
     // canActivate:[athurizationGuard]
    }, {
      path:'profile',
      component:ProfileComponent
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
