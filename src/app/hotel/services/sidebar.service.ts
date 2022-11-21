import { Injectable } from '@angular/core';

import { Sidebar } from '../interfaces/sidebar.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: Sidebar[] = [
    {
      title: 'Dashboard',
      icon: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        {
          title: 'Administradores',
          link: 'administradores',
          icon: 'fas fa-user-cog',
        },
        {
          title: 'Habitaciones',
          link: 'habitaciones',
          icon: 'fas fa-bed',
        },
      ],
    },
  ];
}
