import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContactService } from '../Services/contact.service';
import { HeaderandfooterService } from '../Services/headerandfooter.service';
import { TestimonialService } from '../Services/testimonial.service';

declare var $: any; // ✅ حتى نقدر نستخدم jQuery

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {

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

    setTimeout(() => {
      console.log('Loaded header/footer data:', this.HF.headerandfooterarr);
    }, 2000);

    // تحميل التستيمونيالز
    this.test.getAllActiveTestimonial().subscribe(
      (res: any) => {
        this.testimonials = res;
        console.log('Testimonials loaded:', this.testimonials);
      },
      (err) => {
        console.error('❌ Failed to load testimonials:', err);
      }
    );
  }

  ngAfterViewInit(): void {
    // تهيئة الكاروسل بعد عرض الصفحة
    setTimeout(() => {
      $('.slide-one-item').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        margin: 20,
        nav: false
      });
    }, 100);
  }

  // إرسال نموذج التواصل
  Create() {
    this.contactform.createNewContant(this.createForm.value);
    if (this.createForm.valid) {
      alert('Thank you for contacting us!');
      this.createForm.reset();
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
