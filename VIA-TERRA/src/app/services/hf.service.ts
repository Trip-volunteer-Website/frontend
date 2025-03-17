import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticHeaderAndFooterService {
  private apiUrl = 'https://localhost:7187/api/staticHeaderAndFooter';
  display_image: any;

  constructor(private http: HttpClient) {}

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

  uploadLogo(file: FormData) {
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
