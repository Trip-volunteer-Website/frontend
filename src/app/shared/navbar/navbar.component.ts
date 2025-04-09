 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(public headerfooter: HeaderandfooterService,private router: Router) {}
 
  ngOnInit() {
    this.loadHeaderData();
  }
 
  isUserLoggedIn(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      // const user = JSON.parse(userData);
      return true;
    }
    else return false;
  }
  
 
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
  
 
loadHeaderData() {
  this.headerfooter.getAllHF()
}
}