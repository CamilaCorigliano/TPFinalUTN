import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { userService } from 'src/app/services/api.service/userService';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  userRestaurant: any;
  categoryForm: FormGroup;
  allCategories: string[] = ['parrilla', 'sushi', 'vegano', 'pasta', 'italiana', 'china', 'rapida', 'pescado', 'cafeteria', 'pizza', 'hamburguesas', 'bar', 'vinoteca'];
  availableCategories: string[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
    private userService: userService
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

      console.log("Categorías del restaurante:", this.userRestaurant.categories);
    }
  }

  updateAvailableCategories() {
    if (this.userRestaurant) {
      // Filtrar las categorías disponibles
      this.availableCategories = this.allCategories.filter(category => !this.userRestaurant.categories.includes(category));
    }
  }

  onSubmit() {
    const { category } = this.categoryForm.value;

    if (this.userRestaurant) {
      this.categoryService.createCategory(this.userRestaurant.id, category)
        .subscribe(
          response => {
            console.log('Categoría creada exitosamente:', response);
            this.categoryForm.reset();
            this.updateAvailableCategories(); // Actualizar las categorías disponibles después de crear una nueva
          },
          error => {
            console.error('Error al crear la categoría:', error);
          }
        );
    }
  }

}
