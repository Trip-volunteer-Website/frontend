import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthModule } from './auth/auth.module';
import { TestimonialsFormComponent } from './testimonials-form/testimonials-form.component';
import { TripRequestComponent } from './trip-request/trip-request.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
{
  path:"home",
  component:HomeComponent,
},
{
  path:"about",
  component:AboutComponent
},
{
  path:"contact",
  component:ContactComponent
},
{
  path:"",
  component:HomeComponent,
},

{
  path:"security",
  loadChildren:()=>AuthModule
},
{
  path: 'submit-testimonial',
  component: TestimonialsFormComponent
},
{ path: 'trip-request', component: TripRequestComponent}
, {
  path:'profile',
  component:ProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
