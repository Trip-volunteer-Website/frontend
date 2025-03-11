import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // جلب البيانات المخزنة عند تحميل الصفحة
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (savedUsername && savedPassword) {
      this.username = savedUsername;
      this.password = savedPassword;
      this.rememberMe = true; // تفعيل Remember Me تلقائيًا إذا كانت البيانات محفوظة
    }
  }

  login() {
    // تنفيذ عملية تسجيل الدخول (يمكنك إضافة تحقق من صحة البيانات هنا)

    if (this.rememberMe) {
      // تخزين البيانات في localStorage إذا كان Remember Me مفعّلًا
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
    } else {
      // إزالة البيانات إذا لم يكن Remember Me مفعّلًا
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
    this.router.navigate(['/dashboard']);
  }
}
