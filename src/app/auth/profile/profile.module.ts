import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {HeaderModule} from "../../shared/components/header/header.module";
import {ProfileComponent} from "./profile.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        HeaderModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatExpansionModule
    ]
})
export class ProfileModule {
}
