// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   login(payload: { email: string; password: string }) {
//     return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, payload);
//   }

//   saveToken(token: string) { localStorage.setItem('token', token); }
//   getToken() { return localStorage.getItem('token'); }
//   logout() { localStorage.removeItem('token'); }
//   isLoggedIn() { return !!this.getToken(); }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/auth/login`, payload);
  }

  saveToken(token: string) { localStorage.setItem('token', token); }
  getToken() { return localStorage.getItem('token'); }
  logout() { localStorage.removeItem('token'); }
  isLoggedIn() { return !!this.getToken(); }
}
