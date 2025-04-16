import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { TripService } from 'src/app/Services/trip.service';
 
@Component({
  selector: 'app-trip-map',
  templateUrl: './trip-map.component.html',
  styleUrls: ['./trip-map.component.css']
})
export class TripMapComponent implements OnInit {
  map!: L.Map;
  marker?: L.Marker;
  tripForm: FormGroup;
  showForm = false;
  trips: any[] = [];
 
  selectedLocation = {
    latitude: 0,
    longitude: 0,
    name: ''
  };
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tripService: TripService
  ) {
    this.tripForm = this.fb.group({
      tripname: ['', Validators.required],
      location: [{ value: '', disabled: true }],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      price: ['', [Validators.required]],
      minage: ['', [Validators.required]],
      description: ['', Validators.required],
      maxvolunteers: ['', [Validators.required]],
      maxusers: ['', [Validators.required]],
      status: ['active', Validators.required],
      longitude: [{ value: '', disabled: true }],
      latitude: [{ value: '', disabled: true }]
    });
  }
  // ***********************
 
 
 
  // ************************
  ngOnInit(): void {
    this.initMap();// تهيئة الخريطة
    this.tripForm.get('startdate')?.valueChanges.subscribe((startDate) => {
      this.updateStatusBasedOnDate(startDate);
    });
    this.loadTrips();// تحميل الرحلات
  }
 
private updateStatusBasedOnDate(startDate: string): void {
  if (!startDate) return;
 
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(startDate);
  selectedDate.setHours(0, 0, 0, 0);
 
  const statusControl = this.tripForm.get('status');
  if (selectedDate > today) {
    statusControl?.setValue('active');
  } else {
    statusControl?.setValue('completed');
  }
}
 // تهيئة الخريطة ومكانها المبدئي
  initMap(): void {
    this.map = L.map('map').setView([31.9539, 35.9106], 8);// مركزها على عمان 
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
   // عند النقر على الخريطة يتم تنفيذ هذا الحدث
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.onMapClick(e);
    });
  }
 
  onMapClick(e: L.LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;
 
    // إذا كان هناك ماركر قديم، يتم إزالته
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
 
    // إنشاء أيقونة مخصصة
    const customIcon = L.icon({
      iconUrl: '../../assets/images/trip-icon.png', // ضع مسار الصورة هنا
      iconSize: [40, 40], // تعديل حجم الأيقونة
      iconAnchor: [20, 40], // ضبط النقطة المرجعية
      popupAnchor: [0, -40] // تعديل موقع النافذة المنبثقة
    });
 
    // إضافة الماركر مع الأيقونة المخصصة
    this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map)
      .bindPopup(`<b>selected location</b><br>(${lat.toFixed(5)}, ${lng.toFixed(5)})`).openPopup();
 
    // تحديث القيم في الفورم
    this.reverseGeocode(lat, lng);
  }
 
 
 
  // جلب اسم الموقع من OpenStreetMap باستخدام إحداثيات
  reverseGeocode(lat: number, lng: number): void {
    this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
      .subscribe((response: any) => {
        const locationName = response.display_name || 'Unknown location';
 //هون بضيف خطوط الطول ودوائر العرض 
        this.selectedLocation = { latitude: lat, longitude: lng, name: locationName };
 
         // تعبئة القيم في الفورم
        this.tripForm.patchValue({
          latitude: lat,
          longitude: lng,
          location: locationName  // Only the name of the location (string)
        });
 
        this.showForm = true; // إظهار الفورم بعد تحديد الموقع
      }, error => {
        console.error('Error in reverse geocoding', error);
        this.selectedLocation = { latitude: lat, longitude: lng, name: 'Location name unavailable' };
        this.tripForm.patchValue({
          latitude: lat,
          longitude: lng,
          location: 'Location name unavailable'  // Fallback name
        });
        this.showForm = true;
      });
  }
 
 // تحميل الرحلات من السيرفر
  loadTrips(): void {
    this.tripService.getAllTrips().subscribe((trips: any) => {
      this.trips = trips;
    });
  }
    // إنشاء رحلة جديدة
  create(): void {
    if (this.tripForm.valid) {
      const tripData = this.tripForm.value;
 
      // تقريب خطوط الطول والعرض إلى 6 منازل عشرية
      tripData.latitude = parseFloat(this.selectedLocation.latitude.toFixed(6));
      tripData.longitude = parseFloat(this.selectedLocation.longitude.toFixed(6));
      tripData.location = this.selectedLocation.name;
 
      console.log('Form Data:', tripData);
 
      this.tripService.createNewTrips(tripData).subscribe(
        (response) => {
          console.log('Trip created successfully:', response);
          // this.loadTrips();
          // this.resetForm();
          window.location.reload();
        },
        (error) => {
          console.error('Error creating trip:', error);
          console.error('Validation Errors:', error.error.errors);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
 
 
 // cancel ********* user *****لو عمل ال 
  resetForm(): void {
    this.tripForm.reset();            // 🧽 مسح كل البيانات المُدخلة في النموذج
    this.showForm = false;            // 🫣 إخفاء النموذج من الشاشة
    if (this.marker) {
      this.map.removeLayer(this.marker);  // 🗑️ إزالة الماركر من الخريطة
    }
  }
}
 
 