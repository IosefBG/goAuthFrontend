import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./auth.guard";
import {loggedInGuard} from "./logged-in.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    canActivate: [loggedInGuard],
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    canActivate: [loggedInGuard],
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./auth/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'resumeMaker',
    canActivate: [authGuard],
    loadChildren: () => import('./resumemaker/resumemaker.module').then(m => m.ResumemakerModule)
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
