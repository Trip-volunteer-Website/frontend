import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials-form',
  templateUrl: './testimonials-form.component.html',
  styleUrls: ['./testimonials-form.component.css']
})
export class TestimonialsFormComponent {
  // Define the testimonial object to hold form data
  testimonial = {
    name: '',
    message: '',
    image: null
  };

  // Method to handle form submission
  submitTestimonial() {
    console.log('Testimonial submitted:', this.testimonial);

    // You can perform the logic here to submit the testimonial, 
    // like sending the data to an API.
    
    // Optionally, reset the form after submission
    this.testimonial = { name: '', message: '', image: null };
  }

}
