import { Component } from '@angular/core';

import { Sidebar } from '../../hotel/interfaces/sidebar.interface';
import { SidebarService } from 'src/app/hotel/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // Variables
  menuItems: Sidebar[] = [];

  // Constructor
  constructor(private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }

  // Methods
}
