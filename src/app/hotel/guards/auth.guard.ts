import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Variables

  // Constructor
  constructor(private authServices: AuthService, private router: Router) {}

  // Methods
  canActivate(): boolean {
    if (this.authServices.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
