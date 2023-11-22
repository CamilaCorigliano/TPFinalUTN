import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service/auth.service';
import { userService } from './services/api.service/userService';

export const adminGuard: CanActivateFn = () => {
  const authservice=inject(AuthService);
  const router=inject(Router);
  const user=inject(userService);
  if(authservice.isLoggedIn()==true){
    if(user.user._role=="client"){
      router.navigate(['/login']);
      return false;
    }
  }else{
    router.navigate(['/login']);
    return false;
  }
  return true;
};

