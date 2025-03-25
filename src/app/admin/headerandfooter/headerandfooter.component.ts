import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateHFComponent } from '../create-hf/create-hf.component';
import { Validators, FormControl, FormGroup } from '@angular/forms'; // استيراد صحيح

@Component({
  selector: 'app-headerandfooter',
  templateUrl: './headerandfooter.component.html',
  styleUrls: ['./headerandfooter.component.css']
})
export class HeaderandfooterComponent implements OnInit {  
    @ViewChild('callHFDialog') deleteDialog!: TemplateRef<any>; // إصلاح التسمية
    @ViewChild('callUpdateDialog') updateDialog!: TemplateRef<any>; // إصلاح التسمية

  constructor(public headerfooter: HeaderandfooterService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.headerfooter.getAllHF();  // ✅ استخدام الاسم الصحيح للدالة
    console.log('headerandfooter data:', this.headerfooter.headerandfooterarr);
  }

  

  
  openDialog(id: number) {
    console.log("🔍 Attempting to delete ID:", id); // ✅ تحقق من الـ ID
    const dialogRef = this.dialog.open(this.deleteDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.headerfooter.deleteHF(id).subscribe(
          () => {
            console.log('✅ Item deleted successfully');
            this.headerfooter.getAllHF();
          },
          (error) => {
            console.error('❌ Error deleting item:', error);
          }
        );
      } else {
        console.log("🚫 Deletion cancelled");
      }
    });
  }
  

    createNew(){
      this.dialog.open(CreateHFComponent)
    }

    pData:any={};
    openUpdateDialog(obj:any){
      this.pData=obj;
      this.updateForm.controls['id'].setValue(this.pData.id);
  this.dialog.open(this.updateDialog)
  
    }
    
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),  
    email: new FormControl(),  
    phonenumber: new FormControl(' '),  
    name: new FormControl() ,
    logo: new FormControl() ,
    location: new FormControl(), 
    content: new FormControl() 



  })

  Update() {
 

    console.log(this.pData);
    console.log(this.updateForm.value);
    this.headerfooter.updateHF(this.updateForm.value);
  }

  uploadImage(file:any){
  
    if(file.length==0)
      return;
    let fileUpload=<File>file[0];
    const formData=new FormData();
    formData.append('file',fileUpload,fileUpload.name);
    this.headerfooter.UploadAttachment(formData);
      }
  
}
