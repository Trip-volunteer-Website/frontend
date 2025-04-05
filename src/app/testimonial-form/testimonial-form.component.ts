import { Component } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';  // إضافة Snackbar
import { ProfileService } from '../Services/profile.service';


@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent {
  userId: number | null = null;
  successMessage: string | null = null;

  constructor(private home: TestimonialService, private snackBar: MatSnackBar , private profile: ProfileService) {}

  ngOnInit() {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = parseInt(userIdString, 10);
      if (this.userId) {
        this.profile.getUserById(this.userId);  
      }
    }
  }

  createForm: FormGroup = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  Create() {
    if (this.createForm.valid && this.userId !== null) {
      const testimonialData = {
        ...this.createForm.value,
        userId: this.userId
      };

      this.home.createNewTestimonial(testimonialData).subscribe(
        (resp) => {
          this.successMessage = 'Thank you for your feedback. Our admin will contact you shortly.';
          this.createForm.reset();
        },
        (err) => {
          this.snackBar.open('Failed to create testimonial', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        }
      );
    } else {
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }
}
