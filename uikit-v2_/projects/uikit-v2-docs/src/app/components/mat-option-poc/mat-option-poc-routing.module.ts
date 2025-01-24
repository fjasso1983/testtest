import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatOptionPocComponent } from './mat-option-poc.component';

const routes: Route[] = [
  {
    path: '',
    component: MatOptionPocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatOptionPocRoutingModule {}
