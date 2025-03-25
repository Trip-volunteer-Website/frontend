import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TripService } from 'src/app/Services/trip.service';
import { MatDialog } from '@angular/material/dialog';
import { TripMapComponent } from '../trip-map/trip-map.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  @ViewChild('calltripDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog!: TemplateRef<any>;

  startDateFilter: string = '';
  endDateFilter: string = '';
  filteredTrips: any[] = [];

  constructor(
    public trip: TripService,
    public dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.trip.getAllTrips().subscribe(
      (data: any[]) => {
        this.trip.TripArr = data;
        this.filteredTrips = [...this.trip.TripArr]; // Initialize filtered trips
        console.log('Trip data:', this.trip.TripArr);
      },
      (error) => {
        console.error('Error fetching trip data:', error);
      }
    );
  }


  filterTripsByDate() {
    if (!this.startDateFilter && !this.endDateFilter) {
      this.filteredTrips = [...this.trip.TripArr];
      return;
    }
    const startDate = this.startDateFilter ? new Date(this.startDateFilter) : null;
    const endDate = this.endDateFilter ? new Date(this.endDateFilter) : null;

    this.filteredTrips = this.trip.TripArr.filter(trip => {
      const tripStartDate = new Date(trip.startdate);
      const tripEndDate = new Date(trip.enddate);

      // Filter logic:
      // 1. If only start date is selected, show trips starting after that date
      // 2. If only end date is selected, show trips ending before that date
      // 3. If both are selected, show trips within the range
      const matchesStart = !startDate || tripStartDate >= startDate;
      const matchesEnd = !endDate || tripEndDate <= endDate;
      
      return matchesStart && matchesEnd;
    });
  }

  clearDateFilters() {
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.filteredTrips = [...this.trip.TripArr];
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(this.deleteDialog);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.trip.deletetrip(id).subscribe(
          () => {
            console.log('Item deleted successfully');
            // Refresh the list after deletion
            this.trip.getAllTrips().subscribe(
              (data: any[]) => {
                this.trip.TripArr = data;
              },
              (error) => {
                console.error('Error fetching trip data:', error);
              }
            );
          },
          (error) => {
            console.error('Error deleting item:', error);
            // Handle the error, e.g., show a user-friendly message
          }
        );
      } else {
        console.log("Deletion cancelled");
      }
    });
  }

  createNew() {
    this.dialog.open(TripMapComponent, { width: '900px', height: '800px' });
  }

  pData: any = {};

  // Open the Update Dialog and set the form values
  openUpdateDialog(obj: any) {
    this.pData = obj;
    this.updateForm.patchValue({
      tripid: this.pData.tripid,
      tripname: this.pData.tripname,
      startdate: this.pData.startdate,
      enddate: this.pData.enddate,
      price: this.pData.price,
      minage: this.pData.minage,
      description: this.pData.description,
      maxvolunteers: this.pData.maxvolunteers,
      maxusers: this.pData.maxusers,
      status: this.pData.status
    });
  
    const dialogRef = this.dialog.open(this.updateDialog, {
      width: '900px',
      height: '800px',
      panelClass: 'custom-dialog-container'
    });
  }

  updateForm: FormGroup = this.fb.group({
    tripid: [''],
    tripname: [''],
    startdate: [''],
    enddate: [''],
    price: [''],
    minage: [''],
    description: [''],
    maxvolunteers: [''],
    maxusers: [''],
    status: ['']
  });
  Update() {
    const updatedData = {
      ...this.updateForm.value, // البيانات المحدثة من الفورم
      location: this.pData.location, // إبقاء قيمة الموقع كما هي
      latitude: this.pData.latitude, // إبقاء قيمة خط العرض كما هي
      longitude: this.pData.longitude // إبقاء قيمة خط الطول كما هي
    };
  
    console.log('Updated Data:', updatedData);
    this.trip.updatetrip(updatedData);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
