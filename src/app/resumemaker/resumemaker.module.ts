import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumemakerRoutingModule} from './resumemaker-routing.module';
import {ResumemakerComponent} from './resumemaker.component';
import {ToolbarModule} from "./components/toolbar/toolbar.module";
import {HeaderModule} from "../shared/components/header/header.module";
import {CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ResumemakerComponent,
  ],
  imports: [
    CommonModule,
    ResumemakerRoutingModule,
    ToolbarModule,
    HeaderModule,
    CdkDropList,
    CdkDropListGroup,
    DragDropModule,
    CdkDrag,
    FormsModule,
    MatButtonModule
  ]
})
export class ResumemakerModule {
}
