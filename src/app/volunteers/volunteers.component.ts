import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent  implements OnInit {
 
  volunteers: any[] = []; // مصفوفة لتخزين بيانات المتطوعين
 
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.fetchUsers();
  }
 
  fetchUsers(): void {
    this.authService.getRole2Users().subscribe(data => {
      
      this.volunteers = data.filter(user => user.roleid === 3);  // Volunteer
     
    });
  }
  // component.ts
searchTerm: string = '';

filteredVolunteers() {
  if (!this.searchTerm) {
    return this.volunteers;
  }

  const term = this.searchTerm.toLowerCase();
  return this.volunteers.filter(v =>
    (v.fname + ' ' + v.lname).toLowerCase().includes(term)
  );
}

}