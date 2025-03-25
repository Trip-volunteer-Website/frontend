import { Component } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'; // استيراد صحيح
import { AboutService } from 'src/app/Services/about.service';

@Component({
  selector: 'app-create-about',
  templateUrl: './create-about.component.html',
  styleUrls: ['./create-about.component.css']
})
export class CreateAboutComponent {
constructor(private about:AboutService){}

  createForm: FormGroup = new FormGroup({
    title1: new FormControl(' ', [Validators.required]),  
    img1path: new FormControl(),  
    content: new FormControl(' ', [Validators.required])  
  });

  


  create()
  {
this.about.createNewAbout(this.createForm.value)
  }



  
  showForm: boolean = true; // يتحكم في ظهور الفورم

  hideForm() {
    this.showForm = false; // يخفي الفورم عند الضغط على إلغاء
  }

  uploadImage(file:any){
  
    if(file.length==0)
      return;
    let fileUpload=<File>file[0];
    const formData=new FormData();
    formData.append('file',fileUpload,fileUpload.name);
    this.about.UploadAttachment(formData);
      }
}
