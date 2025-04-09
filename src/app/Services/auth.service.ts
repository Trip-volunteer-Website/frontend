import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs/internal/Observable';
 
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
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
        localStorage.setItem('loginId', user.loginId);
 
        console.log("🟢 Logged-in User ID:", user.userId); // ✅ هان بتحطه
        if (user.RoleId == '1') {
          this.toastr.success("Welcome on Admin Dashboard");
          this.router.navigate(['admin/admindashboard']);
        } else if (user.RoleId == '2' || user.RoleId == '3') {
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
 
 
 
  user: any = [];
  gitAllusers() {
    this.http.get("https://localhost:7187/api/User").subscribe(resp => { this.user = resp },
      err => { console.log(err) })
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
 
  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`https://localhost:7187/api/User/getbyId/${userId}`); // Option 3
  }
 
  getLoginInfo(loginId: number): Observable<any> {
    return this.http.get(`https://localhost:7187/api/Login/getbyId/${loginId}`); // Option 2
  }
 
  updateUserProfile(userId: number, userData: any): Observable<any> {
    const formattedData = {
      userId: userId,
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      phone: userData.phone,
      country: userData.country,
      age: userData.age,
      imagepath:userData.imagepath,
      roleid: userData.roleid
    };
    console.log("Updated Data:", formattedData)
    return this.http.put(`https://localhost:7187/api/User/`, formattedData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }
  updateLoginInfo(loginid: number, loginData: any): Observable<any> {
    console.log("login Data",loginData)
    const formattedData = {
      loginId:loginid,
      username: loginData.username,
      password: loginData.password,
      roleid: loginData.roleid,       // 🟢 Pass roleid
      userId: localStorage.getItem('userId')   // 🟢 Pass userId
    };
    return this.http.put(
      `https://localhost:7187/api/Login/`,
      formattedData,
    );
    
  }
 
  getRole2Users(): Observable<any[]> {
    return new Observable<any[]>(observer => {
      this.http.get<any[]>("https://localhost:7187/api/User").subscribe(
        users => {
          console.log("🟢 All Users:", users);  
 
          const role2Users = users.filter(user => user.roleid === 2);
          const role3Users = users.filter(user => user.roleid === 3);  
         
          console.log("🟢 Role 2 users:", role2Users);  
          console.log("🟢 Role 3 users (Volunteers):", role3Users);  
 
          // إرسال مصفوفات المستخدمين والمتطوعين في نفس المصفوفة
          observer.next([...role2Users, ...role3Users]);  
          observer.complete();
        },
        err => {
          console.log(err);
          observer.error(err);
        }
      );
    });
  }
 
 
 
 
}  