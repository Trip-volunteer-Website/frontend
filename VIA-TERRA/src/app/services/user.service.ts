import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7187/api/user';
  display_image: any;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, user);
  }

  uploadUserImage(file: FormData) {
    debugger;
    this.http.post(`${this.apiUrl}/uploadImage`, file)
      .subscribe((resp: any) => {
        console.log("Resp Upload function", resp);
        this.display_image = resp.imagename;
      }, err => {
        alert('Something went wrong');
        console.error(err);
      });
  }
}
