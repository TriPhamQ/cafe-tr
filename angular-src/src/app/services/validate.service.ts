import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // Validate all fields for user registration.
  validateRegister(user) {
    if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
      return false;
    }
    else {
      return true;
    };
  }

  // Validate email regex for user registration.
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Validate all fields for creating new menu item.
  validateMenuItem(item) {
    if (item.name == undefined || item.image == undefined || item.price == undefined || item.description == undefined || item.price == "" || item.description == "" ) {
      return false;
    }
    else {
      return true;
    };
  }

}
