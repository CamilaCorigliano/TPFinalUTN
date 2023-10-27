import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

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
}
