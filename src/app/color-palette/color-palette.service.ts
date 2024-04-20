import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  constructor(private http: HttpClient) {}

  //Comment this while development
  // private apiUrl = 'https://colorsplanet-backend.onrender.com/';

  //Run backend server to use this url
  private apiUrl = 'http://localhost:3000/';

  getData() {
    return this.http.get<any>(this.apiUrl);
  }
}
