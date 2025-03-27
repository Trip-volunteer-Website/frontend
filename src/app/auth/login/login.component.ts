import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthService } from 'src/app/Services/auth.service';
// import { HomeService } from 'src/app/Services/about.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,private auth:AuthService) {}
 
 
 
    username:FormControl= new  FormControl(' ',[Validators.required]);
    password:FormControl= new  FormControl('********',[Validators.required]);
 
 
    // registerForm: FormGroup = new FormGroup({
    //   username: new FormControl(' ', Validators.required),
    //   email: new FormControl('ex@example.com', [Validators.required, Validators.email]),
    //   password: new FormControl('********', [Validators.required, Validators.minLength(8)]),
    //   repeatPassword:new FormControl('********'),
    //   age:new FormControl(' ',Validators.required),
    // });
  Login(){
    console.log("✅ Login button clicked!");
    this.auth.Login(this.username,
      this.password)
  }
}
 
 