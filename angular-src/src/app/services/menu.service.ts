import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MenuService {

  constructor(private _http: Http) { }

  getImages() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/images/getAll', {headers: headers}).map(res => res.json());
  }
  deleteImage(img) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('http://localhost:3000/images/delete', img, {headers: headers}).map(res => res.json());
  }
  addItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/menu/add', item, {headers: headers}).map(res => res.json());
  }
  getMenu() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('http://localhost:3000/menu/getAll', {headers: headers}).map(res => res.json());
  }
}
