import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean => {
    const authService = inject(AuthServiceService);
    const router = inject(Router); if(authService.isAdmin()){
      return true;
    }
    else {
      alert('Chemin interdit, veuillez-vous connecter')
      router.navigateByUrl('/form-login');
      return false;
    }
}
