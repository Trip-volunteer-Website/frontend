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

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.initMap();
    this.loadTrips();
  }

  initMap(): void {
    this.map = L.map('tripListMap').setView([31.9539, 35.9106], 7); // نقطة البداية

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
          icon: L.icon({
            iconUrl: '../../assets/images/trip-icon.png', // أيقونة مخصصة
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          })
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
        
      }
    });
  }




















  
}
