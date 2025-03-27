import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http:HttpClient) { }
  createNewtestimonial(body: any) {
    this.http.post('https://localhost:7187/api/Testimonial/', body).subscribe(
      resp => {
        console.log("created");
        window.location.reload();
      },
      err => {
        console.log("error");
      }
    );

}
test:any=[];
getAllTestimonial(){
  this.http.get("https://localhost:7187/api/Testimonial").subscribe(
                   resp=>{
                     this.test =resp;
                     console.log(resp)
                   }, err=>{
                     console.log(err);
                   }
  )
 }
 updateTestimonialStatus(id: number, status: string) {
  return this.http.put(`https://localhost:7187/api/Testimonial/ApprovOrRejectTestimonial/${id}/${status}`, null);
}

}
