import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  restaurant! : any;
  categoryForm: FormGroup;
  restaurantId = "6c4a5400-ebe9-40e1-a85a-6d1dccb5844c";

  constructor(private restaurantService: RestaurantService, private categoryService: CategoryService) {

    this.categoryForm = new FormGroup({
      category: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {

      
      this.restaurantService.getApiRestaurantsById(this.restaurantId).subscribe(
        data => {
          this.restaurant = data;
        },
        error => {
          console.error(error);
        }
      );

  }

  onSubmit() {

    const { category} = this.categoryForm.value;

    this.categoryService.createCategory(this.restaurantId, category)
        .subscribe(
          response =>  {this.categoryForm.reset()},
          error => console.error('Error de la API:', error)
        );

  }

}

