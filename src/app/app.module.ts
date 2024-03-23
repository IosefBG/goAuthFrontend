import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {LoginModule} from "./auth/login/login.module";
import {RegisterModule} from "./auth/register/register.module";
import {ProfileModule} from "./auth/profile/profile.module";
import {HomeModule} from "./home/home.module";
import {AppRoutingModule} from "./app-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ToastService} from "./shared/toast.service";
import {StateService} from "./shared/state.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth/authInterceptor.service";

export function initializeStateService(stateService: StateService) {
  return () => stateService.setLoggedIn(false); // Assuming you have an initialize method in StateService
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule,
    ProfileModule,
    HomeModule,
  ],
  providers: [
    ToastService,
    StateService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStateService, // Use the factory function to initialize the StateService
      multi: true, // Indicates that APP_INITIALIZER is a multi-provider
      deps: [StateService] // Dependencies required by the factory function
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
