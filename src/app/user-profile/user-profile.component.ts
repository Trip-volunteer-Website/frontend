import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { TripRequestService } from 'src/app/Services/trip-request.service';
import { TripService } from '../Services/trip.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from '../Services/invoice.service';
 
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 
  user: any = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    country: '',
    age: null,
    imagepath: ''
  };
 
  loginInfo: any = {
    username: ''
  };
 
  rr: any;
  showEditForm = false;
  selectedImage: File | null = null;
 
  tripRequests:any = [{}];
  invoices: any = [{}];
 
@ViewChild('tripDetailsDialog') tripDetailsDialog!: TemplateRef<any>;
 
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private tripReqService: TripRequestService,
    private tripService: TripService,
    private invoiceService:InvoiceService,
    private router: Router,
    private dialog: MatDialog    
  ) {}
 
  ngOnInit(): void {
    this.loadTripRequests();
    this.loadUserData();
    this.loadInvoices();
   
  }
 
 
  loadUserData(): void {
    const userId = Number(localStorage.getItem('userId'));
    const loginId= Number(localStorage.getItem('loginId'));
 
    this.authService.getUserProfile(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.rr = this.user;
        console.log("user data", user)
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
        this.toastr.error('Failed to load profile data');
        this.user = {
          fname: 'Guest',
          lname: 'User',
          imagepath: 'assets/images/default-profile.jpg'
        };
      }
    });
 
    this.authService.getLoginInfo(loginId).subscribe({
      next: (login) => {
        this.loginInfo = login || { username: 'N/A' };
      },
      error: (err) => {
        console.error('Failed to load login info', err);
        this.loginInfo = { username: 'N/A' };
      }
    });
    console.log("roleid from user object:", this.user.roleid);
 
  }
 
  loadTripRequests(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.tripReqService.getUserReq(userId).subscribe({
      next: (data) => {
        this.tripRequests = data;
        console.log("user requests", this.tripRequests);
      },
      error: (err) => {
        console.error("Failed to load trip requests", err);
        this.tripRequests = [];
      }
    });
  }
 
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.imagepath = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
 
  updateProfile(): void {
    const userId = Number(localStorage.getItem('userId'));
 
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('file', this.selectedImage);
 
      this.authService.UploadAttachment(formData);
 
      // Wait a bit to ensure image path is available from service
      setTimeout(() => {
        this.user.imagepath = this.authService.display_image;
        this.updateUserAndLoginInfo(userId);
      }, 500); // Adjust delay if needed
    } else {
      this.updateUserAndLoginInfo(userId);
    }
  }
 
  private updateUserAndLoginInfo(userId: number): void {
    this.authService.updateUserProfile(userId, this.user).subscribe({
      next: () => this.updateLoginInformation(userId),
      error: (err) => this.handleUpdateError(err, 'Failed to update profile')
    });
  }
 
  private updateLoginInformation(userId: number): void {
    this.authService.updateLoginInfo(userId, {
      username: this.loginInfo.username,
      password: this.loginInfo.password,
      roleid:this.loginInfo.roleid
    }).subscribe({
      next: () => {
        this.toastr.success("Profile updated");
        this.showEditForm = false;
      },
      error: (err) => this.handleUpdateError(err, 'Failed to update login info')
    });
  }
 
  private handleUpdateError(err: any, message: string): void {
    console.error(message, err);
    this.toastr.error(message);
  }
 
  payForTrip(req: any): void {
    debugger;
    const requestId = req.requestid;
    console.log(requestId);
    this.router.navigate(['/payment', req.requestid]);
  }
 
  loadInvoices(): void {
    const userId = Number(localStorage.getItem('userId'));
 
    this.tripReqService.getUserReq(userId).subscribe({
      next: (requests: any[]) => {
        const userRequestIds = requests.map(r => r.requestid);
 
        this.invoiceService.getAllInvoices().subscribe({
          next: (allInvoices) => {
            this.invoices = allInvoices.filter(inv => userRequestIds.includes(inv.requestid));
          },
          error: (err) => {
            console.error("Failed to load invoices", err);
            this.invoices = [];
          }
        });
      },
      error: (err) => {
        console.error("Failed to load user requests", err);
        this.invoices = [];
      }
    });
  }
  viewTripDetails(req: any): void {
    const tripId = req.tripid;
    this.tripService.getTripById(tripId).subscribe({
      next: (trip) => {
        this.dialog.open(this.tripDetailsDialog, {
          data: trip,
          width: '400px'
        });
      },
      error: (err) => {
        this.toastr.error('Failed to load trip details');
      }
    });
  }
 
}