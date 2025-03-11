import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-request',
  templateUrl: './trip-request.component.html',
  styleUrls: ['./trip-request.component.css']
})
export class TripRequestComponent implements OnInit {
  showTrips: boolean = false; // ✅ Trips are shown on page load

  tripRequest = {
    userId: 1,  
    tripId: null as number | null, 
    requestType: 'user',
    cvFilePath: '',
    status: 'pending',
    paymentId: null,
  };

  // ✅ Static List of Trips
  trips = [
    { id: 1, name: "Mountain Adventure", location: "Alps", description: "A breathtaking mountain adventure." },
    { id: 2, name: "Beach Getaway", location: "Maldives", description: "Relax and unwind on white sand beaches." },
    { id: 3, name: "Desert Safari", location: "Sahara", description: "Experience the golden dunes of the Sahara." }
  ];

  constructor() { }

  ngOnInit(): void {}

  // ✅ Toggle trip visibility
  toggleTrips(): void {
    this.showTrips = !this.showTrips;
  }

  // ✅ Handle form submission
  onSubmit(): void {
    console.log('Trip Request Submitted:', this.tripRequest);
  }
}
