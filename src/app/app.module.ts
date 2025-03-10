import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule}from "@angular/common/http";
import { ContactComponent } from './contact/contact.component'
@NgModule({
  declarations: [
    //component--pipe --directive
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
   
   
  ],
  imports: [
    //module
    BrowserModule,
    AppRoutingModule,
    FormsModule,//for use 2 way data binding
    SharedModule, BrowserAnimationsModule,//to use navbar and footer from shared module
    HttpClientModule
  ],
  providers: [
    //declear services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
