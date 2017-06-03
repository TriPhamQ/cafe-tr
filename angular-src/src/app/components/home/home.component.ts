import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu: Object;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.menuService.getMenu().subscribe(data => {
      this.menu = data.menu;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
