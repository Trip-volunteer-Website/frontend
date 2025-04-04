import { Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient, private toastr:ToastrService,private router:Router) { }
  Login(username: any, password: any) {
    var body = {
      username: username.value,
      password: password.value,
    };
    console.log("🟢 Body being sent to API:", body);

    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  
    const requestOption = {
      headers: new HttpHeaders(headerDir)
    };
  
    this.http.post('https://localhost:7187/api/Login/JWT', body, requestOption)
      .subscribe((resp) => {
        localStorage.setItem('token', resp.toString());
  
        const user: any = jwtDecode(resp.toString());
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.userId);

        console.log("🟢 Logged-in User ID:", user.userId); // ✅ هان بتحطه
        if (user.RoleId == '1') {
          this.toastr.success("Welcome on Admin Dashboard");
          this.router.navigate(['admin/admindashboard']);
        } else if (user.RoleId == '2'|| user.RoleId == '3') {
          this.toastr.success("Welcome on Home");
          this.router.navigate(['/home']);
        }
      }, err => {
        this.toastr.error("Username or password incorrect");
      });
  }
  //**************** */

  private baseUrl = 'https://localhost:7187/api/User';
  private loginUrl = 'https://localhost:7187/api/Login';
  display_image: string = '';
 

 
  user:any=[];
  gitAllusers(){
this.http.get("https://localhost:7187/api/User").subscribe(resp=>{this.user=resp},
  err=>{console.log(err)})
}
 
  UploadAttachment(file: FormData) {
    return this.http.post('https://localhost:7187/api/User/UploadImage', file).subscribe(
      (resp: any) => {
        this.display_image = resp.imagepath;
        console.log("Uploaded Image Path:", this.display_image);
      },
      (err) => {
        console.log('Error uploading image:', err);
      }
    );
  }
 
 
 
 
 
  registerUser(userData: any) {
    // Clear any previous image path
    this.display_image = '';
    return this.http.post(`${this.baseUrl}`, userData, { observe: 'response' });
  }
  createLoginRecord(loginData: any) {
    const formattedData = {
      username: loginData.username,
      userid: loginData.userid,
      password: loginData.password,
      roleid: loginData.roleid
    };
    return this.http.post(`${this.loginUrl}`, formattedData);
  }
   
}  