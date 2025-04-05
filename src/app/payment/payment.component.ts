import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private paymentService: PaymentService) {
    this.paymentForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  submitPayment() {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;

      // جلب userId من localStorage
      const userIdString = localStorage.getItem('userId');
      const userId = userIdString ? parseInt(userIdString, 10) : null;

      if (!userId) {
        alert("❌ User ID not found. Please login first.");
        return;
      }

      const paymentData = {
        bankId: 1,               // ثابت
        userId: userId,          // من localStorage
        requestId: 2,            // ثابت
        method: 'Visa',          // ثابت
        amount: formData.amount  // من الفورم
      };

      // ✅ Call the service to submit the payment
      this.paymentService.createPayment(paymentData).subscribe(
        (resp: string) => {
          console.log("✅ Response:", resp);
          alert(resp); // رح يطبع "✅ Payment completed and invoice sent to your email."
          window.location.reload();
        },
        (err) => {
          console.error("❌ Payment failed:", err);
          alert("❌ Payment failed: " + (err?.error || 'Something went wrong.'));
        }
      );
  
}

  }
}