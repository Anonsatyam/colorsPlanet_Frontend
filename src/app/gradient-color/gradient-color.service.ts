import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GradientColorData } from './gradient-color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradientColorService {
  //Comment this while development
  // api = 'https://colorsplanet-backend.onrender.com/gradientColors';

    //Run backend server to use this url
    private api = 'http://localhost:3000/gradientColors';

  constructor(private http: HttpClient) {}

  getgradientColorData(): Observable<GradientColorData[]> {
    return this.http.get<GradientColorData[]>(this.api);
  }
}
