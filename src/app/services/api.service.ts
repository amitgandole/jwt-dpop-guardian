import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSecureData() {
    const url = 'http://localhost:3000/secure-data';
    return this.http.get(url);
  }
}