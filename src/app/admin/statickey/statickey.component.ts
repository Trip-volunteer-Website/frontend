import { Component, OnInit } from '@angular/core';  
import { AuthService } from 'src/app/Services/auth.service';  
import { TripService } from 'src/app/Services/trip.service';  
import { TripRequestService } from 'src/app/Services/trip-request.service';  
 
@Component({
  selector: 'app-statickey',
  templateUrl: './statickey.component.html',
  styleUrls: ['./statickey.component.css']
})
export class StatickeyComponent implements OnInit {
  totalUsers: number = 0; // Stores the total number of registered users (Role 2)
  activeTrips: number = 0; // Stores the count of active trips
  completedTrips: number = 0; // Stores the count of completed trips
  pendingRequests: number = 0;  // Stores the number of pending trip requests
 
  constructor(
    private tripService: TripService, // Injects the TripService to fetch--> trips data
    private authService: AuthService, // Injects the AuthService to fetch--> user data
    private tripRequestService: TripRequestService // Injects the TripRequestService to fetch---> trip requests data
  ) { }
 
  ngOnInit(): void { // Lifecycle method that runs when the component initializes
    this.loadStatistics(); // Calls the function to load all statistics
  }
 
  loadStatistics(): void {
    // Fetches users with Role 2
    this.authService.getRole2Users().subscribe(
      (role2Users: any[]) => {
        console.log("📊 Received role 2 users:", role2Users.length); // Logs the number of users in the console
        this.totalUsers = role2Users.length; // Updates the totalUsers variable
      },
      (error) => {
        console.error('Error loading role 2 users:', error); // Logs error if the request fails
      }
    );
 
    // Fetches all trips and categorizes them into active and completed
    this.tripService.getAllTrips().subscribe(
      (trips: any[]) => {
        this.activeTrips = trips.filter(trip =>
          trip.status === 'active').length; // Filters active trips
       
        this.completedTrips = trips.filter(trip =>
          trip.status === 'completed' ).length; // Filters completed trips
      },
      (error) => {
        console.error('Error loading trips:', error); // Logs error if the request fails
      }
    );
 
    this.tripRequestService.getpendingRequests(); // Fetches all trip requests (but not subscribed to it)
   
    setTimeout(() => {
      this.pendingRequests = this.tripRequestService.getPendingRequestsCount(); // Fetches pending request count after 1 second
    }, 1000);
  }
}
 
 
 
 