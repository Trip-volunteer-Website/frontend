import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContactService } from '../Services/contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private contactform:ContactService){}
  createForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phonenumber: new FormControl("", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    content: new FormControl("", [Validators.required])
  });
Create(){
 this.contactform.createNewContant(this.createForm.value)
}
}
