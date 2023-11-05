import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-page-filters',
  templateUrl: './page-filters.component.html',
  styleUrls: ['./page-filters.component.css']
})
export class PageFiltersComponent {

  
  nameFilter = new FormControl('');
  searchTerm: string = '';

  constructor(private restaurantService: RestaurantService) {}

  applyFilters() {
    if (this.searchTerm !== '') {
      // Filtra los restaurantes por nombre
      this.restaurantService.applyFilters(this.searchTerm);
    } else {
      // Si searchTerm está vacío, restaura la lista original
      this.restaurantService.restoreOriginalList();
    }
  }

  onInputChange(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    if (inputElement && inputElement.value) {
      this.searchTerm = inputElement.value;
    } else {
      this.searchTerm = '';
    }
  }
  


}
