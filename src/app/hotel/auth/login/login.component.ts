import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Person } from '../../interfaces/person.interface';
import { Login } from '../../interfaces/login.interface';

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
  ) {
    document.title = 'Hotel - Login';
  }

  // Methods
  login = () => {
    if (this.loginForm.valid) {
      const admin = {
        usuario: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authServices.login(admin).subscribe({
        next: (resp: Login) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('data', JSON.stringify(resp.data));
          localStorage.setItem('id', resp.data._id);
          this.router.navigateByUrl('/dashboard');
        },
        error: (error: any) => {
          console.log(JSON.stringify(error));
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          });
        },
      });
    }
  };
}
