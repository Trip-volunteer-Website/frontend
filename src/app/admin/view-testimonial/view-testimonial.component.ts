import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-view-testimonial',
  templateUrl: './view-testimonial.component.html',
  styleUrls: ['./view-testimonial.component.css']
})
export class ViewTestimonialComponent implements OnInit {
  testimonials: any[] = [];  // متغير لتخزين البيانات المحملة من API
  
  constructor(public test: TestimonialService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTestimonials(); // استدعاء الدالة لتحميل البيانات
  }

  // دالة لتحميل البيانات من API وتخزينها
  loadTestimonials() {
    this.test.getAllTestimonial().subscribe(
      (resp) => {
        this.testimonials = resp;  // تخزين البيانات المسترجعة في المتغير
      },
      err => {  // التعامل مع الأخطاء في حال حدوثها
        this.snackBar.open('❌ Failed to load testimonials', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error loading testimonials:', err);  // تسجيل الخطأ في الكونسول لتسهيل التشخيص
      }
    );
  }

  // دالة لتغيير الحالة
  changeStatus(testimonialId: number, newStatus: string) {
    this.test.updateTestimonialStatus(testimonialId, newStatus).subscribe(
      (resp) => {
        this.snackBar.open('✅ Status updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: newStatus === 'active' ? 'success-snackbar' : 'error-snackbar'
        });

        this.loadTestimonials();  // إعادة تحميل البيانات بعد تحديث الحالة
      },
      (err) => {
        this.snackBar.open('❌ Failed to update status', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        console.error('Error updating status:', err);  // تسجيل الخطأ في الكونسول
      }
    );
  }
}
