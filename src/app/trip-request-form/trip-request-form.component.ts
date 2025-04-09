
import { Component } from '@angular/core';
import { TripRequestService } from '../Services/trip-request.service';
import { TripService } from '../Services/trip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trip-request-form',
  templateUrl: './trip-request-form.component.html',
  styleUrls: ['./trip-request-form.component.css']
})
export class TripRequestFormComponent {
  showTrips: boolean = false;
  trips: any = [{}];
  tripRequest = {
    userid: localStorage.getItem('userId'),
    tripid: null as number | null,
    requesttype: 'user',
    cvfilepath: '',
    requestedat: new Date().toISOString(),
    status: 'pending',
    paymentid: null
  };
 
  selectedFile: File | null = null;
  selectedFileName: string = '';
 
 
  constructor(
    public tripReq: TripRequestService,
    public tripService: TripService
  ) {}
 
  filteredTrips: any[] = [];
  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe(
      (data: any[]) => {
        this.tripService.TripArr = data;
        this.filteredTrips = [...this.tripService.TripArr]; // Initialize filtered trips
        console.log('Trip data:', this.tripService.TripArr);
      },
      (error) => {
        console.error('Error fetching trip data:', error);
      }
    );
  }
 
 
  toggleTrips() {
    this.showTrips = !this.showTrips;
 
    if (this.showTrips && this.tripService.TripArr.length === 1) {
     
      this.trips=this.tripService.getAllTrips();
      console.log(this.tripService.TripArr);
    }
 
   
  }
 
  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }
 
  onSubmit(): void {
    const baseData = {
      userid: this.tripRequest.userid,
      tripid: this.tripRequest.tripid,
      requesttype: this.tripRequest.requesttype,
      requestedat: new Date().toLocaleDateString('en-CA'),
      status: 'pending',
      paymentid: null
    };

    Swal.fire({
      icon: 'success',
      title: 'Request Submitted!',
      text: 'Your request has been received! We will review it carefully and notify you by email whether it is approved or rejected. Thanks for your patience!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
 
    if (this.tripRequest.requesttype === 'volunteer' && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
 
      this.tripReq.uploadAttachment(formData, (fileName: string) => {
        const requestData = {
          ...baseData,
          cvfilepath: fileName
        };
        this.tripReq.createRequest(requestData);
        window.location.reload();
      });
    } else {
      const requestData = {
        ...baseData,
        cvfilepath: null
      };
      this.tripReq.createRequest(requestData);
      window.location.reload();
    }
  }
 
  get activeTrips() {
    return this.tripService.TripArr?.filter(t => new Date(t.startdate) >= new Date()) || [];
  }
  
}
