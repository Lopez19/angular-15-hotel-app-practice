import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variables
  private _url = 'http://localhost:3000/api/';

  // Constructor
  constructor(private http: HttpClient) {}

  // Methods
  login(admin: any): any {
    return this.http.post(`${this._url}login`, admin);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
