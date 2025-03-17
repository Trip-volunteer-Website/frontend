import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:7187/api/payment';

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payment);
  }

  updatePayment(payment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, payment);
  }
}
