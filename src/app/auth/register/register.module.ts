import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {HeaderModule} from "../../shared/components/header/header.module";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RegisterRoutingModule,
    HeaderModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class RegisterModule {
}
