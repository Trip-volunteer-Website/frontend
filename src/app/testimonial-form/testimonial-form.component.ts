import { Component } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';  // إضافة Snackbar

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent {
  constructor(private home: TestimonialService, private snackBar: MatSnackBar) {}

  // تعريف الفورم
  createForm: FormGroup = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  // دالة للتحقق من صحة الفورم قبل الإرسال
  Create() {
    if (this.createForm.valid) {
      // استدعاء خدمة إضافة التوصية
      this.home.createNewTestimonial(this.createForm.value).subscribe(
        (resp) => {
          // عرض رسالة نجاح
          this.snackBar.open('Testimonial Created Successfully!', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
          // يمكنك إغلاق النموذج أو إعادة تعيينه هنا
          this.createForm.reset();
        },
        (err) => {
          // عرض رسالة خطأ إذا حدث شيء خاطئ
          this.snackBar.open('Failed to create testimonial', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      );
    } else {
      // عرض رسالة إذا كانت البيانات غير صالحة
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }
}
