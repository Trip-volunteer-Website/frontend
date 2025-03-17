import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'https://localhost:7187/api/gallery';
  display_image: any;

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: FormData) {
    debugger;
    this.http.post(`${this.apiUrl}/uploadImage`, file)
      .subscribe((resp: any) => {
        console.log("Resp Upload function", resp);
        this.display_image = resp.imagename;
      }, err => {
        alert('Something went wrong');
        console.error(err);
      });
  }
}
