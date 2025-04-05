import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProfileService } from '../Services/profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
 
export class ProfileComponent {
  userId: number | null = null;
  showEditForm = false;
@ViewChild('callUpdateDialog') callUpdateDialog!:TemplateRef<any>
  updateForm:FormGroup=new FormGroup({
    userid:new FormControl(),
    email :new FormControl(''),
    phone :new FormControl(''),
    fname :new FormControl(''),
    lname :new FormControl(''),
    country :new FormControl(''),
    age :new FormControl(''),
    imagePath :new FormControl(''),
  });
  constructor(public profile: ProfileService, public dialog:MatDialog) {}
 
  ngOnInit() {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = parseInt(userIdString, 10);
      if (this.userId) {
        this.profile.getUserById(this.userId);  
      }
    }
  }
 
  updateProfileImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.userData.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  pData:any={};
  openUpdateDialog(profileObj:any){
    this.pData={
      userid:profileObj.userid,
      email:profileObj.email,
      phone:profileObj.phone,
      fname:profileObj.fname,
      lname:profileObj.lname,
      country:profileObj.country,
      age:profileObj.age,

    }
    this.updateForm.controls['userid'].setValue(this.pData.userid);
    this.dialog.open(this.callUpdateDialog);
  }
 
  openEditForm() {
    this.showEditForm = true;
  }
 
  saveProfile() {  
    this.showEditForm = false;
    console.log("Profile updated:", this.profile.userData);
  }
 
  closeEditForm() {
    this.showEditForm = false;
  }
updateProfile(){
  this.profile.updateProfile(this.updateForm.value);
}
UploadImage(file:any){
  if(file.length==0){
   
    let fileToUpload=<File>file[0];
    const formData=new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.profile.uploadAttachment(formData)
  }
}
}