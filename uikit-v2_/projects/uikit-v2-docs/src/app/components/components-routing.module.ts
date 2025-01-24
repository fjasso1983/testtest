import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { componentsRoutes } from './components.routes';

@NgModule({
  imports: [RouterModule.forChild(componentsRoutes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
