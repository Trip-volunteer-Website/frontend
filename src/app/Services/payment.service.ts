import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  // GET ALL
  getPayments() {
    return this.http.get<any[]>("https://localhost:7187/api/Payment");
  }

  // ✅ CREATE NEW PAYMENT
  createPayment(paymentData: any) {
    return this.http.post("https://localhost:7187/api/Payment/pay", paymentData, {
      responseType: 'text' // ✅ مهم جداً
    });
  }
}
