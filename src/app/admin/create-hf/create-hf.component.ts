import { Component } from '@angular/core';
import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';
import { Validators, FormControl, FormGroup } from '@angular/forms'; // استيراد صحيح

@Component({
  selector: 'app-create-hf',
  templateUrl: './create-hf.component.html',
  styleUrls: ['./create-hf.component.css']
})
export class CreateHFComponent {
constructor(private headerandfooter: HeaderandfooterService){}

createForm: FormGroup = new FormGroup({
  email: new FormControl(' ', [Validators.required, Validators.email]),  
  phonenumber: new FormControl('', [Validators.required]),  
  name: new FormControl(' ', [Validators.required]),  
  logo: new FormControl(),  
  location: new FormControl(' ', [Validators.required]),  
  content: new FormControl(' ', [Validators.required])  
});

create() {
  debugger;
  let requestData = { 
    ...this.createForm.value, 
    phonenumber: Number(this.createForm.value.phonenumber)  
  };

  console.log("data", requestData);

  this.headerandfooter.createNewHF(requestData).subscribe(
    (resp) => {
      console.log("done", resp);
      this.headerandfooter.getAllHF();
    },
    (err) => {
      console.error("❌ error through creating", err);

     
      if (err.error && err.error.errors) {
        console.log("🔍 الأخطاء:", err.error.errors);
      } else if (err.message) {
        console.log("error details:", err.message);
      } else {
        console.log("un defined error happend .");
      }
    }
  );
}



uploadImage(file:any){
  debugger;
  if(file.length==0)
    return;
  let fileUpload=<File>file[0];
  const formData=new FormData();
  formData.append('file',fileUpload,fileUpload.name);
  this.headerandfooter.UploadAttachment(formData);
    }

}
