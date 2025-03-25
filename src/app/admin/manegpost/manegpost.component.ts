import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/Services/post.service';
import { CreatPostComponent } from '../creat-post/creat-post.component';

@Component({
  selector: 'app-manegpost',
  templateUrl: './manegpost.component.html',
  styleUrls: ['./manegpost.component.css']
})
export class ManegpostComponent {
  @ViewChild('callDelDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog!: TemplateRef<any>;

  postIdToDelete: any;
  pData: any = {};

  constructor(public post: PostService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.post.gitAllpost();
  }
// -----------------------------------------------------------------------------------------------------------------
  openDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.post.deletepost(id).subscribe(
          (reps) => {
            console.log('Item deleted successfully');
            this.post.gitAllpost(); // تحديث القائمة بدلاً من إعادة تحميل الصفحة
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
  // -----------------------------------------------------------------------------------------------------------------

  createNew(){
    this.dialog.open(CreatPostComponent)
  }

// ---------------------------------------------------------------------------------------------------------------------

updateForm: FormGroup = new FormGroup({
  postid: new FormControl(),  
  imagepath: new FormControl(''),  
  title: new FormControl(),  
  content: new FormControl() ,
  createdat: new FormControl() 



})




oldImagePath: string = ''; // متغير لتخزين مسار الصورة القديمة

openUpdateDialog(obj: any) {
  this.pData = obj;
  this.post.display_image = obj.imagepath; // حفظ الصورة القديمة في السيرفس
  
  this.updateForm.patchValue({
    postid: this.pData.postid,
    title: this.pData.title,
    content: this.pData.content,
    createdat: this.pData.createdat,
    imagepath: this.pData.imagepath
  });
  
  this.dialog.open(this.updateDialog);
}



Update() {
  if (this.updateForm.valid) {
    // إذا لم يتم تغيير الصورة، نستخدم القيمة القديمة
    if (!this.post.display_image || this.post.display_image === '') {
      this.updateForm.patchValue({ imagepath: this.pData.imagepath });
    } else {
      this.updateForm.patchValue({ imagepath: this.post.display_image });
    }
    
    this.post.updatepost(this.updateForm.value);
  }
}

uploadImage(file: any) {
  if (file.length === 0) return;
  
  let fileUpload = file[0];
  const formData = new FormData();
  formData.append('file', fileUpload, fileUpload.name);
  
  this.post.UploadAttachment(formData);
}
}