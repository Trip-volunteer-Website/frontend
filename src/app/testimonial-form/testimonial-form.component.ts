import { Component } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonial-form',
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.css']
})
export class TestimonialFormComponent {
  constructor(private home:TestimonialService){}
  createForm: FormGroup = new FormGroup({
    content: new FormControl("", [Validators.required, Validators.required])
  });


 // Method to handle form submission
 Create(){
   this.home.createNewtestimonial(this.createForm.value)
  }
}
