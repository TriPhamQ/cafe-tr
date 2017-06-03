import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MenuService {

  constructor(
    private _http: Http
  ) { }

  // Get images for image library.
  getImages() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('/images/getAll', {headers: headers}).map(res => res.json());
  }

  // Delete an image in image library.
  deleteImage(img) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('/images/delete', img, {headers: headers}).map(res => res.json());
  }

  // Add new menu item.
  addItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/menu/add', item, {headers: headers}).map(res => res.json());
  }

  // Edit menu item.
  editItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/menu/edit', item, {headers: headers}).map(res => res.json());
  }

  // Delete menu item.
  deleteItem(item) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put('/menu/delete', item, {headers: headers}).map(res => res.json());
  }

  // Get all menu items.
  getMenu() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.get('/menu/getAll', {headers: headers}).map(res => res.json());
  }

}
