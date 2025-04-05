import { AuthService } from 'src/app/Services/auth.service'; // تأكد من المسار الصحيح
 
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-registed-users',
  templateUrl: './registed-users.component.html',
  styleUrls: ['./registed-users.component.css']
})
export class RegistedUsersComponent implements OnInit {
  users: any[] = []; // مصفوفة لتخزين بيانات المستخدمين
  volunteers: any[] = []; // مصفوفة لتخزين بيانات المتطوعين
 
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.fetchUsers();
  }
 
  fetchUsers(): void {
    this.authService.getRole2Users().subscribe(data => {
      this.users = data.filter(user => user.roleid === 2);  // User
      this.volunteers = data.filter(user => user.roleid === 3);  // Volunteer
     
    });
  }
 
 
 
}