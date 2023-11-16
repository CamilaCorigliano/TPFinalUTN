import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { CategoryService } from 'src/app/services/category.service/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  userRestaurant! : any;
  categoryForm: FormGroup;

  constructor(private restaurantService: RestaurantService, private categoryService: CategoryService, private userService: userService) {

    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    if (this.userService.user && this.restaurantService.restaurants) {
       this.userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );

       }
      


  }

  onSubmit(){

    const { category} = this.categoryForm.value;

    this.categoryService.createCategory(this.userRestaurant.id, category)
        .subscribe(
          response =>  {this.categoryForm.reset()},
          error => console.error('Error de la API:', error)
        );

  }

}


