import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HotelModule } from './hotel/hotel.module';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HotelModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
