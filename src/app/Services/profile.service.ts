import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
   private apiUrl = 'https://localhost:7187/api/User/getbyId';
   userData: any = {};  
 
   constructor(private http: HttpClient) {}
 
   getUserById(id: number) {
     this.http.get(`${this.apiUrl}/${id}`).subscribe((res: any) => {
       this.userData = res;  
     }, err => {
       console.log("There is no data for this user");
     });
   }
 
updateProfile(body: any) {
  this.http.put('https://localhost:7187/api/User', body).subscribe(
    () => {
      console.log("updated");
    },
    (err) => {
      console.log(err.status);
    }
  );
 
  window.location.reload();
}
 
display_image: any;
 
uploadAttachment(file:FormData){
  return this.http.post(`${this.apiUrl}/uploadImage`,file).subscribe(
    (resp:any)=>{
      this.display_image=resp.imagePath;
 
      console.log("Path Uploaded Successfully ", this.display_image)
    },err=>{
      console.log("Error Uploading Image");
    }
  )
}
}