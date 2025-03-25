import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HomeComponent } from 'src/app/home/home.component';
// import { HomeService } from 'src/app/Services/about.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

// constructor(public home:HomeService){
// this.home.message='you are logged in';
// }

email=new FormControl("",[Validators.required,Validators.email]);
pass=new FormControl("********",[Validators.required,Validators.minLength(8)]);



// email='nedaa@gmail.com';
// pass='0000';
login(){
// localStorage.setItem("email",this.email);
// localStorage.setItem("password",this.pass);

}
}
