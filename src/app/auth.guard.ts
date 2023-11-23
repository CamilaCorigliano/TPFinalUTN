import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';

export const authGuard: CanActivateFn = () => {
  const authservice=inject(AuthService);
  const router=inject(Router);
  if(authservice.isLoggedIn()==false){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
