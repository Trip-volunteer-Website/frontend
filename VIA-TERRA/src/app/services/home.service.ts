import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // ✅ Fixed Import
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://localhost:7187/api/home';
  display_images: any = { img1: '', img2: '', img3: '' };

  constructor(private http: HttpClient) {}  // ✅ Fixed Dependency Injection

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  updateData(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, data);
  }

  uploadHomeImage(file: FormData, imageNumber: number): void {
    debugger;
    this.http.post(`${this.apiUrl}/uploadImage`, file)
      .subscribe((resp: any) => {
        console.log("Resp Upload function", resp);

        // Store images separately based on image number
        if (imageNumber === 1) {
          this.display_images.img1 = resp.imagename;
        } else if (imageNumber === 2) {
          this.display_images.img2 = resp.imagename;
        } else {
          this.display_images.img3 = resp.imagename;
        }
      }, (err: any) => {  // ✅ Explicitly Typed `err`
        alert('Something went wrong');
        console.error(err);
      });
  }
}
