import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private sharedDataSubject = new Subject<any>();
  private sharedStatusSubject = new Subject<any>();
  private sharedSizeSubject = new Subject<any>();
  dataFromSearch$ = this.sharedDataSubject.asObservable();
  userLoginStatus = this.sharedStatusSubject.asObservable();

  //Comment this while development
  // private apiUrl = 'https://colorsplanet-backend.onrender.com/api/colorGroups';

    //Run backend server to use this url
    private apiUrl = 'http://localhost:3000/api/colorGroups';

  constructor(private http: HttpClient) {}

  setData(data: any) {
    this.sharedDataSubject.next(data);
  }

  sendScreenSize(size: any) {
    this.sharedSizeSubject.next(size);
  }

  getScreenSize(): Observable<any> {
    return this.sharedSizeSubject.asObservable();
  }

  addColorPalette(colorGroups: any) {
    return this.http.post<any[]>(this.apiUrl, colorGroups);
  }

  checkLoginOrNot(status: any) {
    this.sharedStatusSubject.next(status);
  }

  deleteColorById(ids: string[]) {
    const url = `${this.apiUrl}/delete`;
    return this.http.delete(url, { body: { ids } });
  }
}
