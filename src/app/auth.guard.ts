import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {environment} from "../environments/environment";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router)
  const protectedRoutes: string[] = ['/profile']
  const token = localStorage.getItem(`${environment.STORAGE_ITEM_NAME}token`);
  console.log(token)
  return protectedRoutes.includes(state.url) && token === null ? router.navigate(['/login']) : true;
};
