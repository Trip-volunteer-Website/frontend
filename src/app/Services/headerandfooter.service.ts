import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderandfooterService {
  headerandfooterarr: any = [];

  constructor(private http: HttpClient) {}

  getAllHF() {  // ✅ تصحيح اسم الدالة
    this.http.get("https://localhost:7187/api/StaticHeaderAndFooter")
      .subscribe(
        (resp: any) => {
          this.headerandfooterarr = resp;  // ✅ تخزين البيانات بشكل صحيح
          console.log("Data loaded successfully", this.headerandfooterarr);
        },
        err => {
          console.error("Error occurred while fetching data:", err);
        }
      );
  }
  homeData: any = [{}]; // يحتوي بيانات العنصر الواحد
 
  getDatabyId(id: number) {
   
    this.http.get(`"https://localhost:7187/api/StaticHeaderAndFooter")/getbyId/${id}`)
      .subscribe((res: any) => {
        this.homeData  = res;
        console.log("header and footer ",this.homeData);
      }, err => {
        console.log('Error in header and footer :', err.status);
      });
  }

  deleteHF(id: any) {
    return this.http.delete(`https://localhost:7187/api/StaticHeaderAndFooter/DeleteStaticheaderandfooter/${id}`);
  }




  createNewHF(body: any) {
    body.logo=this.display_image;

    return this.http.post('https://localhost:7187/api/StaticHeaderAndFooter/', body);
  }

  updateHF(body: any) {
      body.logo = this.display_image;  // ✅ Use updated image path
    
    this.http.put('https://localhost:7187/api/StaticHeaderAndFooter/', body).subscribe(
      () => {
        console.log("✅ Updated successfully");
        window.location.reload();
      },
      (err) => {
        console.log("❌ Error updating:", err.status);
      }
    );
  }
  
  
  
  
  display_image:any
  UploadAttachment(file: FormData) {
    return this.http.post('https://localhost:7187/api/StaticHeaderAndFooter/UploudImage', file).subscribe(
      (resp: any) => {
        this.display_image = resp.logo; // حفظ مسار الصورة الصحيح بدون fakepath
        console.log("Uploaded Image Path:", this.display_image);
      },
      (err) => {
        console.log('Error uploading image:', err);
      }
    );
  }
  
  
  
}
