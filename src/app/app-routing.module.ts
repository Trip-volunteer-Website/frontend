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
      loadChildren:()=>AdminModule
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
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
