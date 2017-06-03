import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MenuService {

  constructor(private _http: Http) { }

  getImages() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('/images/getAll', {headers: headers}).map(res => res.json());
  }
  deleteImage(img) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('/images/delete', img, {headers: headers}).map(res => res.json());
  }
  addItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/menu/add', item, {headers: headers}).map(res => res.json());
  }
  editItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/menu/edit', item, {headers: headers}).map(res => res.json());
  }
  deleteItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('/menu/delete', item, {headers: headers}).map(res => res.json());
  }
  getMenu() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('/menu/getAll', {headers: headers}).map(res => res.json());
  }
}
