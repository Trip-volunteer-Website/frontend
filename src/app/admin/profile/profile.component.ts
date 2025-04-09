import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
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
    username: '',
    password: ''
  };
 
  selectedImage: File | null = null;
  showEditForm = false;
  rr: any;
 
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
 
  ngOnInit(): void {
    this.loadUserData();
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
    const loginId= Number(localStorage.getItem('loginId'));
    this.authService.updateUserProfile(userId, this.user).subscribe({
      next: () => this.updateLoginInformation(loginId),
      error: (err) => this.handleUpdateError(err, 'Failed to update profile')
    });
  }
 
  private updateLoginInformation(loginId: number): void {
    this.authService.updateLoginInfo(loginId, {
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
}
 