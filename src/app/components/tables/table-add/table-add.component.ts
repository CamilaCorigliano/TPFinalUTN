import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userService } from 'src/app/services/api.service/userService';
import { CategoryService } from 'src/app/services/category.service/category.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { TableService } from 'src/app/services/table.service/table.service';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css']
})
export class TableAddComponent {

  restaurant! : any;
  tableForm: FormGroup;
  userRestaurant!: any;

  constructor(private restaurantService: RestaurantService, private tableService: TableService, private userService: userService) {

    this.tableForm = new FormGroup({
      tableNumber: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required) 
    });

  }

  ngOnInit(): void {
    
    if (this.userService.user && this.restaurantService.restaurants) {
      this.userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );
    }
      this.restaurantService.getApiRestaurantsById(this.userRestaurant.id).subscribe(
        data => {
          this.restaurant = data;
        },
        error => {
          console.error(error);
        }
      );

  }

  onSubmit() {

    const { tableNumber, capacity } = this.tableForm.value;

    this.tableService.createTable(this.userRestaurant.id, tableNumber, capacity)
        .subscribe(
          response =>  {
            alert('La mesa se ha creado exitosamente');
            this.tableForm.reset()
          },
          error => console.error('Error de la API:', error)
        );

  }

}

