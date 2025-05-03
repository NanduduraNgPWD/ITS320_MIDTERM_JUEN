// service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Make _id optional
type User = {
  _id?: string; // _id is optional on creation
  username: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  Get(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  addUser(user: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3000/user/create', user);
  }

}
