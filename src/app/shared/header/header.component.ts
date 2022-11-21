import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Variables

  // Constructor
  constructor(private router: Router) {}

  // Methods
  logout = (): void => {
    this.router.navigate(['/login']);
  };
}
