import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

import { HeaderandfooterService } from 'src/app/Services/headerandfooter.service';
import { CreateHFComponent } from '../create-hf/create-hf.component';

interface HeaderFooter {
  id: number;
  email: string;
  phonenumber: string;
  name: string;
  logo: string;
  location: string;
  content: string;
}

@Component({
  selector: 'app-headerandfooter',
  templateUrl: './headerandfooter.component.html',
  styleUrls: ['./headerandfooter.component.css']
})
export class HeaderandfooterComponent implements OnInit {  
  @ViewChild('callHFDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog!: TemplateRef<any>;

  pData: HeaderFooter = {} as HeaderFooter; // تم تغيير الاسم من headerFooterData إلى pData
  updateForm: FormGroup;

  constructor(
    public headerfooter: HeaderandfooterService,
    public dialog: MatDialog
  ) {
    this.updateForm = new FormGroup({
      id: new FormControl(),
      email: new FormControl(),
      phonenumber: new FormControl(''),
      name: new FormControl(),
      logo: new FormControl(),
      location: new FormControl(),
      content: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadHeaderFooterData();
  }

  loadHeaderFooterData(): void {
    this.headerfooter.getAllHF();
    console.log('Header and footer data:', this.headerfooter.headerandfooterarr);
  }

  openDialog(id: number): void { // تم إعادة تسمية الدالة إلى openDialog كما في الأصل
    console.log("Attempting to delete ID:", id);
    const dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.headerfooter.deleteHF(id).subscribe(
          () => {
            console.log('Item deleted successfully');
            this.loadHeaderFooterData();
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

  createNew(): void { // تمت إضافة الدالة المفقودة
    this.dialog.open(CreateHFComponent);
  }

  openUpdateDialog(data: HeaderFooter): void {
    this.pData = { ...data };
    this.updateForm.patchValue({
      id: data.id,
      email: data.email,
      phonenumber: data.phonenumber,
      name: data.name,
      logo: data.logo,
      location: data.location,
      content: data.content
    });
    this.dialog.open(this.updateDialog);
  }

  Update(): void { // تمت إضافة الدالة المفقودة
    if (this.updateForm.valid) {
      console.log('Updating data:', this.updateForm.value);
      this.headerfooter.updateHF(this.updateForm.value);
    }
  }

  uploadImage(file: any): void { // تم تعديل نوع المعلمة لتناسب القالب
    if (file.length === 0) return;
    
    const fileUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileUpload, fileUpload.name);
    this.headerfooter.UploadAttachment(formData);
  }
}