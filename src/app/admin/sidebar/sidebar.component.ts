import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
constructor(private router: Router,private HF: HeaderandfooterService,){}
logout(){
  localStorage.clear();
  this.router.navigate(['']);
}

}
