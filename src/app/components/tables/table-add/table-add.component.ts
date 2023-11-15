import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  restaurantId = "6c4a5400-ebe9-40e1-a85a-6d1dccb5844c";

  constructor(private restaurantService: RestaurantService, private tableService: TableService) {

    this.tableForm = new FormGroup({
      tableNumber: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required) 
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

    const { tableNumber, capacity } = this.tableForm.value;

    this.tableService.createTable(this.restaurantId, tableNumber, capacity)
        .subscribe(
          response =>  {this.tableForm.reset()},
          error => console.error('Error de la API:', error)
        );

  }

}

