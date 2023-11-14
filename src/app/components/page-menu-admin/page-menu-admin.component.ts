import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-menu-admin',
  templateUrl: './page-menu-admin.component.html',
  styleUrls: ['./page-menu-admin.component.css']
})
export class PageMenuAdminComponent {

  constructor(private router: Router) {}
  ngOnInit() {
  }

  addRestaurant() {
    this.router.navigate(['/add-restaurant']);
  }

}
