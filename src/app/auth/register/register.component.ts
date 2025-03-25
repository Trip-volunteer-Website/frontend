import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
    gender: new FormControl('', [Validators.required]), 
    repeatPassword: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) {}

  matchError() {
    if (this.registerForm.controls['password'].value === this.registerForm.controls['repeatPassword'].value) {
      this.registerForm.controls['repeatPassword'].setErrors(null);
    } else {
      this.registerForm.controls['repeatPassword'].setErrors({ misMatch: true });
    }
  }

  register() {
    console.log(this.registerForm.value);
  }

  goToLogin() {
    this.router.navigate(['security/login']);
  }

  getErrorMessage(field: string): string {
    if (this.registerForm.controls[field].hasError('required')) {
      return 'This field is required';
    }
    if (field === 'email' && this.registerForm.controls[field].hasError('email')) {
      return 'Not a valid email';
    }
    if (field === 'password' && this.registerForm.controls[field].hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }
  
}
