import { Component, Input } from '@angular/core';
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
  selectedCategories: string[] = [];
  @Input() categories: string[] = ['parrilla', 'sushi', 'vegano', 'pasta', 'italiana', 'china', 'rapida', 'pescado', 'cafeteria', 'pizza', 'hamburguesas', 'bar', 'vinoteca'];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {

    this.nameFilter.valueChanges.subscribe(value => {
      this.applyFilters();
    });
  }

  applyFilters() {
    this.restaurantService.applyFilters(this.searchTerm, this.selectedCategories);
  }

  onInputChange(event: Event): void {
    const inputElement = (event.target as HTMLInputElement);
    if (inputElement && inputElement.value) {
      this.searchTerm = inputElement.value;
    } else {
      this.searchTerm = '';
    }

    this.applyFilters();
  }

  onCategoryChange(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    this.applyFilters();
  }

  clearFilters() {
    this.nameFilter.setValue('');
    this.searchTerm = '';
    this.selectedCategories = [];
    this.categories.forEach(category => {
      const checkbox = document.getElementById('tag' + category) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    });
    this.restaurantService.restoreOriginalList();
  }
}
