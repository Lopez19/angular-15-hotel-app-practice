import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministradoresComponent } from './administradores/administradores.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    // Menu
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // Submenu
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'administradores',
        component: AdministradoresComponent,
        data: { titulo: 'Administradores' },
      },
      {
        path: 'habitaciones',
        component: HabitacionesComponent,
        data: { titulo: 'Habitaciones' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
