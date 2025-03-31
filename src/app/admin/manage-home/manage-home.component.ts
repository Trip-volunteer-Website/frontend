import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {
 
  homeData: any = [{}];
 
  constructor(public homeService: HomeService, public dialog: MatDialog) {}
 
  @ViewChild('callDeleteDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('updateDialog') updateDialog!: TemplateRef<any>;
 
  updateForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title1: new FormControl(),
    title2: new FormControl(),
    title3: new FormControl(),
    p1: new FormControl(),
    p2: new FormControl(),
    p3: new FormControl(),
    img1path: new FormControl(),
    img2path: new FormControl(),
    img3path: new FormControl()
  });
 
  previousData: any = {};
 
  ngOnInit(): void {
   
    this.homeService.getAllData().subscribe((data) => {
      this.homeData = data;
      console.log('data:',data);
      console.log('home data:',this.homeData);
    }, (error) => {
      console.error('Error fetching home data:', error);
    });
  }
  // Open Update Dialog and set form values
  openUpdateDialog(homeObj: any) {
    this.previousData = {
      home_Id: homeObj.id,
      title1: homeObj.title1,
      title2: homeObj.title2,
      title3: homeObj.title3,
      p1: homeObj.p1,
      p2: homeObj.p2,
      p3: homeObj.p3,
      img1: homeObj.img1path,
      img2: homeObj.img2path,
      img3: homeObj.img3path
    };
 
    this.updateForm.patchValue({
      id: homeObj.id,
      title1: homeObj.title1,
      title2: homeObj.title2,
      title3: homeObj.title3,
      p1: homeObj.p1,
      p2: homeObj.p2,
      p3: homeObj.p3,
      img1path: homeObj.img1path,
      img2path: homeObj.img2path,
      img3path: homeObj.img3path
    });
 
    this.dialog.open(this.updateDialog);
  }
 
  // Save Changes after updating
  saveChanges() {
    // Check if new image files are uploaded, if not, use previous image paths
    const updatedData = {
      ...this.updateForm.value,
      img1path: this.updateForm.get('img1path')?.value || this.previousData.img1,
      img2path: this.updateForm.get('img2path')?.value || this.previousData.img2,
      img3path: this.updateForm.get('img3path')?.value || this.previousData.img3
    };
 
    // Send the updated data (including the image paths) to the backend API
    this.homeService.updateData(updatedData);
    this.homeService.getAllData();
  }
 
 
  uploadImage(event: any, imgName: string) {
    const files = event.target.files;
    if (files.length === 0) return; // If no file is selected, do nothing
 
    const formData = new FormData();
    formData.append('file', files[0], files[0].name);
 
    // Call the upload service method
    this.homeService.uploadHomeImage(formData, imgName);
  }
}
