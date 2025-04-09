import { Component, OnInit } from '@angular/core';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerData: any = {};

  constructor(private hfService: HeaderandfooterService) {}

  ngOnInit(): void {
    this.hfService.getAllHF();

    setTimeout(() => {
      if (this.hfService.headerandfooterarr.length > 0) {
        this.footerData = this.hfService.headerandfooterarr[0];
        console.log("Footer Data:", this.footerData);
      }
    }, 1000);
  }
}