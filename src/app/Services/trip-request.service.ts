import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class TripRequestService {
  private apiUrl = 'https://localhost:7187/api/TripRequest';
  tripReqData: any = [{}];  
  tripData : any= [{}];
 
 
  constructor(private http: HttpClient) {}
 
 
 
  getAllRequests() {
   
    this.http.get(`${this.apiUrl}/all`)
      .subscribe((res: any) => {
        this.tripReqData = res;
        console.log(this.tripReqData);
      }, err => {
        console.log('Error:', err.status);
      });
  }
 
 
 
  deleteRequest(id:number){
    this.http.delete(`${this.apiUrl}/deleteTripReq/`+id)
      .subscribe((resp:any)=>{
      console.log('Deleted');
      alert('The Request Deleted Successfully')
    }, err=>{
      console.log('Something went wrong');
    });
  }
 
  updateRequest(body: any) {
    this.http.put(`${this.apiUrl}`,body).subscribe((resp: any) =>
   {
     alert('Updated Sucessfully');
   }, err => {
     alert('Something wont wrong');
     console.log(err);
    })
  }
 
  createRequest(data: any) {
    data.cvfilepath=this.displayCV
    this.http.post(`${this.apiUrl}`, data).subscribe(() => {
        console.log('Created Successfully',data);
        alert('Created Successfully');
      }, (err: { status: any; }) => {
        console.log('Error:', err.status);
        alert('Something went wrong');
      });
  }

  displayCV: any;
 
  uploadAttachment(file: FormData, onUploaded: (fileName: string) => void) {
    this.http.post(`${this.apiUrl}/uploadAttachment`, file).subscribe((resp: any) => {
      console.log("Resp Upload Function", resp);
      this.displayCV = resp.cvfilepath; // assuming backend returns this correctly
      onUploaded(this.displayCV); // pass filename to callback
    }, err => {
      alert('Something went wrong during upload');
      console.log(err);
    });
  }
 
 
 
 
 
 
 
}
 