import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Variables
  data: any;

  // Constructor
  constructor(private router: Router) {}

  // On Init
  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data') || '{}');
  }

  // Methods
  logout = (): void => {
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('data');
  };
}
