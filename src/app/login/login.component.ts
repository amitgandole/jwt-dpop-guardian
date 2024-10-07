import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe((response) => {
      console.log('Login successful', response);
      this.authService.saveToken(response.accessToken);
      this.router.navigateByUrl('/secure-resource');
    });
  }
}