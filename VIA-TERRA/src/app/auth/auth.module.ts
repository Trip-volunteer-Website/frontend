import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
