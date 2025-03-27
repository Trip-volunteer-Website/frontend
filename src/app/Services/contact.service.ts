import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  massage:string ="this massage from home services";
  contact:any=[];
  getallcontact(){
   this.http.get("https://localhost:7187/api/Contact").subscribe(
                    resp=>{
                      this.contact =resp;
                    }, err=>{
                      console.log(err);
                    }
   )
  }
  deletecontact(id: number) {
    this.http.delete("https://localhost:7187/api/Contact/DeleteContact/" + id).subscribe(
      resp =>{
        console.log("true");
      } , err =>{
        console.log("error");
      }
    )
    window.location.reload();
  }
  createNewContant(body: any) {
    this.http.post('https://localhost:7187/api/Contact/', body).subscribe(
      resp => {
        console.log("created");
        window.location.reload();
      },
      err => {
        console.log("error");
      }
    );}

}
