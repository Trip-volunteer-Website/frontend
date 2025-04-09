import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit  {
    constructor(public headerfooter: HeaderandfooterService,private router: Router) {
        console.log('AdminLayout Loaded!');
      }
    isSidebarVisible = true;

    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
    ngOnInit() {
      this.loadHeaderData();
    }
    logout(){
      localStorage.clear();
      this.router.navigate(['']);
    }
    
   
   
   
   
  loadHeaderData() {
    this.headerfooter.getAllHF()
  }
}
