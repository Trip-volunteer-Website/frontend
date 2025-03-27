import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  @ViewChild('callDeleteDialoge') callDeleteDialog!: TemplateRef<any>;
 ngOnInit(): void {
    this.viewContact.getallcontact();
  }

 
  constructor(public viewContact:ContactService, public dialog: MatDialog) {}

  openDeleteDialoge(id: number) {
    console.log('Dialog opened');
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == "yes") {
          this.viewContact.deletecontact(id);
        } else if (result == "no") {
          console.log("Thank you !!");
        }
      }
    });
  }
}
