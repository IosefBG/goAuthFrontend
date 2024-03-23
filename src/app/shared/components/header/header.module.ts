import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        MatListModule,
        MatToolbarModule,
        RouterLink,
        RouterLinkActive,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
