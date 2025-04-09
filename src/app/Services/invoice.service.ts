import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'https://localhost:7187/api/Invoice';
  constructor(private http: HttpClient) { }
 
  // Get all invoices
  getAllInvoices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
 