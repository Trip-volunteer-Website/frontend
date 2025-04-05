import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"; // ✅ إضافة HTTP_INTERCEPTORS
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsComponent } from './posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TokenInterceptor } from 'src/Interceptor/token.interceptor';
import { TripListMapComponent } from './trip-list-map/trip-list-map.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TripRequestFormComponent } from './trip-request-form/trip-request-form.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    // المكونات (Components - Pipes - Directives)
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
    ProfileComponent,
    PostCardComponent,
    PostsComponent,
    TripListMapComponent,
    TestimonialFormComponent,
    GalleryComponent,
    TripRequestFormComponent,
    PaymentComponent,
  
  ],
  imports: [
    // الوحدات (Modules)
    BrowserModule,
    AppRoutingModule,
    FormsModule, // لاستخدام two-way data binding
    SharedModule,
    BrowserAnimationsModule, // لاستخدام الـ navbar و footer من shared module
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(),
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [
    // ✅ إصلاح خطأ Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

