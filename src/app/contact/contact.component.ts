import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ContactService } from '../Services/contact.service';
import { HeaderandfooterService } from '../Services/headerandfooter.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  ngOnInit(): void {
    this.HF.getAllHF();
  
    setTimeout(() => {
      console.log('Loaded header/footer data:', this.HF.headerandfooterarr);
    }, 2000);
  }
  
  constructor(private contactform:ContactService , private HF :HeaderandfooterService){}
  createForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phonenumber: new FormControl("", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    content: new FormControl("", [Validators.required])
  });
Create(){
 this.contactform.createNewContant(this.createForm.value);
 if (this.createForm.valid) {
  alert('Thank you for contacting us!');
  this.createForm.reset();
}

}
get headerFooterInfo(): any {
  return this.HF.headerandfooterarr[0]; // أول عنصر فقط
}


}
