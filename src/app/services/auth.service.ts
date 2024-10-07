import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DPoPService } from './dpop.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private dpopService: DPoPService) {}

  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:3000/login';

    return this.http.post(url, { username, password })
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }
}