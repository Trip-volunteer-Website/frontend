import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'; 
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-creat-post',
  templateUrl: './creat-post.component.html',
  styleUrls: ['./creat-post.component.css']
})
export class CreatPostComponent {
  constructor(private post:PostService){}


  createForm: FormGroup = new FormGroup({
    imagepath: new FormControl(),  
    title: new FormControl(' ', [Validators.required]),  
    content: new FormControl(' ', [Validators.required])  ,
    createdat: new FormControl(' ', [Validators.required]),  

  });


  create()
  {
this.post.createNewpost(this.createForm.value)
  }




  showForm: boolean = true;

  hideForm() {
    this.showForm = false;
  }

  uploadImage(file:any){
  
    if(file.length==0)
      return;
    let fileUpload=<File>file[0];
    const formData=new FormData();
    formData.append('file',fileUpload,fileUpload.name);
    this.post.UploadAttachment(formData);
      }

}



