import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { userService } from 'src/app/services/api.service/userService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  userRestaurant: any;
  categoryForm: FormGroup;
  allCategories: string[] = ['parrilla', 'sushi', 'vegano', 'pasta', 'italiana', 'china', 'rapida', 'pescado', 'cafeteria', 'pizza', 'hamburguesa', 'bar', 'vinoteca'];
  availableCategories: string[] = [];
  selectedCategories: string[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
    private userService: userService,
    private router: Router
  ) {
    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getRestaurantForUser();
    this.updateAvailableCategories();
  }

  getRestaurantForUser() {
    if (this.userService.user && this.restaurantService.restaurants) {
      this.userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );

    }
  }

  updateAvailableCategories() {
    if (this.userRestaurant) {
      this.availableCategories = this.allCategories.filter(category => !this.userRestaurant.categories.includes(category));
    }
  }

  onSubmit() {

    if (this.userRestaurant) {
      this.categoryService.createCategory(this.userRestaurant.id, this.selectedCategories)
        .subscribe(
          response => {
            this.categoryForm.reset();
            this.updateAvailableCategories();
          },
          error => {
            console.error('Error al crear la categoría:', error);
          }
        );
    }
  
  }

  onSelectCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(selectedCategory => selectedCategory !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

}
