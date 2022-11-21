import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404Component } from './error404/error404.component';

import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [Error404Component],
  imports: [CommonModule, AuthModule, PagesModule, SharedModule],
  exports: [Error404Component],
})
export class HotelModule {}
