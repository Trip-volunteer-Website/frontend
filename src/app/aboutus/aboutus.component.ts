import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AboutService } from 'src/app/Services/about.service';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormControl, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
 
  aboutu: any[] = [];
 
  constructor(public aboutService: AboutService) {}
 
  ngOnInit(): void {
    this.loadAboutData();
  }
 
  loadAboutData(): void {
    // Add console logs to debug
    console.log('Before loading data');
   
    // Assuming your service method returns data or updates a property
    this.aboutService.gitAllabout();
   
    // Check if data is available immediately (rare)
    console.log('Service data immediately after call:', this.aboutService.about);
   
    // Try to access the data after a delay
    setTimeout(() => {
      console.log('Service data after timeout:', this.aboutService.about);
      if (this.aboutService.about && this.aboutService.about.length > 0) {
        this.aboutu = this.aboutService.about;
        console.log('About data assigned:', this.aboutu);
      } else {
        console.error('No data available in service');
      }
    }, 3000); // Give it a full second to load
  }
}