import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // Variables
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // Constructor
  constructor(private fb: FormBuilder, private router: Router) { }


  // Methods
  login = () => {
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }
}
