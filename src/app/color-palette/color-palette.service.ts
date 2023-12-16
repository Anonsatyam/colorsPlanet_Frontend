import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://aware-shirt-lamb.cyclic.app';
  getData() {
    return this.http.get<any>(this.apiUrl);
  }

}
