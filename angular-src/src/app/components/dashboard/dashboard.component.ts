import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FileUploader } from 'ng2-file-upload';

import { ValidateService } from '../../services/validate.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  images: Object;
  image: string;
  name: string;
  price: number;
  description: string;
  menu: Object;
  idEdit: string;
  imageEdit: string;
  nameEdit: string;
  priceEdit: number;
  descriptionEdit: string;
  isEdit: boolean;
  
  private uploader:FileUploader = new FileUploader({url:'http://localhost:3000/images/upload'});

  constructor(private router: Router, private validateService: ValidateService, private flashMessage: FlashMessagesService, private menuService: MenuService) {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.menuService.getImages().subscribe(data => {
        this.images = data.images;
      }, err => {
        console.log(err);
        return false;
      });
    };
  }

  ngOnInit() {
    this.menuService.getImages().subscribe(data => {
      this.images = data.images;
    }, err => {
      console.log(err);
      return false;
    });
    this.menuService.getMenu().subscribe(data => {
      this.menu = data.menu;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onSelectImage(image) {
    this.image = image.path;
    this.imageEdit = image.path;
  }

  onDeleteImage(image) {
    this.menuService.deleteImage(image).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Deleted image', {cssClass: 'alert-success', timeout: 3000});
        this.menuService.getImages().subscribe(data => {
          this.images = data.images;
        }, err => {
          console.log(err);
          return false;
        });
        this.menuService.getMenu().subscribe(data => {
          this.menu = data.menu;
        }, err => {
          console.log(err);
          return false;
        });
      }
      else {
        this.flashMessage.show('Error deleting image', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  onNewMenuItemSubmit() {
    const item = {
      name: this.name,
      image: this.image,
      price: this.price,
      description: this.description
    };

    // Validate User
    if (!this.validateService.validateMenuItem(item)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    this.menuService.addItem(item).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('New item is added to the menu', {cssClass: 'alert-success', timeout: 3000});
        this.name = null;
        this.image = null;
        this.price = null;
        this.description = null;
        this.isEdit = false;
        this.menuService.getMenu().subscribe(data => {
          this.menu = data.menu;
        }, err => {
          console.log(err);
          return false;
        });
      }
      else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onSelectMenuItem(item) {
    this.isEdit = true;
    this.nameEdit = item.name;
    this.imageEdit = item.image;
    this.priceEdit = item.price;
    this.descriptionEdit = item.description;
    this.idEdit = item._id;
  }

  onEditMenuItemSubmit() {
    const item = {
      name: this.nameEdit,
      image: this.imageEdit,
      price: this.priceEdit,
      description: this.descriptionEdit,
      _id: this.idEdit
    };

    // Validate User
    if (!this.validateService.validateMenuItem(item)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    this.menuService.editItem(item).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Item has been edited', {cssClass: 'alert-success', timeout: 3000});
        this.isEdit = false;
        this.nameEdit = null;
        this.imageEdit = null;
        this.priceEdit = null;
        this.descriptionEdit = null;
        this.image = null;
        this.menuService.getMenu().subscribe(data => {
          this.menu = data.menu;
        }, err => {
          console.log(err);
          return false;
        });
      }
      else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

  onCancelEdit() {
    this.isEdit = false;
  }

  onDeleteMenuItem(item) {
    this.menuService.deleteItem(item).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Item has been deleted', {cssClass: 'alert-success', timeout: 3000});
        this.isEdit = false;
        this.nameEdit = null;
        this.imageEdit = null;
        this.priceEdit = null;
        this.descriptionEdit = null;
        this.image = null;
        this.menuService.getMenu().subscribe(data => {
          this.menu = data.menu;
        }, err => {
          console.log(err);
          return false;
        });
      }
      else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}
