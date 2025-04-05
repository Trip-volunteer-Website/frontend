 
import { Component, OnInit } from '@angular/core';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  constructor(public headerfooter: HeaderandfooterService) {}
 
  ngOnInit() {
    this.loadHeaderData();
  }
 
 
 
 
 
loadHeaderData() {
  this.headerfooter.getAllHF()
}
}