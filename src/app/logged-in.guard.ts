import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {environment} from "../environments/environment";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router)
  const protectedRoutes: string[] = ['/login', '/register']
  const token = localStorage.getItem(`${environment.STORAGE_ITEM_NAME}token`);
  return protectedRoutes.includes(state.url) && token !== null ? router.navigate(['/home']) : true;
};
