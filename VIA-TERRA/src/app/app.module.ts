import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialsFormComponent } from './testimonials-form/testimonials-form.component';
import { TripRequestComponent } from './trip-request/trip-request.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TestimonialsComponent,
    TestimonialsFormComponent,
    TripRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
