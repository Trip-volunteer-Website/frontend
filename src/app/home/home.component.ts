import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import { TripService } from 'src/app/Services/trip.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  trips: any[] = [];
  teamMembers: any[] = [];
  mapVisible: boolean = false;

  constructor(
    public homeService: HomeService,  
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.loadHomeData();
    this.loadTrips();
  }

  ngAfterViewInit(): void {
    // Delay the carousel init to wait for trips to load
    setTimeout(() => {
      $('.trip-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      });
    }, 1000); // Wait a bit to make sure trips are rendered
  }

  loadHomeData() {
    this.homeService.getDatabyId(41);
  }

  loadTrips() {
    this.tripService.getAllTrips().subscribe(data => {
      this.trips = data;
      console.log("trip data: ", data);
    }, error => {
      console.error('Error fetching trips:', error);
    });
  }

  uploadImage(file: any, imageName: string) {
    if (file.length === 0) return;

    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.homeService.uploadHomeImage(formData, imageName);
  }
  isUserLoggedIn(): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      // const user = JSON.parse(userData);
      return true;
    }
    else return false;
  }

  toggleMap() {
    this.mapVisible = !this.mapVisible;
  }
  carouselOptions = {
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    navText: ['‹', '›'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  };
  
}
