import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AuthService } from 'src/app/Services/auth.service';
import Swal from 'sweetalert2';
// import { HomeService } from 'src/app/Services/about.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router,private auth:AuthService) {}
 
 
 
    username:FormControl= new  FormControl(' ',[Validators.required]);
    password:FormControl= new  FormControl('********',[Validators.required]);
 
 
    // registerForm: FormGroup = new FormGroup({
    //   username: new FormControl(' ', Validators.required),
    //   email: new FormControl('ex@example.com', [Validators.required, Validators.email]),
    //   password: new FormControl('********', [Validators.required, Validators.minLength(8)]),
    //   repeatPassword:new FormControl('********'),
    //   age:new FormControl(' ',Validators.required),
    // });
  Login(){
    console.log("✅ Login button clicked!");
    const userId = localStorage.getItem('userId');
    console.log("🟢 Logged-in User ID:", userId);
    this.auth.Login(this.username,
      this.password)
  }


  
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
      this.auth.UploadAttachment(formData);
    }
   
    // onSubmit() {
    //   if (this.registrationForm.invalid) {
    //     alert('Please fill all required fields.');
    //     return;
    //   }
   
    //   const formData = this.registrationForm.value;
    //   const userData = {
    //     ...formData,
    //     username: formData.email.split('@')[0],
    //     roleId: 2,
    //     imagepath: this.authService.display_image || null
    //   };
   
    //   this.authService.registerUser(userData).subscribe({
    //     next: (resp: any) => {
    //       console.log('Full registration response:', resp);
         
    //       // Correct way to access the user ID from the response
    //       const userId = resp.body?.userId; // Note: lowercase 'd' in 'userId'
         
    //       if (!userId) {
    //         console.error('User ID not found in response:', resp);
    //         alert('Registration succeeded but we encountered an issue. Please contact support.');
    //         return;
    //       }
       
    //       const loginData = {
    //         username: userData.username,
    //         userid: userId, // Use the correct userId here
    //         password: userData.password,
    //         roleid: 2
    //       };
   
    //       this.authService.createLoginRecord(loginData).subscribe({
    //         next: () => {
    //           alert('Registration successful!');
    //           this.router.navigate(['/login']);
    //         },
    //         error: (err) => {
    //           console.error('Login record error:', err);
    //           alert('Account created successfully! Please login manually.');
    //           this.router.navigate(['/login']);
    //         }
    //       });
    //     },
    //     error: (error) => {
    //       console.error('Registration error:', error);
    //       const errorMsg = error.error?.message ||
    //                       'Registration failed. Please try again.';
    //       alert(errorMsg);
    //     }
    //   });
    // }
   
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
        imagepath: this.auth.display_image || null
      };
   
      this.auth.registerUser(userData).subscribe({
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
   
          this.auth.createLoginRecord(loginData).subscribe({
            next: () => {
              Swal.fire({
                title: 'Registration Successful!',
                html: `Your account has been created.<br><br>
                       <b>Username:</b> ${username}<br>
                      `,
                icon: 'success',
                confirmButtonText: 'Continue to Login'
              }).then((result) => {
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
 
 