import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/Services/trip.service';
import * as L from 'leaflet';
 
@Component({
  selector: 'app-trip-list-map',
  templateUrl: './trip-list-map.component.html',
  styleUrls: ['./trip-list-map.component.css']
})
export class TripListMapComponent implements OnInit {
  map!: L.Map;
  trips: any[] = [];
  // Create an array to store markers with their associated trip data
  markerMap: {marker: L.Marker, trip: any}[] = [];
 
  defaultIcon = L.icon({
    iconUrl: '../../assets/images/trip-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
 
  highlightedIcon = L.icon({
    iconUrl: '../../assets/images/Search.png',
    iconSize: [30, 46],
    iconAnchor: [15, 46],
    popupAnchor: [1, -34]
  });
 
  constructor(private tripService: TripService) {}
 
  ngOnInit(): void {
    this.initMap();
    this.loadTrips();
    this.setupSearchListener();
  }
 
  initMap(): void {
    this.map = L.map('tripListMap').setView([31.9539, 35.9106], 7);
   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
 
  loadTrips(): void {
    this.tripService.getAllTrips().subscribe((trips: any[]) => {
      this.trips = trips;
      this.addTripsToMap();
    }, error => {
      console.error('Error fetching trips:', error);
    });
  }
 
  addTripsToMap(): void {
    this.trips.forEach(trip => {
      if (trip.latitude && trip.longitude) {
        const marker = L.marker([trip.latitude, trip.longitude], {
          icon: this.defaultIcon
        }).addTo(this.map);
       
        marker.bindPopup(`
          <div>
            <h3>${trip.tripname}</h3>
            <p><strong>location:</strong> ${trip.location}</p>
            <p><strong>description:</strong> ${trip.description}</p>
            <p><strong>start date:</strong> ${trip.startdate}</p>
            <p><strong>end date:</strong> ${trip.enddate}</p>
            <p><strong>price:</strong> ${trip.price} $</p>
            <p><strong>main age:</strong> ${trip.minage}</p>
            <p><strong>max users:</strong> ${trip.maxusers}</p>
            <p><strong>max volunteers age:</strong> ${trip.maxvolunteers}</p>
            <p><strong>status:</strong> ${trip.status}</p>
            <button class="join-now-btn">Join Now</button>
          </div>
        `);
       
        // Store the marker and its associated trip data together
        this.markerMap.push({ marker, trip });
      }
    });
  }
 
  setupSearchListener(): void {
    setTimeout(() => {
      const searchButton = document.getElementById('searchButton');
      const searchInput = document.getElementById('locationSearch') as HTMLInputElement;
     
      if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
          this.searchTrips(searchInput.value);
        });
       
        searchInput.addEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            this.searchTrips(searchInput.value);
          }
        });
      }
    }, 500);
  }
 
  searchTrips(searchTerm: string): void {
    // Reset all markers to default icon
    this.markerMap.forEach(item => {
      item.marker.setIcon(this.defaultIcon);
    });
   
    if (!searchTerm.trim()) {
      return;
    }
   
    // Convert search term to lowercase for case-insensitive matching
    const term = searchTerm.toLowerCase();
   
    // Find matching trips and highlight their markers
    const matchingMarkers: L.Marker[] = [];
   
    this.markerMap.forEach(item => {
      if (item.trip.location.toLowerCase().includes(term)) {
        item.marker.setIcon(this.highlightedIcon);
        matchingMarkers.push(item.marker);
       
        // Removed the code that opens the popup
      }
    });
   
    // If we found matches, create a bounds object and fit the map to it
    if (matchingMarkers.length > 0) {
      const bounds = L.latLngBounds(matchingMarkers.map(m => m.getLatLng()));
      this.map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      alert('No trips found with that location.');
    }
  }
}