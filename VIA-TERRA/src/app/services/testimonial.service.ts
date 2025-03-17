import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'https://localhost:7187/api/testimonial';

  constructor(private http: HttpClient) {}

  getAllTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createTestimonial(testimonial: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, testimonial);
  }

  updateTestimonial(testimonial: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, testimonial);
  }
}
