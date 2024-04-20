import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Comment this while development
  // private apiUrl = 'https://colorsplanet-backend.onrender.com/';

  //Run backend server to use this url
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  register(email: string, name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      email,
      name,
      password,
    });
  }

  login(email: string, password: string): Observable<any> {
    //HI
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
