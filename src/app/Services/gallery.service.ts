import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'https://localhost:7187/api/gallery';
 
  galleryData: any = [{}];  
 
 
 
  constructor(private http: HttpClient) {}
 
  getAllImages() {
   
    this.http.get(`${this.apiUrl}`)
      .subscribe((res: any) => {
        this.galleryData = res;
        console.log(this.galleryData);
      }, err => {
        console.log('Error:', err.status);
      });
  }
 
  getImagebyId(id: number) {
   
    this.http.get(`${this.apiUrl}/GetImageById/${id}`)
      .subscribe((res: any) => {
        this.galleryData = res;
        console.log(this.galleryData);
      }, err => {
        console.log('Error:', err.status);
      });
  }
 
 
  deleteImage(id: number) {
    this.http.delete(`${this.apiUrl}/DeleteImage/${id}`)
      .subscribe(() => {
        console.log('Deleted Successfully');
        alert('Deleted Successfully');
      }, err => {
        console.log('Error:', err.status);
        alert('Something went wrong');
      });
  }
 
  createImage(data: any) {
    data.imagePath=this.display_image;
    this.http.post(`${this.apiUrl}/uploadImage`, data)
      .subscribe((resp:any) => {
        this.display_image=resp.imagePath;
        console.log('Created Successfully');
        alert('Created Successfully');
        this.getAllImages();
      }, err => {
        console.log('Error:', err.status);
        alert('Something went wrong');
      });
  }
   display_image: any;
 
  uploadImage(file:FormData){
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
 
 