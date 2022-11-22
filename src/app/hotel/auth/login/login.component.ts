import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Variables
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authServices: AuthService
  ) {}

  // Methods
  login = () => {
    if (this.loginForm.valid) {
      const admin = {
        usuario: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authServices.login(admin).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('data', JSON.stringify(data.data));
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  };
}
