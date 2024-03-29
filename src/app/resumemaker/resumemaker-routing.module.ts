import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResumemakerComponent} from "./resumemaker.component";

const routes: Routes = [{path: '', component: ResumemakerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumemakerRoutingModule {
}
