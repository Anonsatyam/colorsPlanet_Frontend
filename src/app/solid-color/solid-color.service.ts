import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolidColorData } from './solid-color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolidColorService {
  constructor(private http: HttpClient) {}

  api = 'https://gifted-pants-boa.cyclic.app/solidColors';

  getSolidColorData(): Observable<SolidColorData[]> {
    return this.http.get<SolidColorData[]>(this.api);
  }
}
