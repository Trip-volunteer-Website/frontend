import { Component,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { GalleryService } from 'src/app/Services/gallery.service';
 
@Component({
  selector: 'app-manage-gallery',
  templateUrl: './manage-gallery.component.html',
  styleUrls: ['./manage-gallery.component.css']
})
export class ManageGalleryComponent implements OnInit {
images: any= [{}];
 
  constructor(public galleryService : GalleryService, public dialog: MatDialog){}
  @ViewChild('callDeleteDialog') deleteDialog!:TemplateRef<any>;
  @ViewChild('createDialog') createDialog!:TemplateRef<any>;
 
  ngOnInit(): void {
    this.galleryService.getAllImages();
  }
 
  openDeleteDialog(id:number) {
    const dailogRef= this.dialog
    .open(this.deleteDialog);
     dailogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined){
         if(result="yes"){
           this.galleryService.deleteImage(id);
           window.location.reload();
         }else if(result='no'){
           console.log("Thank you !!")
         }
       }
     })
    //  
 }
 
 // Create Image
   createForm:FormGroup=new FormGroup({
     imageId:new FormControl(),
     ImagePath: new FormControl()
   })
 
  //  Create(){
  //    this.galleryService.createImage(this.createForm.value);
     
  //  }
   openCreateDialog(){
     const dailogRef = this.dialog.open(this.createDialog)
   
   }
 
 
 
 
  uploadImage(file:any){
   
    if(file.length==0)
 
      return ;
     
      let fileToUpload=<File>file[0];
     
      const formData=new FormData();
     
      formData.append('file',fileToUpload,fileToUpload.name);
     
      this.galleryService.createImage(formData);
      // window.location.reload();
  }
 
 
}
 