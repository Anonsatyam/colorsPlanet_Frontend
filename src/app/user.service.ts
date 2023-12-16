import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://aware-shirt-lamb.cyclic.app'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  register(email: string, name: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, name, password });
  }

  login(email: string, password: string): Observable<any> {
    //HI
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }
}
