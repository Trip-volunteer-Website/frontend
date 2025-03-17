import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadTestimonials();
  }

  // Simulated testimonials data (Replace with actual data later)
  loadTestimonials(): void {
    this.testimonials = [
      {
        id: 1,
        name: 'John Doe',
        message: 'This trip was amazing! Highly recommend it.',
        profilePicture: 'assets/HomeDesign/images/person_1.jpg'
      },
      {
        id: 2,
        name: 'Jane Smith',
        message: 'A wonderful experience with great people!',
        profilePicture: 'assets/HomeDesign/images/person_2.jpg'
      }
    ];
  }
}
