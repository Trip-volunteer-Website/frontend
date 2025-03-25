import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'https://localhost:7187/api/Trip'; // رابط API الرحلات

  constructor(private http: HttpClient) { }

  TripArr: any[] = [];

  getAllTrips(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  

  createNewTrips(body: any): Observable<any> {
    return this.http.post('https://localhost:7187/api/Trip/', body);

  }
  

  deletetrip(id: any) {
    return this.http.delete(`https://localhost:7187/api/Trip/deletetrip/${id}`);
  }




  updatetrip(body: any) {


   
  
    this.http.put('https://localhost:7187/api/Trip/', body).subscribe(
      () => {
        console.log("updated");
      },
      (err) => {
        console.log(err.status);
      }
    );
  
    window.location.reload();
  }
  







  }
  























