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

      case 'Banderita Parrilla':
        return `assets/images/banderita.jpeg`;

      case 'Pacifico':
        return `assets/images/pacifico.jpeg`;

      case 'Mostaza Costa':
        return `assets/images/mostaza.jpeg`;

      case 'La Corona':
        return `assets/images/lacorona.jpeg`;

      default:
        return `assets/images/logo.jpeg`;
    }
    
  }
  
  getRestaurantSchedule(restaurantName: string): string[] {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return ['Lunes de 08:00 am a 02:00 pm', 'Martes de 08:00 am a 02:00 pm', 'Miercoles de 08:00 am a 02:00 pm', 'Jueves de 08:00 am a 02:00 pm',
                'Viernes de 08:00 am a 02:00 pm', 'Sábado de 08:00 am a 02:00 pm', 'Domingo de 08:00 am a 02:00 pm'];

      case 'Banderita Parrilla':
        return ['Lunes cerrado', 'Martes de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am', 'Miercoles de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am', 
          'Jueves de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am', 'Viernes de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am', 
          'Sábado de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am', 'Domingo de 12:00 am a 15:00 pm y de 20:00 pm a 00:00 am'];

      case 'Pacifico':
        return ['Lunes de 20:00 pm a 11:00 pm', 'Martes de 20:00 pm a 11:00 pm', 'Miercoles de 20:00 pm a 11:00 pm', 'Jueves de 20:00 pm a 11:00 pm',
            'Viernes de 20:00 pm a 11:00 pm', 'Sábado de 20:00 pm a 11:00 pm', 'Domingo de 20:00 pm a 11:00 pm'];

      case 'Mostaza Costa':
        return ['Lunes de 08:00 am a 12:00 am', 'Martes de 08:00 am a 12:00 am', 'Miercoles de 08:00 am a 12:00 am', 'Jueves de 08:00 am a 12:00 am',
                  'Viernes de 08:00 am a 12:00 am', 'Sábado de 08:00 am a 12:00 am', 'Domingo de 08:00 am a 12:00 am'];

      case 'La Corona':
        return ['Lunes de 07:00 am a 02:00 am', 'Martes de 07:00 am a 02:00 am', 'Miercoles de 07:00 am a 02:00 am', 'Jueves de 07:00 am a 02:00 am',
          'Viernes de 07:00 am a 02:00 am', 'Sábado de 07:00 am a 02:00 am', 'Domingo de 07:00 am a 02:00 am'];

      default:
        return [];
    }
  }
  
  getRestaurantLink(restaurantName: string): string {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return 'https://www.google.com/maps/search/manolo+centro+mar+del+plata/@-38.0003278,-57.5567473,14z?entry=ttu';

      case 'Banderita Parrilla':
        return 'https://www.google.com/maps/place/Banderita+Parrilla/@-38.0101613,-57.559657,17z/data=!3m1!4b1!4m6!3m5!1s0x9584dea1a4ffa6e3:0xcba7ab48b688365c!8m2!3d-38.0101656!4d-57.5570821!16s%2Fg%2F11gfdw8s_z?entry=ttu';

      case 'Pacifico':
        return 'https://www.google.com/maps/place/Pac%C3%ADfico/@-37.9722411,-57.5500184,17z/data=!3m1!4b1!4m6!3m5!1s0x9584db4e91e40417:0x2ae4f2c213051f1b!8m2!3d-37.9722454!4d-57.5474435!16s%2Fg%2F11fll2zwnn?entry=ttu';

      case 'Mostaza Costa':
        return 'https://www.google.com/maps/place/Mostaza/@-37.9924467,-57.5452215,15z/data=!4m6!3m5!1s0x9584dd54051277b3:0x490a78ab14eb5541!8m2!3d-37.9924467!4d-57.5452215!16s%2Fg%2F11k4t9cy0y?entry=ttu';

      case 'La Corona':
        return 'https://www.google.com/maps/place/La+Corona/@-38.0030863,-57.5468521,17z/data=!3m1!4b1!4m6!3m5!1s0x9584dd0b80bf243f:0x727f32018df3fbc3!8m2!3d-38.0030906!4d-57.5442772!16s%2Fg%2F11gt8t4lv7?entry=ttu';
      

      default:
        return '#'; // Enlace predeterminado si no se encuentra el nombre del restaurante
    }
  }
  
  getMapImage(restaurantName: string): string {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return `assets/images/mapamanolocentro.jpeg`;
        
      case 'Banderita Parrilla':
        return `assets/images/mapabanderita.jpeg`;

      case 'Pacifico':
        return `assets/images/mapapacifico.jpeg`;

      case 'La Corona':
        return `assets/images/lacoronamapa.JPG`;

      default:
        return `assets/images/logo.jpeg`;
    }
  }

  getStars(rating: number): number[] {
    const int = Math.floor(rating); // Parte entera del puntaje
    const decimal = rating - int;   // Parte decimal del puntaje

    // Crea un arreglo con las estrellas enteras
    let stars = Array(int).fill(1);

    // Si hay parte decimal, agrega una estrella a medias
    if (decimal > 0) {
      stars.push(0.5);
    }

    return stars;
  }

  getRestaurantRanting(restaurantName: string): number {
    switch (restaurantName) {
      case 'Manolo Centro ':
        return 4.5;

      case 'Banderita Parrilla':
        return 4.5;

      case 'Pacifico':
        return 4.5;

      case 'Mostaza Costa':
        return 4.0;

      case 'La Corona':
        return 3.0;

      default:
        return 5.0;
    }

  }



}
