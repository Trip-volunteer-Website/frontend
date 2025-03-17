import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripRequestService {
  private apiUrl = 'https://localhost:7187/api/triprequest';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createRequest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, request);
  }

  updateRequest(request: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, request);
  }
}
