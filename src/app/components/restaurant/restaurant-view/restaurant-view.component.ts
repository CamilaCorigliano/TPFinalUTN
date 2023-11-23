import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.css']
})
export class RestaurantViewComponent {

  restaurant! : any;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const restaurantId = params['id']; 
      this.restaurantService.getApiRestaurantsById(restaurantId).subscribe(
        data => {
          this.restaurant = data;
        },
        error => {
          console.error(error);
        }
      );
    });

  }

  getRestaurantImage(restaurantName: string): string {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return `assets/images/manolo.jpeg`;
      case 'nombre2':
        return `assets/images/manolo.jpeg`;
      default:
        return `assets/images/manolo.jpeg`;
    }
    
  }
  
  getRestaurantSchedule(restaurantName: string): string[] {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return ['Lunes de 08:00 am a 02:00 pm', 'Martes de 08:00 am a 02:00 pm', 'Miercoles de 08:00 am a 02:00 pm', 'Jueves de 08:00 am a 02:00 pm',
                'Viernes de 08:00 am a 02:00 pm', 'Sábado de 08:00 am a 02:00 pm', 'Domingo de 08:00 am a 02:00 pm'];
      case 'nombre2':
        return ['Lunes de 09:00 am a 03:00 pm', 'Miércoles de 09:00 am a 03:00 pm', /* ... otros días */];
      default:
        return [];
    }
  }
  
  getRestaurantLink(restaurantName: string): string {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return 'https://www.google.com/maps/search/manolo+centro+mar+del+plata/@-38.0003278,-57.5567473,14z?entry=ttu';
      case 'nombre2':
        return 'https://www.ejemplo2.com';
      default:
        return '#'; // Enlace predeterminado si no se encuentra el nombre del restaurante
    }
  }
  
  getMapImage(restaurantName: string): string {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return `assets/images/mapamanolocentro.jpeg`;
      case 'nombre2':
        return `assets/images/manolo.jpeg`;
      default:
        return `assets/images/manolo.jpeg`;
    }
  }

  




}
