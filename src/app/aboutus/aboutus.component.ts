import { Component } from '@angular/core';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
constructor(public home:HomeService){

}
}
