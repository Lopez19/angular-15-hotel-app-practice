import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

import { MaterialModule } from './material/material.module';
import { DataTablesModule } from 'angular-datatables';

import { AuthGuard } from '../hotel/guards/auth.guard';
import { TokenInterceptorService } from '../hotel/services/token-interceptor.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    MaterialModule,
    DataTablesModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class SharedModule {}
