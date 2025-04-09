import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TripRequestService } from 'src/app/Services/trip-request.service';

@Component({
  selector: 'app-manage-trip-request',
  templateUrl: './manage-trip-request.component.html',
  styleUrls: ['./manage-trip-request.component.css']
})
export class ManageTripRequestComponent implements OnInit {
  previousData: any = {};
  tripIdToCheck: number | undefined;
  constructor(public tripReq: TripRequestService ,public dialog: MatDialog,public sanitizer: DomSanitizer ){}
  @ViewChild('callDeleteDialog') deleteDialog!:TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDailog!: TemplateRef<any>



  ngOnInit(): void {
  this.tripReq.getpendingRequests();
}
//UpdateForm
updateForm : FormGroup= new FormGroup
({
 requestid : new FormControl(),
 userid : new FormControl(),
 tripid : new FormControl(),
 requesttype : new FormControl(),
 cvfilepath : new FormControl(),
 requestedat : new FormControl(),
 status : new FormControl(),
 paymentid : new FormControl(),
})

openUpdateDialog(reqObj: any, status: string) {
  // Store the previous data and set the form values
  this.previousData = {
    requestid: reqObj.requestid,
    userid: reqObj.userid,
    tripid: reqObj.tripid,
    requesttype: reqObj.requesttype,
    cvfilepath: reqObj.cvfilepath,
    requestedat: reqObj.requestedat,
    status: status,  // Update status based on button click
    paymentid: reqObj.paymentid,
  };

  console.log('Previous Data:', this.previousData);

  // Set the form controls with the new data
  this.updateForm.controls['status'].setValue(this.previousData.status);
  this.updateForm.controls['requestid'].setValue(this.previousData.requestid);
  this.updateForm.controls['userid'].setValue(this.previousData.userid);
  this.updateForm.controls['tripid'].setValue(this.previousData.tripid);
  this.updateForm.controls['requesttype'].setValue(this.previousData.requesttype);
  this.updateForm.controls['cvfilepath'].setValue(this.previousData.cvfilepath);
  this.updateForm.controls['requestedat'].setValue(this.previousData.requestedat);
  this.updateForm.controls['paymentid'].setValue(this.previousData.paymentid);

  // Now the form is populated, and you can proceed to save the changes
  this.saveChanges();
}

saveChanges() {
   
  // Send the entire form data (including the updated 'status')
  this.tripReq.updateRequest(this.updateForm.value);
}
openCreateDialog() {
   // const dialogRef = this.dialog.open(CreateTriprequestComponent);
}
openDeleteDailog(id: number) {
  const dailogRef= this.dialog.open(this.deleteDialog);
  dailogRef.afterClosed().subscribe((result) => {
   if (result != undefined) {
   if (result == 'yes')
   this.tripReq.deleteRequest(id);
   else if (result == 'no')
   console.log('Thank you');
  }
})
}
availableSeats: { tripid: number, userSeats: number, volunteerSeats: number } | null = null;
checkAvailableSeats() {
  if (!this.tripIdToCheck) {
    alert('Please enter a Trip ID');
    return;
  }

  this.tripReq.getAvailableSeats(this.tripIdToCheck).subscribe({
    next: (res) => this.availableSeats = res,
    error: (err) => {
      console.error(err);
      alert('Could not retrieve seat info for the given Trip ID.');
      this.availableSeats = null;
    }
  });
}
 


}