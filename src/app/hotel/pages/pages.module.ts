import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { AdministradoresComponent } from './administradores/administradores.component';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdministradoresComponent,
    HabitacionesComponent,
    PagesComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, RouterModule, SharedModule],
})
export class PagesModule {}
