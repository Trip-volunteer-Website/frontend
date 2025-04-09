import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../Services/payment.service';
import { TripRequestService } from '../Services/trip-request.service';
import { TripService } from '../Services/trip.service';
 
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  requestId!: number;
  amount: number = 0;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private tripRequestService: TripRequestService,
    private tripService: TripService
  ) {
    this.paymentForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required],
      amount: [{ value: '', disabled: true }] // Readonly input for amount
    });
  }
 
  ngOnInit(): void {
    const requestIdParam = this.route.snapshot.paramMap.get('requestId');
    if (requestIdParam) {
      this.requestId = parseInt(requestIdParam, 10);
      console.log("Received requestId:", this.requestId);
      this.fetchAmountForRequest(this.requestId); // ✅ Fetch trip amount based on request ID
    } else {
      console.error("❌ No requestId in route.");
    }
  }
 
  fetchAmountForRequest(requestId: number): void {
    debugger;
    this.tripRequestService.getAllRequests(); // Fills tripReqData[]
    const req = this.tripRequestService.tripReqData.find((r: any) => r.requestid === requestId);
    if (req) {
      const tripId = req.tripid;
      this.tripService.getAllTrips().subscribe((trips: any[]) => {
        const trip = trips.find(t => t.tripid === tripId);
        if (trip) {
          this.amount = trip.price;
          this.paymentForm.get('amount')?.setValue(this.amount);
        } else {
          console.error("❌ Trip not found for tripId:", tripId);
        }
      });
    } else {
      console.error("❌ Request not found for requestId:", requestId);
    }
  }
 
  submitPayment(): void {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;
      const userId= Number(localStorage.getItem('userId'));
 
      if (!userId) {
        alert("User ID not found. Please login first.");
        return;
      }
 
      const paymentData = {
        bankId: 1,
        userId: userId,
        requestId: this.requestId,
        method: 'Visa',
        amount: this.amount
      };
 
      this.paymentService.createPayment(paymentData).subscribe(
        (resp: any) => {
          alert(resp.message);
          window.location.reload(); // Redirect after success
       
        },
        (err) => {
          console.error("Payment failed:", err);
          alert("Payment failed: " + (err?.error || 'Something went wrong.'));
        }
      );
    }
  }
}
 