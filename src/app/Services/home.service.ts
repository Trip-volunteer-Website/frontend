import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://localhost:7187/api/StaticHome';  
 
 
 
 
  constructor(private http: HttpClient) {}
  homeData: any = [{}];  
 
 
  getAllData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getDatabyId(id: number) {
   
    this.http.get(`${this.apiUrl}/getbyId/${id}`)
      .subscribe((res: any) => {
        this.homeData = res;
        console.log(this.homeData);
      }, err => {
        console.log('Error:', err.status);
      });
  }
 
 
  display_image1: any;
  display_image2: any;
  display_image3: any;
  uploadHomeImage(file:FormData, imgName : string )
  {
 
    return this.http.post(`${this.apiUrl}/UploudImage/${imgName}`,file).subscribe(
      (resp:any)=> {
        if (imgName == "img1path")
          {
           this.display_image1= resp.img1path;
           console.log("Path Uploaded Successfully ", this.display_image1);
          }
        else if (imgName == "img2path")
          {
           this.display_image2= resp.img2path;
           console.log("Path Uploaded Successfully ", this.display_image2);
          }
        else if (imgName == "img3path")
            {
             this.display_image3= resp.img3path;
             console.log("Path Uploaded Successfully ", this.display_image3);
            }
      },err=>{
        console.log("Error Uploading");
      }
    )
  }
 
  updateData(homeData: any) {
    const updatedData = {
      id: homeData.id,
      title1: homeData.title1,
      title2: homeData.title2,
      title3: homeData.title3,
      p1: homeData.p1,
      p2: homeData.p2,
      p3: homeData.p3,
      img1path: this.display_image1 || homeData.img1path, // Use updated or previous image path
      img2path: this.display_image2 || homeData.img2path, // Use updated or previous image path
      img3path: this.display_image3 || homeData.img3path  // Use updated or previous image path
    };
 
    // Send updated data to the API
   
    return this.http.put(`${this.apiUrl}`, updatedData).subscribe(
      (resp) => {
        console.log('Home Data Updated Successfully');
       
      },
      (err) => {
        console.log('Error Updating Home Data');
      }
    );
   
  }
 
 
 
}