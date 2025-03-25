import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    firstName: 'Ahmad',
    lastName: 'Ali',
    country: 'jordan',
    email: 'ahmadali@gmail.com',
    password: '********',
    phone: '+962 776485420',
    age: 30,
    profileImage: 'assets/profile.jpg'
  };

  tripRequests = [
    { date: '2025-03-01', name: 'Paris Trip', status: 'pending' },
    { date: '2025-03-05', name: 'London Adventure', status: 'accepted' },
    { date: '2025-03-10', name: 'Dubai Getaway', status: 'rejected' }
  ];

  invoices = [
    { date: '2025-02-15', file: 'invoice1.pdf' },
    { date: '2025-02-20', file: 'invoice2.pdf' },
    { date: '2025-04-80', file: 'invoice3.pdf' }
  ];

  testimonials: string[] = [];
  showTestimonialInput = false;
  newTestimonial = '';

  addTestimonial() {
    if (this.newTestimonial.trim()) {
      this.testimonials.push(this.newTestimonial);
      this.newTestimonial = '';
      this.showTestimonialInput = false;
    }
  }
  updateProfileImage(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      // يمكنك هنا تنفيذ أي عملية لرفع الصورة إلى السيرفر أو تحديث الصورة محليًا
      console.log('Selected file:', file);
  
      // مثال: تحويل الصورة إلى URL لعرضها مباشرةً
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  editProfile() {
    console.log('Edit Profile button clicked!');
    // يمكنك هنا تنفيذ منطق تعديل الملف الشخصي، مثل فتح نافذة تعديل المعلومات
  }
  filteredInvoices = [...this.invoices];
  searchDate: string = '';

  filterInvoices() {
    if (this.searchDate) {
      this.filteredInvoices = this.invoices.filter(invoice => invoice.date === this.searchDate);
    } else {
      this.filteredInvoices = [...this.invoices];
    }
  }

  downloadInvoice(file: string) {
    const link = document.createElement('a');
    link.href = `assets/invoices/${file}`;
    link.download = file;
    link.click();
  }
  

  deleteTrip(trip: any) {
    if (confirm("are you sure to delete this request!!")) {
      this.tripRequests = this.tripRequests.filter(t => t !== trip);
    }
  }
  showEditForm = false; // التحكم في ظهور الفورم

// ✅ دالة لفتح النموذج
openEditForm() {
  this.showEditForm = true;
}

// ✅ دالة لحفظ التعديلات
saveProfile() {
  this.showEditForm = false;
  console.log("Profile updated:", this.user);
}

// ✅ دالة لإغلاق النموذج بدون حفظ
closeEditForm() {
  this.showEditForm = false;
}

}