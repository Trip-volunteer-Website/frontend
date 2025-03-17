import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:7187/api/contact';

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createContact(contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contact);
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, contact);
  }
}
