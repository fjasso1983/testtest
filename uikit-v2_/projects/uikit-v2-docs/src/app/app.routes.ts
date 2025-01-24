import { Routes } from '@angular/router';
import { appRoutesNames } from './app.routes.names';

export const appRoutes: Routes = [
  {
    path: appRoutesNames.components,
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
  },
  {
    path: appRoutesNames.empty,
    redirectTo: appRoutesNames.components,
    pathMatch: 'full',
  },
];
