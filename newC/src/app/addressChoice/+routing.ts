import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressChoiceComponent } from './addressChoice.component';


const routes: Routes = [
  {
    path: '',
    component: AddressChoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressChoicRoutingModule { }
