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
import { TokenInterceptor } from 'Interceptor/token.interceptor';
import { TripListMapComponent } from './trip-list-map/trip-list-map.component';
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
    TripListMapComponent
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
    MatGridListModule
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

