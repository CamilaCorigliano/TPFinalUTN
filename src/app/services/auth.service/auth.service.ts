// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Variable para rastrear el estado de inicio de sesión

  login() {
    // Lógica para iniciar sesión (puede ser una llamada a una API, etc.)
    this.loggedIn = true;
  }

  logout() {
    // Lógica para cerrar sesión
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
