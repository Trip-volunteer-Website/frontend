import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr: ToastrService) { }

  postArr:any=[];
  gitAllpost(){
    // this.spinner.show();
this.http.get("https://localhost:7187/api/Post").subscribe(resp=>{
  this.postArr=resp;

  this.toastr.success("the data sucsessfuly git",'Sucsess');
},
  err=>{console.log(err);
    // this.spinner.hide();
    this.toastr.error("some thing wrong!!!");
  })
 
}



deletepost(id: any) {
  return this.http.delete(`https://localhost:7187/api/Post/DeletePost/${id}`);

  window.location.reload();
}



display_image:any={};

createNewpost(body:any){
  body.imagepath=this.display_image;
  
  this.http.post('https://localhost:7187/api/Post/',body).subscribe((resp)=>{
  
    console.log("created");
  },(err)=>{console.log(err.status);})


  window.location.reload();

}



updatepost(body: any) {
  // لا حاجة لمعالجة الصورة هنا لأنها معالجة مسبقاً في الكومبوننت
  this.http.put('https://localhost:7187/api/Post/', body).subscribe(
    () => {
      this.toastr.success('updateding done ');
      this.gitAllpost(); // تحديث البيانات بدلاً من إعادة تحميل الصفحة
    },
    (err) => {
      this.toastr.error('erroe in updating');
      console.error(err);
    }
  );
}

UploadAttachment(file: FormData) {
  return this.http.post('https://localhost:7187/api/Post/uploadImage', file).subscribe(
    (resp: any) => {
      this.display_image = resp.imagepath;
      this.toastr.success('uploded image sucssesfully');
    },
    (err) => {
      this.toastr.error('error uoloding image');
      console.error(err);
    }
  );
}
}