import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProductTileDocsComponent } from './product-tile.component';

const routes: Route[] = [
  {
    path: '',
    component: ProductTileDocsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTileRoutingModule {}
