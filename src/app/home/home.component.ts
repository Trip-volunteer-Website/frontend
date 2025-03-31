import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { TripService } from 'src/app/Services/trip.service';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  trips: any[] = [];
  teamMembers: any[] = [];
  mapVisible: boolean = false; // Default value of map visibility
 
  constructor(
    public homeService: HomeService,  
    private tripService: TripService
  ) {}
 
  ngOnInit(): void {
    this.loadHomeData();
    this.loadTrips();
  }
 
  // Consolidated method for fetching home data
  loadHomeData() {
    this.homeService.getDatabyId(41);  // Replace with actual logic if needed
  }
 
  // Fetch trips using a single method
  loadTrips() {
    this.tripService.getAllTrips().subscribe(data => {
      this.trips = data;
      console.log("trip data: ",data )
    }, error => {
      console.error('Error fetching trips:', error);
    });
  }
 
 
 
  // Image upload method
  uploadImage(file: any, imageName: string) {
    if (file.length === 0) return;
 
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.homeService.uploadHomeImage(formData, imageName);
  }
 
 
  // Toggle map visibility (implement this function if needed)
  toggleMap() {
    this.mapVisible = !this.mapVisible; // Toggle the visibility of the map
  }
 
 
 
 
}
 