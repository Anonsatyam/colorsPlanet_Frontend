import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GradientColorData } from './gradient-color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradientColorService {
  api = 'https://aware-shirt-lamb.cyclic.app/gradientColors';

  constructor(private http: HttpClient) {}

  getgradientColorData(): Observable<GradientColorData[]> {
    return this.http.get<GradientColorData[]>(this.api);
  }
}
