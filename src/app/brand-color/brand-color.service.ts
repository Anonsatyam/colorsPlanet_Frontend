import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandColorPalette } from './brand-color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandColorService {

      //Comment this while development
  // api = 'https://colorsplanet-backend.onrender.com/brandColors';

    //Run backend server to use this url
    private api = 'http://localhost:3000/brandColors';

  constructor(private http: HttpClient) {}

  getbrandColorData(): Observable<BrandColorPalette[]> {
    return this.http.get<BrandColorPalette[]>(this.api);
  }
}
