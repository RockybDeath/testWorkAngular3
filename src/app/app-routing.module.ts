import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentAreaComponent} from "./components/document-area/document-area.component";

const routes: Routes = [
  {
    path: '',
    component: DocumentAreaComponent,
  },
  {
    path: '*',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
