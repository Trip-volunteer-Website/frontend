import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}
 
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    country: new FormControl('', Validators.required),
    imagepath: new FormControl(),
    age: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
 
  showForm: boolean = true;
 
  hideForm() {
    this.showForm = false;
  }
 
  // دالة لتحميل الصورة
  uploadImage(file: any) {
    if (file.length === 0) return;
    let fileUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileUpload, fileUpload.name);
    this.authService.UploadAttachment(formData);
  }
 

 
  onSubmit() {
    if (this.registrationForm.invalid) {
      Swal.fire('Error', 'Please fill all required fields.', 'error');
      return;
    }
 
    const formData = this.registrationForm.value;
    const username = formData.email.split('@')[0];
    const userData = {
      ...formData,
      username: username,
      roleId: 2,
      imagepath: this.authService.display_image || null
    };
 
    this.authService.registerUser(userData).subscribe({
      next: (resp: any) => {
        const userId = resp.body?.userId;
       
        if (!userId) {
          Swal.fire('Error', 'Registration succeeded but we encountered an issue. Please contact support.', 'error');
          return;
        }
 
        const loginData = {
          username: username,
          userid: userId,
          password: userData.password,
          roleid: 2
        };
 
        this.authService.createLoginRecord(loginData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Registration Successful!',
              html: `Your account has been created.<br><br>
                     <b>Username:</b> ${username}<br>
                    `,
              icon: 'success',
              confirmButtonText: 'Continue to Login'
            }).then((result: { isConfirmed: any; }) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Account Created',
              html: `Your account was created successfully!<br><br>
                     <b>Username:</b> ${username}<br>
                     Please login manually.`,
              icon: 'info'
            }).then(() => {
              this.router.navigate(['/login']);
            });
          }
        });
      },
      error: (error) => {
        const errorMsg = error.error?.message || 'Registration failed. Please try again.';
        Swal.fire('Error', errorMsg, 'error');
      }
    });
  }
}