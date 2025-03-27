import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-view-testimonial',
  templateUrl: './view-testimonial.component.html',
  styleUrls: ['./view-testimonial.component.css']
})
export class ViewTestimonialComponent implements OnInit {

  constructor(public test: TestimonialService,  private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.test.getAllTestimonial();
  }
  changeStatus(testimonialId: number, newStatus: string) {
    this.test.updateTestimonialStatus(testimonialId, newStatus).subscribe(() => {
      this.snackBar.open('✅ Status updated successfully', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: newStatus === 'active' ? 'success-snackbar' : 'error-snackbar'
      });
  
      this.test.getAllTestimonial();
    }, err => {
      this.snackBar.open('❌ Failed to update status', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }
}
