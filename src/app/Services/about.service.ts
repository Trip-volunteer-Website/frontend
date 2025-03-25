import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(private http:HttpClient) { }
  message:string='hello from service';
  about:any=[];
  gitAllabout(){
this.http.get("https://localhost:7187/api/About").subscribe(resp=>{this.about=resp},
  err=>{console.log(err)})
}

deleteAbout(id: any) {
  return this.http.delete(`https://localhost:7187/api/About/deleteabout/${id}`);
}

createNewAbout(body:any){
  body.img1path=this.display_image;
  
  this.http.post('https://localhost:7187/api/About/',body).subscribe((resp)=>{
  
    console.log("created");
  },(err)=>{console.log(err.status);})


  window.location.reload();

}

 

display_image: any;

UploadAttachment(file: FormData) {
  return this.http.post('https://localhost:7187/api/About/UploudeImage', file).subscribe(
    (resp: any) => {
      this.display_image = resp.img1path;
      console.log("Uploaded Image Path:", this.display_image);
    },
    (err) => {
      console.log('Error uploading image:', err);
    }
  );
}

updateAbout(body: any) {
  return this.http.put('https://localhost:7187/api/About/', body).subscribe(
    () => {
      console.log("done");
      this.gitAllabout();
      window.location.reload();

    },
    (err) => {
      console.error("error", err);
    }
  );
}



}


