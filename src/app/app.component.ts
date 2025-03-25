import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {  // ✅ Corrected the method name
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  title = 'LearningHub';
  name = 'nedaa alyasein';
  emil = 'nedaa@mail.com';
  salary = 1000;

  handleInputChange(ev: any) {  // ✅ Fixed typo in function name
    if (ev.target.value.length > 5) {
      alert('Stop writing');
    }
  }

  clearData() {
    this.name = "";
    this.emil = "";
    this.salary = 0;
  }

  course: any = [
    {
      c_id: 1,
      c_name: "HTML",
      c_price: 50
    },
    {
      c_id: 2,
      c_name: "HTML Pro",
      c_price: 100
    },
    {
      c_id: 3,
      c_name: "C++",
      c_price: 70
    }
  ];

  isUpdated = true;

  changeValue() {
    this.isUpdated = !this.isUpdated;
  }
}
