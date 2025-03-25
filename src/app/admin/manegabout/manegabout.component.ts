import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AboutService } from 'src/app/Services/about.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAboutComponent } from '../create-about/create-about.component';
import { Validators, FormControl, FormGroup } from '@angular/forms'; // استيراد صحيح

@Component({
  selector: 'app-manegabout',
  templateUrl: './manegabout.component.html',
  styleUrls: ['./manegabout.component.css']
})
export class ManegaboutComponent implements OnInit {
  @ViewChild('callDelDialog') deleteDialog!: TemplateRef<any>; // إصلاح التسمية
  @ViewChild('callUpdateDialog') updateDialog!: TemplateRef<any>; // إصلاح التسمية

  aboutIdToDelete: any; // متغير لتخزين الـ ID الذي سيتم حذفه

  constructor(public about: AboutService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.about.gitAllabout(); // تحميل البيانات عند بدء التشغيل
    console.log('about data:', this.about.about);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.about.deleteAbout(id).subscribe(
          () => {
            console.log('Item deleted successfully');
            this.about.gitAllabout(); // تحديث القائمة بدلاً من إعادة تحميل الصفحة
          },
          (error) => {
            console.error('Error deleting item:', error);
          }
        );
      } else {
        console.log("Deletion cancelled");
      }
    });
  }
  
  createNew(){
    this.dialog.open(CreateAboutComponent)
  }

  pData:any={};
//   openUpdateDialog(obj:any){
//     this.pData=obj;
//     this.updateForm.controls['id'].setValue(this.pData.id);
// this.dialog.open(this.updateDialog)

//   }

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),  
    title1: new FormControl(),  
    img1path: new FormControl(' '),  
    content: new FormControl() 



  })
 

//   Update()
//   {
   
// console.log(this.pData);
// console.log(this.updateForm.value);
// this.home.updateAbout(this.updateForm.value);
//   }

Update() {
  // نستخدم الصورة الجديدة إذا تم رفعها، وإلا نستخدم القديمة
  const imageToUse = this.about.display_image || this.pData.img1path;
  
  this.updateForm.patchValue({
    img1path: imageToUse
  });

  console.log('Data being sent:', this.updateForm.value);
  this.about.updateAbout(this.updateForm.value);
  
  // نعيد تعيين display_image بعد الاستخدام
  this.about.display_image = null;
}

uploadImage(file: any) {
  if (file.length == 0) {
    this.about.display_image = null;
    return;
  }
  
  let fileUpload = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileUpload, fileUpload.name);
  
  this.about.UploadAttachment(formData);
}

openUpdateDialog(obj: any) {
  this.pData = obj;
  this.updateForm.patchValue({
    id: this.pData.id,
    title1: this.pData.title1,
    content: this.pData.content,
    img1path: this.pData.img1path // نضيف الصورة الحالية هنا
  });
  
  this.dialog.open(this.updateDialog);
}
  
}
