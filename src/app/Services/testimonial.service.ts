import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) { }
  createNewTestimonial(body: any): Observable<any> {
    return this.http.post('https://localhost:7187/api/Testimonial/', body);
  }
  
  

  getAllTestimonial(): Observable<any> {
    return this.http.get("https://localhost:7187/api/Testimonial");
  }
  
  updateTestimonialStatus(id: number, status: string): Observable<any> {
    return this.http.put(`https://localhost:7187/api/Testimonial/ApprovOrRejectTestimonial/${id}/${status}`, null);
  }

  getAllActiveTestimonial(): Observable<any> {
    return this.http.get("https://localhost:7187/api/Testimonial/active");
  }
}
