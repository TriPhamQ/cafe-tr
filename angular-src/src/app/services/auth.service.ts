import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private _http: Http
  ) { }

  // Register user.
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/users/register', user, {headers: headers}).map(res => res.json());
  }

  // Authenticate user.
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  // Get user profile.
  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this._http.get('/users/profile', {headers: headers}).map(res => res.json());
  }

  // Store current user locally.
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Get user id_token for authentication.
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Check if user is logged in.
  loggedIn() {
    return tokenNotExpired('id_token');
  }

  // Logout user and clear storages.
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
