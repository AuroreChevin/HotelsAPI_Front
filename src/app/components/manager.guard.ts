
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';


export const managerGuard : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean => {
    const authService = inject(AuthServiceService);
    const router = inject(Router); if(authService.isAdmin() || authService.isManager()){
      return true;
    }
    else {
      alert('Chemin interdit, veuillez-vous connecter')
      router.navigateByUrl('/form-login');
      return false;
    }
  }
