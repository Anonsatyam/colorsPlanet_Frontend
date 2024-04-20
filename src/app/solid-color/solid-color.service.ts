import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolidColorData } from './solid-color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolidColorService {
  constructor(private http: HttpClient) {}

  //Comment this while development
  // api = 'https://colorsplanet-backend.onrender.com/solidColors';

  //Run backend server to use this url
  private api = 'http://localhost:3000/solidColors';

  getSolidColorData(): Observable<SolidColorData[]> {
    return this.http.get<SolidColorData[]>(this.api);
  }
}
