import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContactService } from '../Services/contact.service';
import { HeaderandfooterService } from '../Services/headerandfooter.service';
import { TestimonialService } from '../Services/testimonial.service';

declare var $: any; // ✅ لاستخدام jQuery

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public testimonials: any[] = [];

  constructor(
    private contactform: ContactService,
    private HF: HeaderandfooterService,
    public test: TestimonialService
  ) {}

  // ✅ النموذج
  createForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phonenumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    content: new FormControl("", [Validators.required])
  });

  ngOnInit(): void {
    // تحميل الهيدر والفوتر
    this.HF.getAllHF();

    // تحميل التستيمونيالز
    this.test.getAllActiveTestimonial().subscribe(
      (res: any) => {
        this.testimonials = res;
        console.log('✅ Testimonials loaded:', this.testimonials);

        // ✅ تهيئة الكاروسيل بعد التأكد من تحميل البيانات
        setTimeout(() => {
          $('.slide-one-item').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 600,
            margin: 20,
            nav: false,
            dots: true,
            responsive: {
              0: { items: 1 },
              768: { items: 2 },
              1024: { items: 3 }
            }
          });
        }, 200);
      },
      (err) => {
        console.error('❌ Failed to load testimonials:', err);
      }
    );
  }

  // إرسال نموذج التواصل
  Create() {
    if (this.createForm.valid) {
      this.contactform.createNewContant(this.createForm.value);
      alert('✅ Thank you for contacting us!');
      this.createForm.reset();
    } else {
      alert('❌ Please fill in all required fields correctly.');
    }
  }

  // بيانات الهيدر والفوتر
  get headerFooterInfo(): any {
    return this.HF.headerandfooterarr[0];
  }

  // بناء مسار الصورة المحلية
  getLocalImagePath(fileName: string): string {
    return `assets/images/${fileName}`;
  }
}
